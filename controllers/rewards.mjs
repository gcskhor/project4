export default function initRewardsController(db) {
  const getRewards = async (req, res) => {
    try {
      const rewards = await db.Reward.findAll({
      });
      res.send(rewards);
    } catch (err) {
      console.log(err);
    }
  };

  const collectRewards = async (req, res) => {
    try {
      const { rewardName, user } = req.body;

      const selectedReward = await db.Reward.findOne({
        where: {
          name: rewardName,
        },
      });

      const selectedUser = await db.User.findOne({
        where: {
          id: user.id,
        },
      });

      const result = await selectedReward.addUser(selectedUser);
    } catch (err) {
      console.log(err);
    }
  };

  return { getRewards, collectRewards };
}
