import { HttpClient } from "@/src/core/http/http-client";
import { User } from "../../domain/entities/user";
import { AuthRepository } from "../../domain/repositories/auth-repository";
import { SignInDto } from "../dtos/sign.dto";
import { SignUpClientDto } from "../dtos/signup-client.dto";

export class AuthRepositoryImpl implements AuthRepository {
    private http = new HttpClient();

    async sighUpClient(data: SignUpClientDto): Promise<User> {
        const response = await this.http.post<User>("/auth/register", data);

        return response;
    }

    async signIn(data: SignInDto): Promise<User> {
        const response = await this.http.post<User>("/auth/login", data);

        return response;
    }
}