import React, { useState } from 'react';

function ItemAdd(props) {

    const [value, setValue] = useState('');

    const addElement = (e) => {
        e.preventDefault();
        props.addHandler(value);
    }

    return (
        <div className="initRow">
            <label className="spaceLabel" >{props.label}</label>
            <input type="text" className="spaceInput" onInput={ event => setValue(event.target.value)} />
            <button className="add" disabled={!props.validateHandler(value)} onClick={e => addElement(e)}>add</button>
        </div>
    );
}

export default ItemAdd;