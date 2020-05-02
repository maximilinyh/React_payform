import React from "react";
import InputMask from 'react-input-mask';
import './InputGroup.scss';

function isInValid({valid, touched, shouldValidate}) {
    return !valid && touched && shouldValidate
}

const InputGroup = (props) => {
    return(
             <div className={props.valid ? 'InputGroup form-group valid': 'InputGroup form-group'}>
                 <label
                     htmlFor={props.id}>{props.label}</label>
                 <InputMask
                     mask ={props.mask}
                     placeholder = {props.placeholder}
                     type={props.type}
                     className="form-control"
                     id={props.id}
                     defaultValue={props.value}
                     autoComplete = {props.autocomplete}
                     onChange={props.onChange}>
                 </InputMask>
                 {isInValid(props)
                 ?
                     <span className='error-message'>{props.errorMessage || 'Заполните пожалуйста поле корректно'}</span>
                 : null
                 }
             </div>

    );
}

export default InputGroup;