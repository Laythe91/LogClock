// src/features/friends/friendsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import DATA from "../../data";
import { RootState } from "../../core/store";
import { Friend } from "../../types/Friend";
import { createSelector } from "@reduxjs/toolkit"; // Importe ceci

// 1. On définit une interface pour le cache pour éviter les erreurs de clés
interface FriendsCache {
  accepted: string[];
  pending: string[];
  blocked: string[];
  refused: string[];
}

interface FriendsState {
  allProfiles: Friend[];
  usersRelations: UserRelation[];
  currentUserId: string;
}

const initialState: FriendsState = {
  allProfiles: DATA.userProfiles as unknown as Friend[],
  usersRelations: DATA.users as any[],
  currentUserId: "user1",
};

interface UserRelation {
  id: string;
  friendsStatusCache: FriendsCache;
}

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    // ACCEPTER UN AMI
    acceptFriend: (state, action) => {
      const friendId = action.payload; // L'ID de la personne à accepter
      const me = state.usersRelations.find((u) => u.id === state.currentUserId);

      if (me) {
        // 1. Retirer de 'pending'
        me.friendsStatusCache.pending = me.friendsStatusCache.pending.filter(
          (id) => id !== friendId,
        );
        // 2. Ajouter à 'accepted'
        if (!me.friendsStatusCache.accepted.includes(friendId)) {
          me.friendsStatusCache.accepted.push(friendId);
        }
      }
    },

    // BLOQUER UN USER
    blockUser: (state, action) => {
      const targetId = action.payload;
      const me = state.usersRelations.find((u) => u.id === state.currentUserId);

      if (me) {
        // 1. On le retire de partout (accepted, pending, etc.)
        me.friendsStatusCache.accepted = me.friendsStatusCache.accepted.filter(
          (id) => id !== targetId,
        );
        me.friendsStatusCache.pending = me.friendsStatusCache.pending.filter(
          (id) => id !== targetId,
        );

        // 2. On l'ajoute aux bloqués
        if (!me.friendsStatusCache.blocked.includes(targetId)) {
          me.friendsStatusCache.blocked.push(targetId);
        }
      }
    },

    // SUPPRIMER / REFUSER
    removeFriend: (state, action) => {
      const targetId = action.payload;
      const me = state.usersRelations.find((u) => u.id === state.currentUserId);
      if (me) {
        // On filtre toutes les listes pour faire disparaître l'ID
        me.friendsStatusCache.accepted = me.friendsStatusCache.accepted.filter(
          (id) => id !== targetId,
        );
        me.friendsStatusCache.pending = me.friendsStatusCache.pending.filter(
          (id) => id !== targetId,
        );
      }
    },
  },
});

export const { acceptFriend, blockUser, removeFriend } = friendsSlice.actions;

const selectFriendsState = (state: RootState) => state.friends;

// 2. Le sélecteur intelligent (mémoïsé)
export const selectFilteredFriends = createSelector(
  [selectFriendsState, (state: RootState, filter: string) => filter],
  (friends, filter) => {
    // Ce code ne s'exécutera QUE si friends ou filter changent
    const me = friends.usersRelations.find(
      (u) => u.id === friends.currentUserId,
    );
    if (!me) return [];

    const cache = me.friendsStatusCache;
    const targetIds = (cache[filter as keyof typeof cache] || []) as string[];

    console.log(`[Selector Mémoïsé] Calcul du filtre: ${filter}`);

    return friends.allProfiles.filter((profile) =>
      targetIds.includes(profile.id),
    );
  },
);
export default friendsSlice.reducer;

/*

// src/features/friends/friendsSlice.ts
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../core/store";

// On imagine une fonction qui appelle ton API
export const fetchFriendsData = createAsyncThunk("friends/fetchAll", async () => {
  const response = await fetch("https://api.tonapp.com/user/friends");
  return response.json(); // Retourne l'objet complet { users, userProfiles }
});

const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    allProfiles: [],
    usersRelations: [],
    currentUserId: "user1",
    status: "idle", // 'loading' | 'succeeded' | 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendsData.fulfilled, (state, action) => {
        // On remplit le store avec ce qui vient du net
        state.allProfiles = action.payload.userProfiles;
        state.usersRelations = action.payload.users;
        state.status = "succeeded";
      });
  },
});

// --- SELECTEURS MÉMOÏSÉS ---
const selectAllProfiles = (state: RootState) => state.friends.allProfiles;
const selectRelations = (state: RootState) => state.friends.usersRelations;
const selectCurrentId = (state: RootState) => state.friends.currentUserId;

export const selectFilteredFriends = createSelector(
  [selectAllProfiles, selectRelations, selectCurrentId, (state, filter: string) => filter],
  (profiles, relations, myId, filter) => {
    const me = relations.find(u => u.id === myId);
    if (!me) return [];

    const targetIds = me.friendsStatusCache[filter] || [];
    
    // Le filtrage se fait ici, une seule fois, et SEULEMENT si les données changent
    return profiles.filter(p => targetIds.includes(p.id));
  }
);

export default friendsSlice.reducer;

*/
