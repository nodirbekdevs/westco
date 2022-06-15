const BookService = require('./bookService')
const CategoryService = require('./categoryService')
const CourseService = require('./courseService')
const LessonService = require('./lessonService')
const LibraryService = require('./libraryService')
const UserService = require('./userService')

const storage = {
  book: new BookService(),
  category: new CategoryService(),
  course: new CourseService(),
  lesson: new LessonService(),
  library: new LibraryService(),
  user: new UserService()
}

module.exports = storage
