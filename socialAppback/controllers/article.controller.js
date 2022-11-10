const articleModel = require("../models/article.model");
const userModel = require("../models/user.model");
const { resBuilder } = require("../helper/app.helper");

class Article {
  static addArticle = async (req, res) => {
    try {
      const data = new articleModel(req.body);
      if(req.file){
 data.image = req.file.path.replace("static\\", "");
      }
     
      data.userId = req.user._id;
      data.name = req.user.name;
      data.profileImage = req.user.profileImage;
      await data.save();
      resBuilder(res, true, data, "article add");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static addComment = async (req, res) => {
    try {
      const myArticle = await articleModel.findById(req.params.id);
      console.log(myArticle);
      myArticle.comments.push({
        comment: {
          commentBody: req.body.commentBody,
          userId: req.user._id,
          name: req.user.name,
          profileImage: req.user.profileImage,
        },
      });
      await myArticle.save();
      resBuilder(res, true, myArticle, "comment added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static addLikes = async (req, res) => {
    try {
      const myArticle = await articleModel.findById(req.params.id);
      const user = myArticle.likes.findIndex((u) => {
        return u.userId.toString() == req.user._id.toString();
      });
      console.log(user);
      if (user != -1) myArticle.likes.splice(user, 1);
      else myArticle.likes.push({ userId: req.user._id });
      await myArticle.save();
      resBuilder(res, true, myArticle, "like added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static delComment = async (req, res) => {
    try {
      const data = await articleModel.findById(req.params.id);
      const user = data.comments.find((u) => u.id === req.params.commId);
      if (!user) throw new Error("this comment doesn't exist");

      if (user.comment.userId.toString() != req.user.id)
        throw new Error("you can't delete that comment");
      data.comments = data.comments.filter((c) => c.id !== req.params.commId);
      await data.save();
      resBuilder(res, true, data, "comment removed");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  // static unLike = async (req, res) => {
  //   try {
  //     const data = await articleModel.findById(req.params.id);
  //     const user = data.likes.find((u) => u.id === req.params.likeId);
  //     if (user.likes.userId.toString() != req.user.id)
  //       throw new Error("you can't delete that comment");
  //     data.comments = data.comments.filter((c) => c.id !== req.params.commId);
  //     await data.save();
  //     resBuilder(res, true, data, "comment removed");
  //   } catch (e) {
  //     resBuilder(res, false, e, e.message);
  //   }
  // };
  static single = async (req, res) => {
    try {
      const data = await articleModel.findOne({ _id: req.params.articleId });
      resBuilder(res, true, data, "single article");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static showAll = async (req, res) => {
    try {
      const data = await articleModel.find().sort({ createdAt: -1 });
      resBuilder(res, true, data, "all articles");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static delPost = async (req, res) => {
    try {
      const data = await articleModel.findById(req.params.id);
      if (data.userId.toString() != req.user.id)
        throw new Error("you can't delete that post");
      const myArticle = await articleModel.findByIdAndDelete(req.params.id);
      resBuilder(res, true, myArticle, "all articles");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static allComments = async (req, res) => {
    try {
      const data = await articleModel.find();
      // const myComments= data.comments.find((c)=> c.id === req.user.id)
      // resBuilder(res, true, data, "all articles");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  static userUpdate = async (req, res) => {
    try {
      const data = await articleModel.find({ userId: req.user._id });
      data.forEach(async (d) => {
        d.name = req.user.name;
        d.profileImage = req.user.profileImage;
        await d.save();
      });
      const data1 = await articleModel.find();
      data1.forEach(async (d) => {
        d.comments.forEach((c) => {
          
          if (c.comment.userId.toString() == req.user._id.toString()) {
            c.comment.name = req.user.name;
            c.comment.profileImage = req.user.profileImage;
          }
        });
        await d.save();
      });
 data.save()
      resBuilder(res, true, {data,data1}, "all articles");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
 static userArticles= async (req, res) => {
  try {
    const data = await articleModel.find({userId: req.user._id})
    resBuilder(res, true, data, "user article");
  }
  catch (e) {
    resBuilder(res, false, e, e.message);
  }
 }
//  static addImg = async (req, res) => {
//   try {
//     const myArticle = await articleModel.find()
//     console.log(myArticle)
//     if(req.file){
//       myArticle.image = req.file.path.replace("static\\", "")
//     };
//     await myArticle.save();
//     resBuilder(res, true, myArticle, "done");
//   } catch (e) {
//     resBuilder(res, false, e, e.message);
//   }
// };
static editPost= async (req, res) => {
  try
  {
    const user = await articleModel.findById(req.params.id);
      if (user.userId.toString() != req.user._id.toString())
        throw new Error("you can't edit that post");
  
    if(req.file){
        user.image = req.file.path.replace("static\\", "");
      }
    user.title = req.body.title
    user.body = req.body.body
      await user.save()
      resBuilder(res, true, user, "done");
  }
  catch (e) {
    resBuilder(res, false, e, e.message);
  }
}
}
module.exports = Article;
