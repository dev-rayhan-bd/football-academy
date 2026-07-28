import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ParentData {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  relationship: string;
  occupation?: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  linkedPlayerIds: number[];
  linkedPlayers: string; // Comma separated player names
  paymentStatus: "Paid" | "Unpaid";
  lastContact: string;
  notes?: string;
  avatar: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

export interface ParentSliceState {
  parents: ParentData[];
}

const initialState: ParentSliceState = {
  parents: [
    {
      id: 1,
      firstName: "Robert",
      lastName: "Silva",
      fullName: "Robert Silva",
      relationship: "Father",
      occupation: "Engineer",
      email: "robert.silva@email.com",
      phone: "+1 234 567 8900",
      streetAddress: "123 Main St",
      city: "São Paulo",
      zipCode: "12345",
      linkedPlayerIds: [1],
      linkedPlayers: "Marcus Silva",
      paymentStatus: "Paid",
      lastContact: "2 days ago",
      avatar: "https://i.pravatar.cc/100?u=robert",
      status: "Active",
      createdAt: "2026-01-15"
    },
    {
      id: 2,
      firstName: "Linda",
      lastName: "Chen",
      fullName: "Linda Chen",
      relationship: "Mother",
      occupation: "Designer",
      email: "linda.chen@email.com",
      phone: "+1 234 567 8901",
      streetAddress: "456 Oak Rd",
      city: "Guangzhou",
      zipCode: "54321",
      linkedPlayerIds: [2],
      linkedPlayers: "David Chen",
      paymentStatus: "Paid",
      lastContact: "1 week ago",
      avatar: "https://i.pravatar.cc/100?u=linda",
      status: "Active",
      createdAt: "2026-02-01"
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Jordan",
      fullName: "Michael Jordan",
      relationship: "Father",
      occupation: "Businessman",
      email: "michael.j@email.com",
      phone: "+1 234 567 8902",
      streetAddress: "789 Pine Ave",
      city: "Chicago",
      zipCode: "60601",
      linkedPlayerIds: [3],
      linkedPlayers: "Alex Jordan",
      paymentStatus: "Unpaid",
      lastContact: "3 days ago",
      avatar: "https://i.pravatar.cc/100?u=michael",
      status: "Active",
      createdAt: "2026-02-22"
    }
  ]
};

export const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    addParent: (state, action: PayloadAction<ParentData>) => {
      state.parents = [action.payload, ...state.parents];
    },
    updateParent: (state, action: PayloadAction<ParentData>) => {
      const idx = state.parents.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) {
        state.parents[idx] = action.payload;
      }
    },
    deleteParent: (state, action: PayloadAction<number>) => {
      state.parents = state.parents.filter((p) => p.id !== action.payload);
    }
  }
});

export const { addParent, updateParent, deleteParent } = parentSlice.actions;
export default parentSlice.reducer;
