var express = require('express');
var router = express.Router()


const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { userById } = require("../controllers/user");
router.param("userId", userById);
router.param("categoryId", categoryById);

router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove);
router.get("/category", list);

module.exports = router;