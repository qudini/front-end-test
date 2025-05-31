import React from 'react'
import PropTypes from 'prop-types';
import StyledInputFiled from '../../components/StyledInputFiled';

const InputField = ({ label, type, setUserInput }) => {

    return (
        <StyledInputFiled>
            <label htmlFor={label}><strong>{label}</strong></label>
            <input type={type} id={label} onChange={e => setUserInput(e.target.value)} />
        </StyledInputFiled>
    )
}
InputField.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    setUserInput: PropTypes.func.isRequired
};
export default InputField
