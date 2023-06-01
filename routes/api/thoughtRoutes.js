const router = require('express').Router();
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    delThought
} = require('../../controller/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought)

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(delThought)

module.exports = router;