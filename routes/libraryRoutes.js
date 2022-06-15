const router = require('express').Router({mergeParams: true})
const {getAll, getOne, makeOne, updateOne, addLibraryToUser, removeLibraryFromUser, deleteOne} = require('./../controllers/libraryController')
const {auth, isAdmin} = require('./../middleware/permissions')
const {create, update} = require('./../validators/libraryValidator')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/make', create, [auth, isAdmin], makeOne)
router.put('/edit/:id', update, [auth, isAdmin], updateOne)
router.put('/add/user', auth, addLibraryToUser)
router.put('/remove/user', auth, removeLibraryFromUser)
router.delete('/delete/:id', [auth, isAdmin], deleteOne)

module.exports = router
