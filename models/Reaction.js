//schema only?

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
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
            // how to add the getter method to format the timestamp on query?
        }
    }
)

//schema settings - this will not be a model ,but rather will be used as the reaction field's subdocumnet schema in the Thought model