const { Schema, model, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat");


const reactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        trim: true,
        maxlength: 280
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal),
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            type: String,
            required: true,
            ref: 'User'
        },
        reactions: [reactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
  }
)

//   virtual that retrieves the length of the thought's `reactions` array field on query
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });


const Thought = model('Thought', thoughtSchema);


module.exports = Thought;