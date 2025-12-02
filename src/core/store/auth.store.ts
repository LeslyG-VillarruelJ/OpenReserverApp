import { User } from "@/src/models/auth/domain/entities/user";
import { create } from "zustand";
import { tokenService } from "../services/token.service";

interface AuthState {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => {
        tokenService.removeTokens();
        set({ user: null });
    },
}));
