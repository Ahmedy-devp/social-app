const mongoose = require("mongoose");
const articleSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true, ref: "User" },
    profileImage: { type: String, trim: true, ref: "User"},
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    image: { type: String, trim: true},
    comments: [
      {
        comment: {
          commentBody: { type: String, required: true, trim: true },
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          name: { type: String, required: true, ref: "User" },
          profileImage: { type: String, trim:true, ref: "User" },
        },
      },
    ],
    likes: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);
const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
