const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Thoughts = require('./thoughts')

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
      ref: 'thoughts'
    }],
    friends:[{
      type: Schema.Types.ObjectId,
      ref: 'users'  
    }]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    versionKey: false
  }
)

userSchema.virtual('friendCount').get(function() {
  return `${this.friends.length}`
})

const Users = mongoose.model('users', userSchema)

module.exports = Users