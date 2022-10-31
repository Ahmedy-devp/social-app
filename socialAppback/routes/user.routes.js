const router = require("express").Router()
const User = require("../controllers/user.controller")
const {auth, authAdmin, authUser} = require("../middleware/auth.middleware")
router.post('/register', User.register)
router.post("/login", User.login)


router.get("/me", auth,authUser,User.me)
router.get("/allUsers", auth,User.allUsers)
router.get("/logout", auth,User.logout)
router.post("/logoutAll", auth,User.logoutAll)
router.patch("/editProfile",auth, User.editProfile)
router.delete('/delUser/:id',auth,authUser,User.delUser)



const upload = require("../middleware/fileUpload.middleware")
router.post("/imgUpload", auth,upload.single("img"), User.addImg)
module.exports = router