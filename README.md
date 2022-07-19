# WHATSUP - An app for live restaurant updates

WhatSup is a full-stack app mobile webapp for users to share live updates on restaurants through live chatrooms and reviews.

## Deployed App

Coming soon

## Features

### Homepage / Restaurant Autocomplete

> Allows the user to search through any restaurant in Singapore using the Google Place Autocomplete & Details APIs
> ![WhatSup homepage and restaurant autocomplete demo](./public/images/readme/whatsup_autocomplete_gif.gif)

### Live Chatroom

> Individual restaurants have their own chatrooms so that users can find out how things are at the restaurant by users who are currently there.
> ![WhatSup Live Chatroom demo](./public/images/readme/whatsup_chatroon_gif.gif)

### Telegram Notifications

> When a user is checked into a restaurant, the telegram bot (activated by the user on signup prompt) will provide notifications whenever a new user is posting messages in the restaurant's chatroom.
> ![WhatSup Live Chatroom demo](./public/images/readme/telegram_bot.jpeg)

### Reviews

> Users who are logged-in can leave reviews on a restaurant of their choice, and these reviews can be viewed by all other users.
> ![WhatSup Live Chatroom demo](./public/images/readme/reviews.png)

### User Rewards

> Users can get badges through completing objectives related to using the app.
> These badges appear next to their usernames in chatrooms.
> ![WhatSup user reward image](./public/images/readme/rewards.png)

## Local Setup

To get a local copy running, just follow these steps:

### Prerequisites

- NPM
  ```sh
  npm install npm@latest -g
  ```
- PostgreSQL

### To run

1. Clone the repo
2. Install NPM packages
   ```sh
   npm i
   ```
3. Initiate the database with Sequelize
   ```sh
   npx sequelize db:create && npx sequelize db:migrate && npx sequelize db:seed:all
   ```
4. Run app
   ```sh
   npm run start
   ```
