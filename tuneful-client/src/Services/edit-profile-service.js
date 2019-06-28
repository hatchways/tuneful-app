import config from '../config'
import user_id from './get-user-id'

const editProfileService = {
    updateUser({ description}) {
      return fetch(`${config.API_ENDPOINT}/users/${user_id}`, {

        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ description }),
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()

        ).catch(e)
        {
        }
    }

}


export default editProfileService