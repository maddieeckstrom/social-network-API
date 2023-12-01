const {Schema, Model} = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //how to use the getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true
        },
        reactions: {
            //array of nested documents created with the reactionSchema
        }
    }
)

module.exports = thoughtSchema;

// schema settings - create a virtual called reactionCount that retrieves the length of the thought's reactions array