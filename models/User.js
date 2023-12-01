const {Schema, Model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            // is unique = true
            required: true,
            // is trimmed = true
        },
        email: {
            type: String,
            required: true,
            //is unique
            // must match valid email address, look into mongooses matching validation
        },
        thoughts: {
            //array of _id values that reference the thought model here
        },
        friends: {
            //array of _if values referencing the user model
        }
    }
)

module.exports = userSchema;
//Schema settings - create a virtual called friendCount tha tretrieves the length of the user's friends array field on query