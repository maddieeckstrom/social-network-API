const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    postThought,
    putThoughtById,
    deleteThoughtById,
    postReaction,
    deleteReaction,
  } = require('../../controllers/thoughtController');

  router.route('/').get(getThoughts).post(postThought);

  router.route('/:thoughtId').get(getThoughtById).put(putThoughtById).delete(deleteThoughtById);

  router.route('/:thoughtId/reactions').post(postReaction);

  router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

  module.exports = router;