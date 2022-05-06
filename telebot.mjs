/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import axios from 'axios';

const WHATSUP_BOT_TOKEN = '5321368970:AAGa2m9egBOy0BR4WP8R-T2VQfA-i9IyzuI';

export const updatesUrl = `https://api.telegram.org/bot${WHATSUP_BOT_TOKEN}/getUpdates?allowed_updates=["message"]`;

export default function telegramNotify(userId, message) {
  const url = `https://api.telegram.org/bot${WHATSUP_BOT_TOKEN}/sendMessage?chat_id=${userId}&text=${message}&parse_mode=html`;

  axios.get(url)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// // Example
const gerald_id = '200224220';
// const vernessa_id = 114679229;
// notify(gerald_id, 'WHADDUP');

// axios.get(updatesUrl)
//   .then((response) => {
//     console.log(response.data);

//     for (const el of response.data.result) {
//       console.log(el.message);
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });
