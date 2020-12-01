import React from 'react';

function InitRow(props) {
    return (
        <div className="initRow">
            <label>{props.label}</label>
            <input type={props.inputType} onChange={ e => props.changeHandler(e.target.value) } />
        </div>
    );
}

export default InitRow;