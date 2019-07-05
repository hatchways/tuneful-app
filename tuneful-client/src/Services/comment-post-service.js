import config from '../config'
import user_id from './get-user-id'

const commentPostService = {
    updateUser({ description}) {
      return fetch(`${config.API_ENDPOINT}/comments/posts/${user_id}`, {
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
        )
    }

}


export default editProfileService