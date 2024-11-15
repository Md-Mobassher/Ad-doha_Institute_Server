import { Router } from 'express'
import { AdminRoutes } from '../modules/Admin/admin.route'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { UserRoutes } from '../modules/Users/user.route'
import { StudentRoutes } from '../modules/Student/student.route'
import { FacultyRoutes } from '../modules/Faculty/faculty.route'
import { BookRoutes } from '../modules/Book/book.routes'
import { VideoRoutes } from '../modules/Video/video.routes'
import { CourseRoutes } from '../modules/course/course.routes'
import { TeacherRoutes } from '../modules/Teacher/teacher.routes'
import { OpinionRoutes } from '../modules/Opinion/opinion.routes'
import { AcademicDepartmentRoutes } from '../modules/AcademicDepartment/academicDepartment.routes'
import { AdvisoryCommitteeRoutes } from '../modules/AdvisoryCommittee/advisoryCommittee.routes'
import { BookCategoryRoutes } from '../modules/BookCategory/bookCategory.routes'
import { AuthorRoutes } from '../modules/Author/author.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/teachers',
    route: TeacherRoutes,
  },
  {
    path: '/opinions',
    route: OpinionRoutes,
  },
  {
    path: '/advisory-comittees',
    route: AdvisoryCommitteeRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/authors',
    route: AuthorRoutes,
  },
  {
    path: '/book-category',
    route: BookCategoryRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/videos',
    route: VideoRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
