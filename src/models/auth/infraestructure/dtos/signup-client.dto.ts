export interface SignUpClientDto {
    name: string;
    email: string;
    password: string;
    termsAccepted: boolean;
    role: string;
    referralCode?: string;
}