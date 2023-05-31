const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Thought = require('./thought')

const userSchema = new Schema(
  {
    username:{
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    thoughts:[{
      type: Schema.Types.ObjectId,
      ref: 'thought'
    }],
    friends:[{
      type: Schema.Types.ObjectId,
      ref: 'user'  
    }]
  },
  {
    toJSON: {
      getters: true,
    },
    id: true,
  }
)

userSchema.virtual('friendCount').get(function() {
  return `${this.friends.length}`
})

const User = mongoose.model('user', userSchema)

module.exports = User