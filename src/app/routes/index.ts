import { Router } from 'express'
import { AdminRoutes } from '../modules/Admin/admin.route'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { UserRoutes } from '../modules/Users/user.route'
import { StudentRoutes } from '../modules/Student/student.route'
import { FacultyRoutes } from '../modules/Faculty/faculty.route'
import { BookRoutes } from '../modules/book/book.routes'
import { VideoRoutes } from '../modules/video/video.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
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
