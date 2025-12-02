import { User } from "../../domain/entities/user";
import { AuthRepository } from "../../domain/repositories/auth-repository";
import { SignInDto } from "../../infraestructure/dtos/sign.dto";

export class SignInUseCase {
    constructor(private repository: AuthRepository) { }

    execute(data: SignInDto): Promise<User> {
        return this.repository.signIn(data);
    }
}