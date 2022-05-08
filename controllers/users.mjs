/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable spaced-comment */
/* eslint-disable camelcase */
import jsSHA from 'jssha';
import axios from 'axios';
import telegramNotify, { updatesUrl } from '../telebot.mjs';

const SALT = 'whatSUP_!!1!0_0';
const ERROR = 'error';
const SUCCESS = 'success';

const generateHash = (password) => {
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(password + SALT);
  const hash = shaObj.getHash('HEX');
  return hash;
};

export default function initUserController(db) {
  const login = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'login start');
      const { email, password } = req.body;
      const hashedPassword = generateHash(password);
      const user = await db.User.findOne({
        where: {
          email,
          password: hashedPassword,
        },
        include: [
          {
            model: db.Reward,
            as: 'rewards',
          },
        ],
      });

      if (!user) {
        res.status(401).send(ERROR);
      }

      else {
        console.log(user);
        const {
          id, username, email, restaurant_id, rewards,
        } = user.dataValues;

        res.cookie(`userId=${id};`);
        res.cookie(`login=${generateHash(id)};`);

        res.send({
          id, username, email, restaurantId: restaurant_id, rewards,
        });
      }

      console.log('\x1b[36m%s\x1b[0m', 'login end');
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'login error');
      console.error(err);
    }
  };

  const signup = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'signup start');
      // console.log(req.body);
      const {
        email, password, username, telegram_handle,
      } = req.body;
      const hashedPassword = generateHash(password);

      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      if (!user && user !== '') {
        const newUser = await db.User.create({
          email,
          username,
          telegram_handle,
          password: hashedPassword,
        });

        /////////////////////////////////////////////
        // TELEGRAM SENDMESSAGE ON SUCCESSFUL SIGNUP

        if (newUser) {
          await axios.get(updatesUrl)
            .then((response) => {
              console.log('executed axios call to get updates from bot');
              console.log(response.data);
              let telegramId = '';

              for (const el of response.data.result) {
                if (el.message.chat.username === telegram_handle) {
                  console.log('found');
                  console.log(el.message.chat.id);
                  telegramId = el.message.chat.id;
                  break;
                }
              }

              if (telegramId) {
                return telegramId;
              }
            })
            .then((response) => {
              // send message to user to complete signup
              const messageToSend = 'Thanks for signing up for whatSUP! Registration is all done!';
              telegramNotify(response, messageToSend);

              db.User.update({
                telegram_id: response,
              },
              {
                where: {
                  id: newUser.dataValues.id,
                },
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }

        /////////////////////////////////////////////
        /////////////////////////////////////////////

        res.send(SUCCESS);
        console.log('\x1b[36m%s\x1b[0m', 'signup end');
      }
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'signup error');
      console.log(err);
      res.status(501).send(ERROR);
    }
  };

  const logout = async (req, res) => {
    console.log('\x1b[36m%s\x1b[0m', 'logout start');
    console.log('logging out');
    try {
      console.log('logging out');
      res.clearCookie('userId');
      res.clearCookie('login');
      res.send('logged out');
      console.log('\x1b[36m%s\x1b[0m', 'logout end');
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'logout error');
      console.log(err);
    }
  };

  const checkIn = async (req, res) => {
    console.log('\x1b[36m%s\x1b[0m', 'checkIn start');
    console.log(req.body);

    try {
      const { user, restaurant } = req.body;

      if (user) {
        const { id } = user;

        const updatedUser = await db.User.update(
          {
            restaurant_id: restaurant.id,
          },
          {
            where: {
              id,
            },
          },
        );

        console.log(updatedUser);
        console.log('\x1b[36m%s\x1b[0m', 'checkIn end');
      }
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'checkIn error');

      console.log(err);
    }
  };

  const checkOut = async (req, res) => {
    console.log('\x1b[36m%s\x1b[0m', 'checkOut start');
    console.log(req.body);

    try {
      const { user, restaurant } = req.body;

      if (user) {
        const { id } = user;

        const updatedUser = await db.User.update(
          {
            restaurant_id: null,
          },
          {
            where: {
              id,
            },
          },
        );

        console.log(updatedUser);
      }

      console.log('\x1b[36m%s\x1b[0m', 'checkOut end');
    }
    catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'checkout error');
      console.log(err);
    }
  };

  const getVisits = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'getVisits start');

      // console.log(req.params);
      const { id } = req.params;

      const user = await db.User.findOne({
        where: {
          id,
        },
      });

      // console.log(user.dataValues.visited);

      const { visited } = user.dataValues;

      // if (!visited) {
      //   res.send({ visited: 0 });
      // } else {
      //   res.send({ visited });
      // }

      !visited
        ? res.send({ visited: 0 })
        : res.send({ visited });

      console.log('\x1b[36m%s\x1b[0m', 'getVisits end');
    } catch (err) {
      console.log(err);
      console.log('\x1b[36m%s\x1b[0m', 'getVisits error');
    }
  };

  return {
    login, signup, logout, checkIn, checkOut, getVisits,
  };
}
