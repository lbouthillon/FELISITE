import axios from 'axios';
import config from '../config.json';

const isValidated = () => {
  return (axios({
    method: 'get',
    url: `${config.back_Url}/users/me`,
    headers: { Token: localStorage.getItem('killerToken') },
  }).then((data) => {
    if (data.data.status === 200) {
      localStorage.setItem('validated', (data.data.object.pseudo !== null && data.data.object.room !== null) && (data.data.object.pseudo !== '' && data.data.object.room !== ''));
    }
  }));
}

export default isValidated
