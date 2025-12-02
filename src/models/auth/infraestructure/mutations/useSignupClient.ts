import { useAuthStore } from "@/src/core/store/auth.store";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { SignUpClientUseCase } from "../../application/use-cases/signup-client.usecase";
import { User } from "../../domain/entities/user";
import { SignUpClientDto } from "../dtos/signup-client.dto";
import { AuthRepositoryImpl } from "../repositories/auth-repositry-impl";

const authRepo = new AuthRepositoryImpl();
const registerUseCase = new SignUpClientUseCase(authRepo);

export const useSignUpClient = (): UseMutationResult<User, Error, SignUpClientDto> => {
    const setUser = useAuthStore((s) => s.setUser);

    return useMutation<User, Error, SignUpClientDto>({
        mutationFn: (data: SignUpClientDto) => registerUseCase.execute(data),
        onSuccess: (user) => {
            setUser(user);
        },
        onError: (error) => {
            console.error("Error registrando usuario:", error);
        },
    });
};