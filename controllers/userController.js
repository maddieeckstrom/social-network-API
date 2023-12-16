const { User } = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate('friendsIds')
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select(''); //  WHAT DO I PUT HERE

            if (!user) {
                return res.status(404).json({ message: 'No user by that Id' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async postUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async putUserById(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user with that id' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUserById(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                res.status(404).json({ message: 'No user with that id' });
            }

            res.json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //I don't think the two below are correct
    // do I need to set new to true and do I need to add to set for the post?
    async postFriend(req, res) {
        try {
            const newFriend = await User.create(req.params.id); //How do I target friends whose reference is User?
            res.json(newFriend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const deletedFriend = await User.findOneAndDelete({ _id: req.params.id });

            if (!deletedFriend) {
                res.status(404).json({ message: 'No friend with that id' });
            }

            res.json({ message: 'Friend deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
}