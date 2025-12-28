export class AccountSecurityDTO {
    
    currentPassword: string = '';
    newPassword: string = '';
    confirmPassword: string = '';

    constructor(init?: Partial<AccountSecurityDTO>) {
        Object.assign(this, init);
    }

}