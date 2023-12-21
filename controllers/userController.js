const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate('friends')
                .populate('thoughts')

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts')

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
    
    async postFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId },
            {
                $addToSet: {friends: req.params.friendId}
            },
            {
                new: true
            })
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const deletedFriend = await User.findOneAndUpdate({ _id: req.params.userId },
                {
                    $pull: {friends: req.params.friendId}
                },
                {
                    new: true
                })
                res.json(user);
            if (!deletedFriend) {
                res.status(404).json({ message: 'No friend with that id' });
            }

            res.json({ message: 'Friend deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
}