const router = require('express').Router();

const {
    getUsers,
    getUserById,
    postUser,
    putUserById,
    deleteUserById,
    postFriend,
    deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(postUser);

router.route('/:userId').get(getUserById).put(putUserById).delete(deleteUserById);

router.route('/:userId/friends/:friendId').post(postFriend).delete(deleteFriend);

module.exports = router;