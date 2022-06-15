const router = require('express').Router({mergeParams: true})
const {getAll, getOne, getProfile, makeOne, login, updateOne, updateUserProfile, updateToAdmin, deleteOne} = require('./../controllers/userController')
const {auth, isAdmin, isSuperAdmin} = require('./../middleware/permissions')
const {create, update} = require('./../validators/userValidator')

router.get('/', getAll)
router.get('/:id', getOne)
router.get('/profile', getProfile)
router.post('/make', create, [auth, isAdmin], makeOne)
router.post('/login', login)
router.put('/edit/:id', update, [auth, isAdmin], updateOne)
router.put('/edit/admin', [auth, isSuperAdmin], updateToAdmin)
router.put('/profile/update', auth, updateUserProfile)
router.delete('/delete/:id', [auth, isAdmin], deleteOne)

module.exports = router
