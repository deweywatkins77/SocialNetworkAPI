// **`/api/users`**

              // * `GET` all users

              // * `GET` a single user by its `_id` and populated thought and friend data

              // * `POST` a new user:

              // ```json
              // // example data
              // {
              //   "username": "lernantino",
              //   "email": "lernantino@gmail.com"
              // }
              // ```

// * `PUT` to update a user by its `_id`

// * `DELETE` to remove user by its `_id`

// **BONUS**: Remove a user's associated thoughts when deleted.

// ---

// **`/api/users/:userId/friends/:friendId`**

// * `POST` to add a new friend to a user's friend list

// * `DELETE` to remove a friend from a user's friend list

// ---

const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
//   deleteStudent,
//   addAssignment,
//   removeAssignment,
} = require('../../controller/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUserById)

// // /api/students/:studentId
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// // /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;