export class AccountSecurityDTO {
    
    currentPassword: string = '';
    password: string = '';
    confirmPassword: string = '';

    constructor(init?: Partial<AccountSecurityDTO>) {
        Object.assign(this, init);
    }

}