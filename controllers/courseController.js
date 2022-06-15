const storage = require('./../services/main')

const getAll = async (req, res, next) => {
  const courses = await storage.course.find(req.query)

  res.status(200).json({
    success: true,
    data: courses
  })
}

const getOne = async (req, res, next) => {
  const course = await storage.course.findOne({_id: req.params.id})

  if (!course) {
    return res.status(404).json({success: false, data: "Kurs topilmadi"})
  }

  return res.status(200).json({success: true, data: course})
}

const makeOne = async (req, res, next) => {
  const {id, type} = req.user
  req.body.added_by = id

  if (type === 'admin') {
    const course = await storage.course.create(req.body)

    if (course) {
      return res.status(200).json({success: true, data: course})
    } else {
      return res.status(404).json({success: false})
    }
  }

  return res.status(404).json({success: false})
}

const updateOne = async (req, res, next) => {
  let exist_lesson
  const {type} = req.user, {_id} = req.params, {lesson} = req.body

  const exist_course = await storage.course.findOne({_id})

  if (lesson) {
    exist_lesson = await storage.lesson.findOne({_id: lesson})
  }

  if (type === 'admin' && exist_course) {
    const course = await storage.course.update({_id}, req.body)

    if (course) {
      if (exist_lesson) {
        exist_course.lessons.push(exist_lesson._id)
        exist_course.total_lessons += 1
        await exist_course.save()
      }

      return res.status(200).json({success: true, data: course})
    } else {
      return res.status(404).json({success: false})
    }
  }

  return res.status(404).json({success: false})
}

const addCourseToUser = async (req, res, next) => {
  const {id, type} = req.user, {course} = req.body

  const user = await storage.user.findOne({_id: id})
  const exist_course = await storage.course.findOne({_id: course})

  if (!user || !exist_course || type !== 'student') {
    return res.status(404).json({success: false})
  }

  user.courses.push(exist_course._id)
  user.total_courses += 1
  await user.save()

  await storage.course.update({_id: exist_course._id}, {$inc: {total_students: 1}})

  return res.status(200).json({success: true, data: user})
}

const removeCourseFromUser = async (req, res, next) => {
  const {id, type} = req.user, {course} = req.body

  const user = await storage.user.findOne({_id: id})
  const exist_course = await storage.course.findOne({_id: course})

  if (!user || !exist_course || type !== 'student') {
    return res.status(404).json({success: false})
  }

  user.courses.splice(exist_course._id)
  user.total_courses -= 1
  await user.save()

  await storage.course.update({_id: exist_course._id}, {$inc: {total_students: -1}})

  return res.status(200).json({success: true, data: user})
}

const deleteOne = async (req, res, next) => {
  const {type} = req.user, {_id} = req.params

  const course = await storage.course.findOne({_id})

  if (type === 'admin' && course) {
    if (course.total_lessons > 0) {
      return res.status(404).json({success: false})
    }

    await storage.category.delete({_id})

    return res.status(200).json({success: true})
  }

  return res.status(404).json({success: false})
}

module.exports = {getAll, getOne, makeOne, updateOne, addCourseToUser, removeCourseFromUser, deleteOne}
