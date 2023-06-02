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
      await Users.updateOne({_id:req.params.id}, req.body)
      res.status(200).json("User has been updated!")
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
async addFriend(req, res) {
  try{
      await Users.updateOne({_id:req.params.id},{$push :{friends:req.params.friendId}})
      res.status(200).json({message:"Friend has been added to user!"})
  }catch(err){
      res.status(500).json(err)
  }
},

// del friend from user
async delFriend(req, res) {
  try{
      await Users.updateOne({_id:req.params.id},{$pull :{friends:req.params.friendId}})
      res.status(200).json({message:"Friend has been removed from user!"})
  }catch(err){
      res.status(500).json(err)
  }
}

}