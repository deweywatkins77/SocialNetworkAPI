const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  delUser,
  addFriend,
  delFriend
} = require('../../controller/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);
router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(delUser)
  
router.route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(delFriend)

module.exports = router;