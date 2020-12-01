import React, { useState } from 'react';

function Item(props) {
    return (
        <li key={props.id}>
            <label>{props.value}</label>
            <input type="button" className="xButton" value="X" onClick={() => props.deleteHandler(props.id)} />
            <hr className="hr-horizontal-gradient"/> 
        </li>
    );
}

export default Item;