const { resBuilder } = require("../helper/app.helper");
const userModel = require("../models/user.model");
// const fs=require("fs")
// const path= require("path")
class User {
  static register = async (req, res) => {
    try {
      const userData = new userModel(req.body);
      userData.userType = "user";
      await userData.save();
      resBuilder(res, true, userData, "added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static login = async (req, res) => {
    try {
      const userData = await userModel.login(
        req.body.userName,
        req.body.password
      );
      const token = await userData.generateToken();
      resBuilder(res, true, { userData, token }, "logged in");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static me = async (req, res) => {
    resBuilder(res, true, req.user, "logged in");
  };
  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
      await req.user.save();
      resBuilder(res, true, [], "done");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static logoutAll = async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      resBuilder(res, true, req.user, "done");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static editProfile = async (req, res) => {
    try {
      const user = req.body;
      const editedKeys = ["name", "email","password"];
      const keys = Object.keys(user);
      const isValid = keys.every((k) => {
        return editedKeys.includes(k);
      });
      // res.send(isValid);
      if (!isValid) throw new Error("you can't edit that");
      keys.forEach((k) => (req.user[k] = req.body[k]));
      await req.user.save();
      resBuilder(res, true, req.user, "done");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static addImg = async (req, res) => {
    try {
      req.user.profileImage = req.file.path.replace("static\\", "");
      await req.user.save();
      resBuilder(res, true, req.user, "done");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static allUsers = async (req, res) => {
    try {
      const data = await userModel.find();
      resBuilder(res, true, data, "all users");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static delUser = async (req, res) => {
    try {
      //findById(req.params.id)
      const data = await req.user.remove();
      resBuilder(res, true, data, "user removed");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
}
module.exports = User;
