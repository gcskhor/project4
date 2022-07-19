import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { WHATSUP_BOT_TOKEN } = process.env;

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
