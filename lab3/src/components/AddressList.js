import React from 'react';
import ItemsList from './ItemsList';

function AddressList(props) {

    const validateHandler = value => value.length > 10;

    return <ItemsList 
        validateHandler = {validateHandler}
        changeHandler = {props.changeHandler}
        label = "Addresses"
    />
}

export default AddressList;

