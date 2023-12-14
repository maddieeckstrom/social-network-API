//schema only?
const {Schema} = require('mongoose');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(dateTime) {
                return dayjs(dateTime).format('MMM D, YYYY')
            }        
        }
    }
)

module.exports = reactionSchema;
//schema settings - this will not be a model ,but rather will be used as the reaction field's subdocumnet schema in the Thought model