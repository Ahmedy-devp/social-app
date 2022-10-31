const router = require("express").Router()
const Admin = require("../controllers/admin.controller")
const {auth, authAdmin, authUser} = require("../middleware/auth.middleware")
router.post('/addAdmin',auth,authAdmin,Admin.addAdmin)
router.delete('/delAdmin/:id',auth,authAdmin,Admin.delAdmin)
module.exports = router