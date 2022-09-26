const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address.']
  },
  thoughts: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
      }
    ],
  friends: [
      {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }
  ]
  },
  { 
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
}
);

// create the User Model using the Schema
const User = model('User', userSchema);

// get total count of comments and replies on retrieval
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});


  // export the User model
module.exports = User;