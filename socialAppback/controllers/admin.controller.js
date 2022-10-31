const adminModel = require("../models/user.model");
const { resBuilder } = require("../helper/app.helper");

class Admin {
  static addAdmin = async (req, res) => {
    try {
      if (req.user.userType !== "admin")
        throw new Error("you are not an admin");
      const data = new adminModel(req.body);
      data.userType = "admin";
      await data.save();
      resBuilder(res, true, data, "admin added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static delAdmin = async (req, res) => {
    try {
      //findById(req.params.id)
      const data = await req.user.remove();
      resBuilder(res, true, data, "admin removed");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
}
module.exports = Admin;
