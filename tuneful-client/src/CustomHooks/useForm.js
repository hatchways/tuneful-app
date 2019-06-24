import { useState } from 'react';
import AuthApiService from '../Services/auth-api-service';
import history from '../Services/history';
import TokenService from '../Services/token-service'


const useForm = (callback) => {

  const [values, setValues] = useState({});
  const [error,setError] = useState(null);

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


  const handleSubmitJwtAuth = (event) => {
    event.preventDefault()
    const { email, password } = event.target
 
    AuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then(res => {
        email.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
      })
      .catch(res => {
        setError(res.error)})
      
 }

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.id]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    handleSubmitJwtAuth,
    values,
  }
};

export default useForm;