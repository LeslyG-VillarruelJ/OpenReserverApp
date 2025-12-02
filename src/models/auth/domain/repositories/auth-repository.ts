import { SignInDto } from "../../infraestructure/dtos/sign.dto";
import { SignUpClientDto } from "../../infraestructure/dtos/signup-client.dto";
import { User } from "../entities/user";

export interface AuthRepository {
    sighUpClient(data: SignUpClientDto): Promise<User>;
    signIn(data: SignInDto): Promise<User>;
}