const router = require('express').Router();
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    delThought,
    createReaction,
    delReaction
} = require('../../controller/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought)

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(delThought)

router.route('/:id/reactions').post(createReaction)
router.route('/:id/reactions/:reactionId').delete(delReaction)
module.exports = router;