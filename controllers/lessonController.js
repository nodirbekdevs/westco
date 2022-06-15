const storage = require('./../services/main')

const getAll = async (req, res, next) => {
  const lessons = await storage.lesson.find(req.query)

  res.status(200).json({success: true, data: lessons})
}

const getOne = async (req, res, next) => {
  const lesson = await storage.lesson.findOne({_id: req.params.id})

  if (!lesson) {
    return res.status(404).json({success: false, data: "Dars topilmadi"})
  }

  return res.status(200).json({success: true, data: lesson})
}

const makeOne = async (req, res, next) => {
  const {id, type} = req.user, {course} = req.body
  req.body.added_by = id

  if (type === 'admin') {
    const lesson = await storage.lesson.create(req.body)

    if (course) {
      const exist_course = await storage.course.findOne({_id: course})

      if (exist_course) {
        exist_course.lessons.push(lesson._id)
        exist_course.total_lessons += 1
        await exist_course.save()
      }
    }

    if (lesson) {
      return res.status(200).json({success: true, data: lesson})
    } else {
      return res.status(404).json({success: false})
    }
  }

  return res.status(404).json({success: false})
}

const updateOne = async (req, res, next) => {
  const {type} = req.user, {_id} = req.params, {course} = req.body

  const exist_lesson = await storage.lesson.findOne({_id})

  if (type === 'admin' && exist_lesson) {

    if (course) {
      if (exist_lesson.course !== course) {
        const old_course = await storage.course.findOne({_id: exist_lesson.course})
        const new_course = await storage.course.findOne({_id: course})

        if (old_course) {
          old_course.lessons.splice(exist_lesson._id)
          old_course.total_lessons -= 1
          await old_course.save()
        }

        if (new_course) {
          new_course.lessons.push(exist_lesson._id)
          new_course.total_lessons += 1
          await new_course.save()
        }
      }
    }

    const lesson = await storage.lesson.update({_id}, req.body)

    if (lesson) {
      return res.status(200).json({success: true, data: lesson})
    } else {
      return res.status(404).json({success: false})
    }

  }

  return res.status(404).json({success: false})
}

const deleteOne = async (req, res, next) => {
  const {type} = req.user, {_id} = req.params

  const lesson = await storage.lesson.findOne({_id})

  if (type === 'admin' && lesson) {
    if (lesson.course) {
      return res.status(404).json({success: false})
    }

    await storage.lesson.delete({_id})

    return res.status(200).json({success: true})
  }

  return res.status(404).json({success: false})
}

module.exports = {getAll, getOne, makeOne, updateOne, deleteOne}
