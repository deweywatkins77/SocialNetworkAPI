const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reactionSchema = require('./reaction')

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions:[reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
    id: true,
  }
)

thoughtsSchema.virtual('reactionCount').get(function() {
    return `${this.reactions.length}`
})

  thoughtsSchema.virtual('getDate').get(function() {
    return `${this.createdAt.toLocaleString('en-US')}`
})

const Thoughts = mongoose.model('thoughts', thoughtsSchema)

module.exports = Thoughts