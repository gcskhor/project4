import jsSHA from 'jssha';
import axios from 'axios';
import dotenv from 'dotenv';
import telegramNotify, { updatesUrl } from '../telebot.mjs';

dotenv.config();

const { SALT } = process.env;
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
        const {
          id, username, email, restaurant_id, rewards,
        } = user.dataValues;

        res.cookie(`userId=${id};`);
        res.cookie(`login=${generateHash(id)};`);

        res.send({
          id, username, email, restaurantId: restaurant_id, rewards,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signup = async (req, res) => {
    try {
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

        // TELEGRAM SENDMESSAGE ON SUCCESSFUL SIGNUP
        if (newUser) {
          await axios.get(updatesUrl)
            .then((response) => {
              console.log('executed axios call to get updates from bot');
              console.log(response.data);
              let telegramId = '';

              for (const el of response.data.result) {
                if (el.message.chat.username === telegram_handle) {
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

        res.send(SUCCESS);
      }
    } catch (err) {
      console.log(err);
      res.status(501).send(ERROR);
    }
  };

  const logout = async (req, res) => {
    try {
      res.clearCookie('userId');
      res.clearCookie('login');
      res.send('logged out');
    } catch (err) {
      console.log(err);
    }
  };

  const checkIn = async (req, res) => {
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkOut = async (req, res) => {
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
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  const getVisits = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db.User.findOne({
        where: {
          id,
        },
      });

      const { visited } = user.dataValues;

      !visited
        ? res.send({ visited: 0 })
        : res.send({ visited });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    login, signup, logout, checkIn, checkOut, getVisits,
  };
}
