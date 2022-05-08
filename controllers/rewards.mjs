/* eslint-disable no-unused-expressions */
const ERROR = 'error';

export default function initRewardsController(db) {
  const getRewards = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'getRewards start');

      // console.log(req.body);

      const rewards = await db.Reward.findAll({
      });

      // console.log(rewards);
      res.send(rewards);

      console.log('\x1b[36m%s\x1b[0m', 'getRewards end');
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'getRewards error');
      console.log(err);
    }
  };

  const collectRewards = async (req, res) => {
    try {
      console.log('\x1b[36m%s\x1b[0m', 'collectRewards start');

      console.log(req.body);
      const { rewardName, user } = req.body;

      const selectedReward = await db.Reward.findOne({
        where: {
          name: rewardName,
        },
      });

      console.log(selectedReward);

      const selectedUser = await db.User.findOne({
        where: {
          id: user.id,
        },
      });

      const result = await selectedReward.addUser(selectedUser);

      console.log(result);

      console.log('\x1b[36m%s\x1b[0m', 'collectRewards end');
    } catch (err) {
      console.log('\x1b[36m%s\x1b[0m', 'collectRewards error');

      console.log(err);
    }
  };

  return { getRewards, collectRewards };
}
