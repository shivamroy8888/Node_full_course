const express = require('express');
const router = express.Router();
// const userRouter = express.Router();
const userController = require('./../controllers/userController')
router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deletUser);

module.exports = router;
