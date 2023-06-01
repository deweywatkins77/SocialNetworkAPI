const { Users, Thoughts } = require('../models');

module.exports = {

//get all thoguhts
async getThoughts(req,res){
    try{
        let thoughts = await Thoughts.find()
        res.status(200).json(thoughts)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
},

//get thought by id
async getThoughtById(req,res){
    try{
        let thought = await Thoughts.findOne({_id:req.params.id})
        res.status(200).json(thought)
    }catch(err){
        res.status(500).json(err)
    }
},

//create thought
async createThought(req, res) {
    try{
        let newRecord = await Thoughts.create(req.body)
        await Users.updateOne({username:newRecord.username},{$push :{thoughts:newRecord._id}})
        res.status(200).json({message:"Thought created and user record updated with thought."})
    }catch(err){
        res.status(500).json(err)
    }
},

//update thought by id
async updateThought(req, res) {
    try{
        await Thoughts.updateOne({_id:req.params.id}, req.body)
        res.status(200).json({message:"Thought updated."})
    }catch(err){
        res.status(500).json(err)
    }
},

//delete thought by id
async delThought(req,res){
    try{
        await Thoughts.deleteOne({_id:req.params.id})
        res.status(200).json({message:"Thought Deleted!"})
    }catch(err){
        res.status(500).json(err)
    }
},

// /api/thoughts/:id/reactions

//create reaction
async createReaction(req, res){
    try{
        await Thoughts.updateOne({_id:req.params.id}, {reactions: {$push:req.body}})
        res.status(200).json({message:"Reaction added to Thought"})
    }catch(err){
        res.status(500).json(err)
    }
},

// /api/thoughts/:Id/reactions/reactionId
//delete reaction
async delReaction(req, res){
    try{
        let results = await Thoughts.updateOne({_id:req.params.id}, {$pull: {reactions:{_id:req.params.reactionId}}})
        console.log(results)
        res.status(200).json({message:"Reaction deleted from thought"})
    }catch(err){
        res.status(500).json(err)
    }
}

}