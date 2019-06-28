
const retrievedObject = localStorage.getItem('tuneful-client-auth-token');
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
const userJSONData = parseJwt(retrievedObject)
//console.log(userJSONData) 
const user_id = userJSONData.user_id

export default user_id
