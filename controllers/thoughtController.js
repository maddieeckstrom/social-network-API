const Thought = require('../models/Thought');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
                .populate('reactions')

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .populate('reactions')

            if (!thought) {
                return res.status(404).json({ message: 'No thought could be found with that Id'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async postThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async putThoughtById(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with that id' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThoughtById(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                res.status(404).json({ message: 'No thought with that id' });
            }

            res.json({ message: 'Thought deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async postReaction(req, res) {
        try {
            console.log(req.body);
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                {
                    $addToSet: {reactions: req.body}
                },
                {
                    new: true
                })
                console.log(thought);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                {
                    $pull: {reactions: {reactionId: req.params.reactionId}}
                },
                {
                    new: true
                });

            if (!reaction) {
                res.status(404).json({ message: 'No reaction with that id' });
            }

            res.json({ message: 'Reaction deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
}