import {VALIDATE_FORM} from "./types";

export function validateForm(formControls, isFormValid) {
    return {
        type: VALIDATE_FORM,
        formControls: formControls,
        isFormValid: isFormValid
    }
}