import { useState } from 'react';
import AuthApiService from '../Services/auth-api-service';
import history from '../Services/history';

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
          //log error here
          console.log()
        })

        history.push('/success')
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.id]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  }
};

export default useForm;