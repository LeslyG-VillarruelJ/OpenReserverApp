import { useAuthStore } from "@/src/core/store/auth.store";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { SignInUseCase } from "../../application/use-cases/signin.usecase";
import { User } from "../../domain/entities/user";
import { SignInDto } from "../dtos/sign.dto";
import { AuthRepositoryImpl } from "../repositories/auth-repositry-impl";

const authRepo = new AuthRepositoryImpl();
const signinUseCase = new SignInUseCase(authRepo);

export const useSignIn = (): UseMutationResult<User, Error, SignInDto> => {
    const setUser = useAuthStore((s) => s.setUser);

    return useMutation<User, Error, SignInDto>({
        mutationFn: (data: SignInDto) => signinUseCase.execute(data),
        onSuccess: (user) => {
            setUser(user);
        },
        onError: (error) => {
            console.error("Error registrando usuario:", error);
        },
    });
}