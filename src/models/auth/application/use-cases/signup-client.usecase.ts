import { User } from "../../domain/entities/user";
import { AuthRepository } from "../../domain/repositories/auth-repository";
import { SignUpClientDto } from "../../infraestructure/dtos/signup-client.dto";

export class SignUpClientUseCase {
    constructor(private repository: AuthRepository) { }

    execute(data: SignUpClientDto): Promise<User> {
        return this.repository.sighUpClient(data);
    }
}
