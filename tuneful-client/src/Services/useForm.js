import { useState } from 'react';
import AuthApiService from '../Services/auth-api-service';
import history from '../Services/history';
import TokenService from '../Services/token-service';
import editProfileService from '../Services/edit-profile-service';

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
          history.push('/success')
        })
        .catch(res => {
          console.log(res.error)
        })
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

       window.setTimeout(()=>{
         history.push('/spotify-login');
       },1000)
 }

 const handleEditProfileSubmit = (event) => {
  event.preventDefault();
  const {description,image_url} = event.target
  

  editProfileService.updateUser({
    description:description.value,
  })
    .then(res => {
      description.value = ''
    })
    .catch(res => {
      console.log(res.error)
    })

    history.push('/profile')

}

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.id]: event.target.value }));
  };

  const handleLogoutClick = ()=>{
    TokenService.clearAuthToken();
    history.push('/profile')
  };


  return {
    handleChange,
    handleSubmit,
    handleSubmitJwtAuth,
    handleEditProfileSubmit,
    handleLogoutClick,
    values,
    error,
  }
};

export default useForm;