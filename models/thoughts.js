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
      get: function (createdAt){
        return createdAt.toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });
      }
    },
    reactions:[reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    versionKey: false
  }
)

thoughtsSchema.virtual('reactionCount').get(function() {
    return `${this.reactions.length}`
})

const Thoughts = mongoose.model('thoughts', thoughtsSchema)

module.exports = Thoughts