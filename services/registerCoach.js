// // import axios from 'axios';
// import {REGISTER_URL} from './API_URLs/urls';

// export const coachRegister = data => {
//   const url = REGISTER_URL;

//   // const body = { full_name, email, password };
//   return axios.post(url, data);

//   //   var myHeaders = new Headers();
//   //   myHeaders.append('Content-Type', 'application/json');

//   //   var raw = JSON.stringify({data});

//   //   var requestOptions = {
//   //     method: 'POST',
//   //     headers: myHeaders,
//   //     body: raw,
//   //     redirect: 'follow',
//   //   };

//   //   fetch(url, requestOptions)
//   //     .then(response => response.json())
//   //     .then(result => {
//   //       console.log('this is the result', result);
//   //       return result;
//   //     })
//   //     .catch(error => console.log('error', error));
// };

import axios from 'axios';
import {REGISTER_URL} from './API_URLs/urls';

export const coachRegister = data => {
  const url = REGISTER_URL;

  // const body = { full_name, email, password };
  return axios.post(url, data);
};
