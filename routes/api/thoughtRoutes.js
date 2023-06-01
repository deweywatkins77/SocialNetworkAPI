// **`/api/thoughts`**

// * `GET` to get all thoughts

// * `GET` to get a single thought by its `_id`

// * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

// ```json
// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// ```

// * `PUT` to update a thought by its `_id`

// * `DELETE` to remove a thought by its `_id`

// ---
const router = require('express').Router();
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    delThought
//   deleteStudent,
//   addAssignment,
//   removeAssignment,
} = require('../../controller/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought)

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(delThought)

// /api/users
// router.route('/').get(getUsers).post(createUser);
// router.route('/:id')
//   .get(getUserById)
//   .put(updateUser)
//   .delete(delUser)

// // /api/students/:studentId
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// // /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;