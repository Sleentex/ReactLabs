import React, { useState } from 'react';
import AddressList from './AddressList';
import PhonesList from './PhonesList';
import InitRow from './InitRow';

function RegisterForm() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [date, setDate] = useState('');
    const [phones, setPhones] = useState([]);
    const [addresses, setAddresses] = useState([]);

    const firstNameChange = value => setFirstName(() => value);
    const lastNameChange = value => setLastName(() => value);
    const dateChange = value => setDate(() => value);
    const phonesChange = value => setPhones(() => value);
    const addressesChange = value => setAddresses(() => value);

    const isValidSubmit = () => {
        return  firstName.length > 3 && 
                lastName.length > 3 && 
                Date.parse(date) < Date.now() &&
                phones.length > 0 && 
                addresses.length > 0;
      }

    const send = async (e) => {
        e.preventDefault();
        alert("Send to server");
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/", {
            method: "POST",
            headers: {'Content-Type': 'application/json;charset=UTF-8' },
            body: JSON.stringify({
                name: firstName,
                surname: lastName,
                birthday: date,
                phones: phones,
                addresses: addresses
            })
        });

        if (response.ok) {
            alert("OK");
            console.log(await response.json());
        }
        else {
            alert(response.status);
        }
    }

    return (
        <form id="makeForm">
             <div className="main">
                <p>Registration</p>

                <InitRow inputType="text" label="First Name" changeHandler={firstNameChange} />
                <InitRow inputType="text" label="Last Name" changeHandler={lastNameChange} />
                <InitRow inputType="date" label="Date of Birth" changeHandler={dateChange} />
                <AddressList changeHandler={addressesChange} />
                <PhonesList changeHandler={phonesChange} />

                <button className="submit" disabled={!isValidSubmit()} onClick={e => send(e)} >Submit</button>
             </div>
        </form>
    );

}

export default RegisterForm;
