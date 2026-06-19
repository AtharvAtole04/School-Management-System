const Notice =
  require("../models/Notice");

const addNotice =
  async (req, res) => {
    const notice =
      await Notice.create(
        req.body
      );

    res.json(notice);
  };

const getNotices =
  async (req, res) => {
    const notices =
      await Notice.find();

    res.json(notices);
  };

const updateNotice =
  async (req, res) => {
    const notice =
      await Notice.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(notice);
  };

const deleteNotice =
  async (req, res) => {
    await Notice.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Deleted"
    });
  };

module.exports = {
  addNotice,
  getNotices,
  updateNotice,
  deleteNotice
};