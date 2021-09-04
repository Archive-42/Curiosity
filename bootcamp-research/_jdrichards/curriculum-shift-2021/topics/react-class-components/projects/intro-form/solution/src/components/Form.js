import React from 'react';
import { useState } from 'react';

function Form (props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [phoneType, setPhoneType] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [staff, setStaff] = useState('');
    const [checked, setChecked] = useState('');


    const validate = () => {
      const validationErrors = [];

      if (!name) validationErrors.push('Please provide a Name');

      if (!email) {
        validationErrors.push('Please provide an Email');
      } else if(!email.match(/[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+/i)) {
        validationErrors.push('Please provide a valid Email');
      }

      if (phone) {
        let phoneDigits = phone.replace(/\D/g,'');
        if (phoneDigits.length != 10) {
          validationErrors.push('Please provide a 10-digit phone number');
        }
      }

      if (phone && !phoneType) {
        validationErrors.push('Please select a Phone type');
      }

      if (bio.length > 280) {
        validationErrors.push('Please write a shorter bio (you have ' + bio.length + ' chars)');
      }

      return validationErrors;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const errors = validate();

        if (errors.length > 0) return setValidationErrors(errors);

        const formInformation = {
          name,
          email,
          phone,
          phoneType,
          bio,
          staff,
          checked,
          submittedOn: new Date(),
        };

        console.log(formInformation);
        setName('');
        setEmail('');
        setPhone('');
        setPhoneType('');
        setBio('');
        setStaff('');
        setChecked('');
        setValidationErrors([]);
      };

    return (
      <div className='container'>
        <h2>User Information</h2>
        {validationErrors.length > 0 && (
        <div className='errors'>
          The following errors were found:
          <ul>
            {validationErrors.map(error => <li key={error}>{error}</li>)}
          </ul>
        </div>
      )}
        <form onSubmit={onSubmit}>
          <div className='form-row'>
            <label htmlFor='name'>Name:</label>
            <input
              id='name'
              type='text'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className='form-row'>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='text'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className='form-row'>
            <label htmlFor='phone'>Phone:</label>
            <input
              id='phone'
              type='text'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <br/>
            <select
              name='phoneType'
              onChange={e => setPhoneType(e.target.value)}
              value={phoneType}
            >
              <option value='' disabled>Select a phone type...</option>
              {props.phoneTypes.map(phoneType =>
                <option key={phoneType}>{phoneType}</option>
              )}
            </select>
          </div>
          <div className='form-row'>
            <label htmlFor='bio'>Short Bio (280 chars):</label>
            <textarea
              id='bio'
              name='bio'
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </div>
          <div className='form-row'>
            <input type="radio" value="Instructor" name="staff" id='staff-instructor' onChange={(e) => setStaff(e.target.value)}/> Instructor
            <input type="radio" value="Student" name="staff" id='staff-Student' onChange={(e) => setStaff(e.target.value)} /> Student
          <br/>
            <input type="checkbox" value="yes" id='checked' onChange={(e) => setChecked(e.target.value)} /> Sign up for our email list?
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }


  Form.defaultProps = {
    phoneTypes: [
      'Home',
      'Work',
      'Mobile',
    ],
  };

  export default Form ;