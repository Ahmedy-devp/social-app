const router = require("express").Router();
const Article = require("../controllers/article.controller");
const { auth, authAdmin, authUser } = require("../middleware/auth.middleware");

const upload = require("../middleware/fileUpload.middleware");


router.post("/addArticle", auth,authUser,upload.single("img"), Article.addArticle);
router.patch("/editArticle/:id", auth,authUser, Article.editPost)
router.patch("/addComment/:id", auth, authUser, Article.addComment);
router.patch("/addLikes/:id", auth, authUser, Article.addLikes);
router.delete("/delComment/:id/:commId", auth, authUser, Article.delComment);
router.delete("/delPost/:id", auth, authUser, Article.delPost);
// router.delete("/unLike/:id", auth, authUser, Article.unLike);
router.get("/single/:articleId", auth, Article.single);
router.get("/showAll", auth, Article.showAll);
router.get("/allComments", auth, Article.allComments);
router.post("/userUpdate", auth, Article.userUpdate);
router.get('/userArticles',auth, Article.userArticles);
module.exports = router;
