const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      trim: true,
      validate: function (value) {
        if (!validator.isEmail(value)) throw new Error("invalid email");
      },
    },
    password: { type: String, required: true, trim: true },
    profileImage: { type: String, trim: true, default: "app.webp" },
    userType: {
      type: String,
      required: true,
      trim: true,
      enum: ["admin", "user"],
    },
    status: { type: Boolean, required: true, default: false },
    friendShip: [{ type: mongoose.Schema.Types.ObjectId, ref: "Friends" }],
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);
userSchema.virtual("allPosts", {
  ref: "Article",
  localField: "_id",
  foreignField: "userId",
});
userSchema.virtual("userComments", {
  ref: "Article",
  localField: "_id",
  foreignField: "comments.userId",
});
userSchema.virtual("userLikes", {
  ref: "Article",
  localField: "_id",
  foreignField: "likes.userId",
});
userSchema.methods.toJSON = function () {
  const userData = this.toObject();
  delete userData.__v;
  delete userData.tokens;

  return userData;
};
userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 12);
});
userSchema.statics.login = async (userName, password) => {
  const userData = await User.findOne({ userName });
  if (!userData) throw new Error("invalid username");
  const isvalid = await bcrypt.compare(password, userData.password);
  if (!isvalid) throw new Error("invalid password");
  return userData;
};
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWTKEY);
  user.tokens.push({ token });
  await user.save();
  return token;
};

const articleModel = require("./article.model");
userSchema.pre("remove", async function (next) {
  await articleModel.deleteMany({ userId: this._id });
  //remove user comments
  //remove user likes
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
