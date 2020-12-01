import React from 'react';
import ItemsList from './ItemsList';

function PhonesList(props) {

    const validatingRule = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

    const validateHandler = value => {
        return validatingRule.test(value);
    }

    return <ItemsList 
        validateHandler = {validateHandler}
        changeHandler = {props.changeHandler}
        label = "Phones"
    />
}

export default PhonesList;