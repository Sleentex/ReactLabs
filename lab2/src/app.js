const validationPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

let idAddress = 0;
let idPhone = 0;

let phoneList = [];
let addressList = [];

window.onload = () => {
  document.getElementById('makeForm').onsubmit = handleSubmit;
  document.getElementById('addPhoneButton').onclick = handleAddPhone;
  document.getElementById('addAddressButton').onclick = handleAddAddress;
  document.getElementById('firstNameInput').oninput = handleChange;
  document.getElementById('lastNameInput').oninput = handleChange;
  document.getElementById('birthdayInput').oninput = handleChange;
  document.getElementById('addressInput').oninput = handleChange;
  document.getElementById('phoneInput').oninput = handleChange;
}

function handleChange() {
  const firstName = document.getElementById('firstNameInput').value;
  const lastName = document.getElementById('lastNameInput').value;
  const birthday = document.getElementById('birthdayInput').value;
  const address = document.getElementById('addressInput').value;
  const phone = document.getElementById('phoneInput').value;

  const addAddressBtn = document.getElementById('addAddressButton');
  addAddressBtn.disabled = !isValidAddress(address);
  changeColorBtn(addAddressBtn);

  const addPhoneBtn = document.getElementById('addPhoneButton');
  addPhoneBtn.disabled = !isValidPhone(phone);
  changeColorBtn(addPhoneBtn);


  const submitBtn = document.getElementById('submitButton');
  submitBtn.disabled = !isValidSubmit(firstName, lastName, birthday, address, phone);
  changeColorBtn(submitBtn);

}


function handleAddAddress() {
  const address = document.getElementById('addressInput').value;

  idAddress += 1;

  const addressObj = {
    id: idAddress,
    address: address
  };

  addressList.push(addressObj);

  handleChange();
  addAddressToHTML(addressObj);
}


function addAddressToHTML(addressObj) {
  const blockDiv = document.createElement('div');
  blockDiv.className = 'addressItem';
  blockDiv.id = 'address' + addressObj.id;

  const label = document.createElement('label');
  label.className = 'labelLeft';
  label.innerHTML = addressObj.address;

  const removeButton = document.createElement('input');
  removeButton.type = 'button';
  removeButton.className = 'xButton';
  removeButton.value = 'X';
  removeButton.onclick = () => handleRemoveAddress(addressObj.id);

  const hr = document.createElement('hr');
  hr.className = 'hr-horizontal-gradient';

  const space = document.getElementById('spaceAddress');
  space.parentNode.insertBefore(blockDiv, space.nextSibling);

  blockDiv.appendChild(label);
  blockDiv.appendChild(removeButton);
  blockDiv.appendChild(hr);
}

function handleRemoveAddress(id) {
  const space = document.getElementById('spaceAddress');

  let element = document.getElementById('address' + id);
  space.parentNode.removeChild(element);

  addressList = addressList.filter(x => x.id !== id);
  handleChange();
}

//--------------------------------------------------------------


function handleAddPhone() {
  const phone = document.getElementById('phoneInput').value;

  idPhone += 1;

  const phoneObj = {
    id: idPhone,
    phone: phone
  };

  phoneList.push(phoneObj);

  handleChange();
  addPhoneToHTML(phoneObj);
}


function addPhoneToHTML(phoneObj) {
  const blockDiv = document.createElement('div');
  blockDiv.className = 'addressItem';
  blockDiv.id = 'phone' + phoneObj.id;

  const label = document.createElement('label');
  label.className = 'labelLeft';
  label.innerHTML = phoneObj.phone;

  const removeButton = document.createElement('input');
  removeButton.type = 'button';
  removeButton.className = 'xButton';
  removeButton.value = 'X';
  removeButton.onclick = () => handleRemovePhone(phoneObj.id);

  const hr = document.createElement('hr');
  hr.className = 'hr-horizontal-gradient';

  const space = document.getElementById('spacePhone');
  space.parentNode.insertBefore(blockDiv, space.nextSibling);

  blockDiv.appendChild(label);
  blockDiv.appendChild(removeButton);
  blockDiv.appendChild(hr);
}

function handleRemovePhone(id) {
  const space = document.getElementById('spacePhone');

  let element = document.getElementById('phone' + id);
  space.parentNode.removeChild(element);
}

//-------------------------------------------

async function handleSubmit(e) {
  e.preventDefault();
  alert('Sent to server');

  const response = await fetch('https://god.com/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify({
          firstName: document.getElementById('firstNameInput').value,
          lastName: document.getElementById('lastNameInput').value,
          birthday: document.getElementById('birthdayInput').value,
          addresses: addressList,
          phoneNumbers: phoneList  
      })
  });
  
  if(response.ok) {
      alert('OK');
      console.log(await response.json());
  }
  else {
      alert(response.status);
  }
}


function changeColorBtn(button) {
  if (!button.disabled) {
    button.style = "background-color: #2E2827;";
  } else {
    button.style = "background-color: #8B8B8B;";
  }
}


function isValidAddress(address) {
  return address.length > 8;
}

function isValidPhone(phone) {
  return validationPhone.test(phone);
}

function isValidSubmit(firstName, lastName, birthday, address, phone) {
  return  firstName.length > 3 && 
          lastName.length > 3 && 
          Date.parse(birthday) < Date.now() &&
          addressList.length > 0 && 
          phoneList.length > 0;
}


const app = document.querySelector('.app');
const title = document.createElement('div');

title.className = 'title';
app.appendChild(title);