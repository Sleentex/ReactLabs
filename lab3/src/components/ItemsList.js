import React, { useState } from 'react';
import ItemAdd from './ItemAdd';
import Item from './Item';

function ItemsList(props) {
    const [items, setItems] = useState([]);

    const deleteHandler = id => {
        const newItems = items.filter(item => item.id !== id);

        setItems(newItems);
        props.changeHandler(newItems);
    }
    
    const addHandler = value => {
        const newItems = items.concat({id: Date.now(), value: value});

        setItems(newItems);
        props.changeHandler(newItems);
    }
    
    const getItems = () => {
        return items.map((item, index) => (
            <Item 
                key = {index}
                id = {item.id}
                value = {item.value}
                deleteHandler = {deleteHandler}
            />
        )) 
    }

    return (
        <div>
            <div className="item">
                <ul className="list">
                    {getItems()}
                </ul> 
            </div> 
            <ItemAdd label={props.label} addHandler={addHandler} validateHandler={props.validateHandler}/>
        </div>
    );
}

export default ItemsList;