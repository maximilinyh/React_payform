import React from "react";
import InputGroup from "./InputGroup";
import is from 'is_js';
import {connect, useDispatch} from "react-redux";
import {validateForm} from "../Redux/actions";
import './PayForm.scss'

//submit button fn
function handlerSubmitButton() {}

//preventDefault form submit
function handlerSubmitForm(event) {
    event.preventDefault();
}
//check input fn
function validateControl(value, validation) {
    let isValid = true;

    if(!validation) {
        return true
    }

    if(validation.required) {
        isValid = value.trim() !=='' ? isValid : false
    }

    if(validation.sum) {
        const regEx = /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/g;
        isValid = regEx.test(value) ? isValid : false
    }

    if(validation.cardNumber) {
        isValid = is.creditCard(value) ? isValid : false
    }

    if(validation.name) {
      const regEx = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
        isValid = regEx.test(value) ? isValid : false
    }

    if(validation.date) {
        const regEx = /^(1[0-2]|0[1-9]|\d)\/(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/g;
        isValid = regEx.test(value) ? isValid : false
    }

    if(validation.cvc) {
        const regEx = /^[0-9]{3,4}$/g;
        isValid = regEx.test(value) ? isValid : false
    }
    return isValid;
}

//change input fn
function onChangeHandler(event, state, dispatch, controlName) {
    const formControls = {...state};
    const control = {...formControls[controlName]}
    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);
    formControls[controlName] = control;
    let isFormValid = true;
    Object.keys(formControls).forEach((name)=> {
        isFormValid = formControls[name].valid ? isFormValid : false
    })

    dispatch(validateForm(formControls, isFormValid))

}

//render inputs fn
function renderInputs(state, dispatch) {
    return Object.keys(state).map((controlName,index)=> {
        const control = state[controlName];
            return <InputGroup
                id = {`${controlName}_id_${index}`}
                key={controlName + index}
                type={control.type}
                label={control.label}
                value={control.value}
                mask={control.mask}
                placeholder = {control.placeholder}
                autocomplete = {control.autocomplete}
                valid={control.valid}
                touched={control.touched}
                errorMessage={control.errorMessage}
                shouldValidate = {!! control.validation}
                onChange = {(event)=> {
                    onChangeHandler(event, state, dispatch, controlName)
                }
                }
            />
    })
}
const PayForm = ({isFormValid, formControls} ) =>  {

    const dispatch = useDispatch();

    return (
        <form
            className='PayForm mt-5 mb-5'
            onSubmit={(event)=> {
            handlerSubmitForm(event)
        }}>
            {/*render inpust fn*/}
            {renderInputs(formControls, dispatch)}
            
            <button
                onClick={()=> {
                handlerSubmitButton()
            }} type='success'
                className='btn btn-danger'
                disabled={!isFormValid}
            >
                Отправить
            </button>
        </form>
    )
}

const mapStateToProps = (state)=> {
    console.log(state)
    return {
        isFormValid: state.formControls.isFormValid,
        formControls: state.formControls.formControls
    }
}
export default connect(mapStateToProps )(PayForm);

