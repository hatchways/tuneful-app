import { useState } from 'react';
import AuthApiService from '../Services/auth-api-service';

const useForm = (callback) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
      const {first_name,last_name,email,password} = event.target
      AuthApiService.postUser({
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
      })
        .then(user => {
          first_name.value = ''
          last_name.value = ''
          email.value = ''
          password.value = ''
        })
        .catch(res => {
          console.log()
        })
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  }
};

export default useForm;