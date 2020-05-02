import {VALIDATE_FORM} from "./types";

const initalState = {
    isFormValid: false,
    formControls: {
        amount: {
            value: '',
            type: 'text',
            label: 'Сумма платежа',
            errorMessage: 'Введите  корректно сумму платежа',
            placeholder: '0.00',
            autocomplete: 'on',
            valid: false,
            touched: false,
            validation: {
                required: true,
                sum: true
            }
        },
        number: {
            value: '',
            type: 'tel',
            label: 'Номер карты',
            errorMessage: 'Введите  корректный номер карты',
            placeholder: '0000-000-0000-0000',
            mask: '9999999999999999',
            autocomplete: 'cc-number',
            valid: false,
            touched: false,
            validation: {
                required: true,
                cardNumber: true
            }
        },
        date: {
            value: '',
            type: 'text',
            label: 'Месяц и год истечения срока действия',
            errorMessage: 'Введите корректную дату',
            placeholder: "__/____",
            mask: "99/9999",
            autocomplete: 'on',
            valid: false,
            touched: false,
            validation: {
                required: true,
                date: true
            }
        },
        name: {
            value: '',
            type: 'text',
            label: 'Имя держателя',
            errorMessage: 'Введите  корректное имя',
            placeholder: 'Ivan Ivanov',
            autocomplete: 'on',
            valid: false,
            touched: false,
            validation: {
                required: true,
                name: true
            }},
        csv: {
            value: '',
            type: 'password',
            label: 'CSV код',
            placeholder: '123',
            mask: "999",
            errorMessage: 'Введите  корректный сsv',
            autocomplete: 'cc-number',
            valid: false,
            touched: false,
            validation: {
                required: true,
                cvc: true,
            }}
    }
}


const formControlsReducer = (state=initalState, action) => {
    switch (action.type) {
        case VALIDATE_FORM:
            return { ...state, formControls: action.formControls, isFormValid: action.isFormValid }
        default:
            return state
    }
}

export default formControlsReducer;