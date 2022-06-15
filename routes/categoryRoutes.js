const router = require('express').Router({mergeParams: true})
const {getAll, getOne, makeOne, updateOne, deleteOne} = require('./../controllers/categoryController')
const {auth, isAdmin} = require('./../middleware/permissions')
const {create, update} = require('./../validators/categoryValidator')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/make', create, [auth, isAdmin], makeOne)
router.put('/edit/:id', update, [auth, isAdmin], updateOne)
router.delete('/delete/:id', [auth, isAdmin], deleteOne)

module.exports = router
