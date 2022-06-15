const router = require('express').Router({mergeParams: true})
const bookRoutes = require('./bookRoutes')
const categoryRoutes = require('./categoryRoutes')
const courseRoutes = require('./courseRoutes')
const lessonRoutes = require('./lessonRoutes')
const libraryRoutes = require('./libraryRoutes')
const userRoutes = require('./userRoutes')

router.use('/book', bookRoutes)
router.use('/category', categoryRoutes)
router.use('/course', courseRoutes)
router.use('/lesson', lessonRoutes)
router.use('/library', libraryRoutes)
router.use('/user', userRoutes)

module.exports = router
