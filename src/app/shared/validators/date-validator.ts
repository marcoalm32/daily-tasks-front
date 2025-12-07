import { AbstractControl, ValidationErrors } from "@angular/forms";
import moment from "moment";

export function dateValidator(minDate: string) {

    return (control: AbstractControl): ValidationErrors | null => {
        const value = moment(control.value, 'YYYY-MM-DD', true);

        if (!value.isValid()) {
            return { invalidDate: 'Data inválida. Use o formato YYYY-MM-DD.' };
        }

        const min = moment(minDate, 'YYYY-MM-DD', true);
        if (value.isBefore(min)) {
            return {
                dateTooEarly: `A data deve ser igual ou posterior a ${min.format('YYYY-MM-DD')}.`
            };
        };
        return null;
    }
}