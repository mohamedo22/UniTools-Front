export class ResetPasswordDto {
    constructor() {
        this.email = '';
        this.newPassword = '';
    }
    public email: string;
    public newPassword: string;
}
