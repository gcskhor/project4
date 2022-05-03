import axios from 'axios';

const BOT_TOKEN = '5375132630:AAHrGReDwWA0QfB9CqUus4ae927NLiP2VKo';

const updatesUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?allowed_updates=["message"]`;

function notify(userId, message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${userId}&text=${message}`;

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
const vernessa_id = 114679229;
notify(gerald_id, 'WHADDUP');
// notify(vernessa_id, "rich bb!!!!!!!")

axios.get(updatesUrl)
  .then((response) => {
    // console.log(response.data);
    response.data.result.forEach((element) => {
      console.log(element);
    });
  })
  .catch((error) => {
    console.log(error);
  });
