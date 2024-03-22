const express= require('express');
const router= express.Router();
const userController= require('../controllers/userController');
const auth= require("../middleware/auth");

router.get('/api/users/users', auth.authenticate(), userController.getAllUsers);
router.post('/register',userController.register);
router.post('/login',userController.login);

module.exports = router;
