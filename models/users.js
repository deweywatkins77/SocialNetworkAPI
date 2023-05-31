const { Schema, Types } = require('mongoose');

// * `username`
//   * String
//   * Unique
//   * Required
//   * Trimmed

// * `email`
//   * String
//   * Required
//   * Unique
//   * Must match a valid email address (look into Mongoose's matching validation)

// * `thoughts`
//   * Array of `_id` values referencing the `Thought` model

// * `friends`
//   * Array of `_id` values referencing the `User` model (self-reference)

// **Schema Settings**:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.

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

const User = mongoose.model('user', userSchema)

module.exports = User