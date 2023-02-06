const express = require('express');
const router = express.Router();
const {
    isAuthenticatedUser,
    authorizeRoles, 
} = require('../middlewares/auth')

const {
    registerUser,
    loginUser,
    logout,
    deleteAllUsers

} = require('../controllers/userController');
//validation(userSchema)
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/admin/users/deleteAll').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteAllUsers); 
module.exports = router;