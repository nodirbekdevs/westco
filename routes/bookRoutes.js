const router = require('express').Router({mergeParams: true})
const {getAll, getOne, makeOne, updateOne, deleteOne} = require('./../controllers/bookController')
const {auth, isAdmin} = require('./../middleware/permissions')
const {create, update} = require('./../validators/bookValidator')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/make', create, [auth, isAdmin], makeOne)
router.put('/edit/:id', update, [auth, isAdmin], updateOne)
router.delete('/delete/:id', [auth, isAdmin], deleteOne)

module.exports = router
