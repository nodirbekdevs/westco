const router = require('express').Router({mergeParams: true})
const {getAll, getOne, makeOne, updateOne, addCourseToUser, removeCourseFromUser, deleteOne} = require('./../controllers/courseController')
const {auth, isAdmin} = require('./../middleware/permissions')
const {create, update} = require('./../validators/courseValidator')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/make', create, [auth, isAdmin], makeOne)
router.put('/edit/:id', update, [auth, isAdmin], updateOne)
router.put('/add/user', auth, addCourseToUser)
router.put('/remove/user', auth, removeCourseFromUser)
router.delete('/delete/:id', [auth, isAdmin], deleteOne)

module.exports = router
