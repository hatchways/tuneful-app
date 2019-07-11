
let retrievedObject = ""
let userJSONData = ""
let user_id = ""

try{
   retrievedObject = localStorage.getItem('tuneful-client-auth-token');
   userJSONData = JSON.parse(atob(retrievedObject.split('.')[1]));
   user_id = userJSONData.user_id
}
catch(e){
  user_id = ""
}


export default user_id
