import { AbstractControl, ValidationErrors } from "@angular/forms";
import { MESSAGES } from "../messages/messages";

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password: string = control.value;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password?.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSymbol && isValidLength;

    if (!passwordValid) {
        return {
            passwordStrength: MESSAGES.errors.password_stronger
        };
    }
    return null;
}