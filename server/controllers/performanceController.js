const Performance =
  require("../models/Performance");

/* CREATE */
const addPerformance =
  async (req, res) => {
    try {
      const performance =
        await Performance.create(
          req.body
        );

      res.json(
        performance
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

/* READ */
const getPerformance =
  async (req, res) => {
    try {
      const records =
        await Performance.find();

      res.json(records);

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

/* UPDATE */
const updatePerformance =
  async (req, res) => {
    try {
      const updated =
        await Performance.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(updated);

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

/* DELETE */
const deletePerformance =
  async (req, res) => {
    try {
      await Performance.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Deleted"
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

module.exports = {
  addPerformance,
  getPerformance,
  updatePerformance,
  deletePerformance
};