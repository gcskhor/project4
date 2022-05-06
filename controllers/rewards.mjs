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

  return { getRewards };
}
