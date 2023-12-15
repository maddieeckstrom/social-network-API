const {Schema, model} = require('mongoose');
const Thought = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // must match valid email address, look into mongooses matching validation
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            }
        ],
        friends:  [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        ],
    }
)

//new model?
const User = model("User", userSchema);
module.exports = User;
//Schema settings - create a virtual called friendCount that retrieves the length of the user's friends array field on query