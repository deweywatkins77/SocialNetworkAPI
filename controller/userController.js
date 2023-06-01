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

const { Users, Thoughts } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try{
        let users = await Users.find()
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
  },

//get user by id
async getUserById(req, res) {
  try{
      let user = await Users.find({_id: {$eq: req.params.id}})
        .populate(['thoughts', 'friends'])
      res.status(200).json(user)
  }catch(err){
      res.status(500).json(err)
  }
},

//create new user
async createUser(req, res) {
  try{
      let response = await Users.create(req.body)
      res.status(200).json(response)
  }catch(err){
      res.status(500).json({message: "Username/Email already exists, or bad format for fields, check requirements!"})
  }
},

//update user by id
async updateUser(req, res) {
  try{
      let response = await Users.updateOne({_id:req.params.id}, req.body)
      res.status(200).json(response)
  }catch(err){
      res.status(500).json({message: "Incorrect ID, or bad format for fields, check requirements!"})
  }
},

//del user by id
async delUser(req, res) {
  try{
      let doc = await Users.findOne({_id:req.params.id}).select('thoughts')
      let thoughtIds = doc.thoughts.map(thoughtId => thoughtId.toString());

      for (i=0; i < thoughtIds.length; i++){
        await Thoughts.deleteOne({_id:thoughtIds[i]})
      }

      await Users.deleteOne({_id:req.params.id})
      res.status(200).json({message:"The user and their thoughts have been deleted!"})
  }catch(err){
      res.status(500).json(err)
  }
},

// add friend to user
async delUser(req, res) {
  try{
      await Users.findOne({_id:req.params.id}).select('thoughts')
      let thoughtIds = doc.thoughts.map(thoughtId => thoughtId.toString());

      for (i=0; i < thoughtIds.length; i++){
        await Thoughts.deleteOne({_id:thoughtIds[i]})
      }

      await Users.deleteOne({_id:req.params.id})
      res.status(200).json({message:"The user and their thoughts have been deleted!"})
  }catch(err){
      res.status(500).json(err)
  }
}
//   // Get a course
//   getSingleCourse(req, res) {
//     Course.findOne({ _id: req.params.courseId })
//       .select('-__v')
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: 'No course with that ID' })
//           : res.json(course)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // Create a course
//   createCourse(req, res) {
//     Course.create(req.body)
//       .then((course) => res.json(course))
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // Delete a course
//   deleteCourse(req, res) {
//     Course.findOneAndDelete({ _id: req.params.courseId })
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: 'No course with that ID' })
//           : Student.deleteMany({ _id: { $in: course.students } })
//       )
//       .then(() => res.json({ message: 'Course and students deleted!' }))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Update a course
//   updateCourse(req, res) {
//     Course.findOneAndUpdate(
//       { _id: req.params.courseId },
//       { $set: req.body },
//       { runValidators: true, new: true }
//     )
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: 'No course with this id!' })
//           : res.json(course)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
}
