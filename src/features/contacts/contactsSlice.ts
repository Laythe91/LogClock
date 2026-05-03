import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactStatus } from "../../types/Contact";
import DATA from "../../data";

interface ContactsState {
  currentUserId: string;

  relations: Record<string, "accepted" | "pending" | "blocked" | "refused">;

  profilesById: Record<
    string,
    {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      profileImage: string;
    }
  >;
}

const currentUser = DATA.users.find((u) => u.id === "user1");

const profilesById = Object.fromEntries(
  DATA.userProfiles.map((p) => [p.id, p]),
);

const initialState: ContactsState = {
  currentUserId: "user1",
  relations: (currentUser?.contactsStatusCache ?? {}) as Record<
    string,
    ContactStatus
  >,
  profilesById,
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
      state.relations[action.payload.targetId] = action.payload.status;
    },
  },
});

export const { updateContactStatus } = contactsSlice.actions;
export default contactsSlice.reducer;
