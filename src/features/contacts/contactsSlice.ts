import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DATA from "../../data";

interface ContactsState {
  allProfiles: any[];
  usersRelations: any[];
  currentUserId: string;
}

const initialState: ContactsState = {
  allProfiles: DATA.userProfiles,
  usersRelations: DATA.users,
  currentUserId: "user1",
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    updateContactStatus: (
      state,
      action: PayloadAction<{
        targetId: string;
        status: "accepted" | "pending" | "blocked" | "refused";
      }>,
    ) => {
      const currentUserRelation = state.usersRelations.find(
        (user) => user.id === state.currentUserId,
      );

      if (!currentUserRelation) return;

      currentUserRelation.contactsStatusCache[action.payload.targetId] =
        action.payload.status;
    },
  },
});

export const { updateContactStatus } = contactsSlice.actions;
export default contactsSlice.reducer;
