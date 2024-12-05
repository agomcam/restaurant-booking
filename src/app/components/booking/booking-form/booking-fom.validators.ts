//login.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

//Ejemplo estructura función
export function customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let valorCampo = control.value

        let today = new Date();
        let expirationDate: Date = new Date(valorCampo);

        if (expirationDate >= today) {
            return null;
        }

        return { 'invalidDate': true };

    };
}

export function customValidatorNumComensalesMenor0(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valorCampo = control.value;


        if (valorCampo < 0) {
            return { 'invalidnumcommenor0': true }; // Error personalizado
        }


        // Si el valor es válido, no hay errores
        return null;
    };
}

export function customValidatorNumComensalesMayor50(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valorCampo = control.value;


        if (valorCampo > 50) {
            return { 'invalidnumcommayor50': true }; // Error personalizado
        }


        // Si el valor es válido, no hay errores
        return null;
    };
}