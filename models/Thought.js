const {Schema, model} = require('mongoose');
const dayjs = require('dayjs');
const Reaction = require('./Reaction');

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
            get: function(dateTime) {
                return dayjs(dateTime).format('MMM D, YYYY')
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            Reaction
        ]
    }
)

// new model?
const Thought = model("Thought", thoughtSchema);
module.exports = Thought;

// schema settings - create a virtual called reactionCount that retrieves the length of the thought's reactions array