import './App.css';

import React, { useState } from 'react';
import * as Yup from 'yup';

function UserFormWithYup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    name: Yup.string()
          .required('Name is required'),
    email: Yup.string()
          .email('Invalid email format')
          .required('Email is required'),
    password: Yup.string()
              .min(8, 'Password must be at least 8 characters')
              .required('Password is required'),
    phone: Yup.string()
          .matches(/^\d{10}$/, 'Phone number must be 10 digits')
          .required('Phone number is required'),
    age: Yup.number()
        .min(18, 'You must be at least 18 years old')
        .required('Age is required'),
    agreeToTerms: Yup.boolean()
                  .oneOf([true], 'You must agree to the terms')
                  .required('You must agree to the terms'),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      console.log('Form data:', formData);
      setErrors({});
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <p>{errors.phone}</p>}
      </div>
      <div>
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} />
        {errors.age && <p>{errors.age}</p>}
      </div>
      <div>
        <label>
          <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
          Agree to Terms
        </label>
        {errors.agreeToTerms && <p>{errors.agreeToTerms}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserFormWithYup;
