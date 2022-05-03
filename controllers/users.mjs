import jsSHA from 'jssha';

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
      console.log(req.body);
      const { email, password } = req.body;
      const hashedPassword = generateHash(password);
      const user = await db.User.findOne({
        where: {
          email,
          password: hashedPassword,
        },
      });

      if (!user) {
        res.status(401).send(ERROR);
      }

      else {
        console.log(user);
        const {
          id, username, email, restaurant_id,
        } = user.dataValues;

        res.cookie(`userId=${id};`);
        res.cookie(`login=${generateHash(id)};`);

        res.send({
          id, username, email, restaurantId: restaurant_id,
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
      console.log(req.body);
      const {
        email, password, username, telegram,
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
          telegram,
          password: hashedPassword,
        });

        console.log(newUser);
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

  return {
    login, signup, logout, checkIn, checkOut,
  };
}
