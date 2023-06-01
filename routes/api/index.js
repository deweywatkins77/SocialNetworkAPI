const router = require('express').Router()
const thoughtRoutes = require('./thoughtRoutes')
const userRoutes = require('./userRoutes')
const reactionRoutes = require('./reactionRoutes')

router.use('/users', userRoutes)
router.use('/thoughts', thoughtRoutes)
router.use('/reaction', reactionRoutes)

module.exports = router