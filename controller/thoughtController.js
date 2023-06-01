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

const { Users, Thoughts } = require('../models');

module.exports = {
    async createThought(req, res) {
        try{
            let newRecord = await Thoughts.create(req.body)
            await Users.updateOne({username:newRecord.username},{$push :{thoughts:newRecord._id}})
            res.status(200).json({message:"Thought created and user record updated with thought."})
        }catch(err){
            res.status(500).json(err)
        }
      },
}