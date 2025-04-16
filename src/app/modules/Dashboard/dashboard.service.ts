import { AcademicDepartment } from '../AcademicDepartment/academicDepartment.model'
import { Admin } from '../Admin/admin.model'
import { AdvisoryCommittee } from '../AdvisoryCommittee/advisoryCommittee.model'
import { Book } from '../Book/book.model'
import { Contact } from '../Contact/contact.model'
import Course from '../course/course.model'
import EnrolledCourse from '../EnrolledCourse/enrolledCourse.model'
import { Faculty } from '../Faculty/faculty.model'
import { Opinion } from '../Opinion/opinion.model'
import { Student } from '../Student/student.model'
import { SubsCribe } from '../Subscribe/subscribe.model'
import { Video } from '../Video/video.model'

const getAllAdminDashboards = async () => {
  const [
    totalAdmin,
    totalFaculty,
    totalStudent,
    totalDepartment,
    totalCourse,
    totalEnrollCourse,
    totalOpinion,
    totalAdvisoryCommittee,
    totalBook,
    totalVideo,
    totalSubscribe,
    totalContact,
  ] = await Promise.all([
    Admin.collection.countDocuments(),
    Faculty.collection.countDocuments(),
    Student.collection.countDocuments(),
    AcademicDepartment.collection.countDocuments(),
    Course.collection.countDocuments(),
    EnrolledCourse.collection.countDocuments(),
    Opinion.collection.countDocuments(),
    AdvisoryCommittee.collection.countDocuments(),
    Book.collection.countDocuments(),
    Video.collection.countDocuments(),
    SubsCribe.collection.countDocuments(),
    Contact.collection.countDocuments(),
  ])
  const dashboardData = [
    { label: 'Total Admins', value: totalAdmin },
    { label: 'Total Faculty', value: totalFaculty },
    { label: 'Total Students', value: totalStudent },
    { label: 'Total Departments', value: totalDepartment },
    { label: 'Total Courses', value: totalCourse },
    { label: 'Total Enrolled Courses', value: totalEnrollCourse },
    { label: 'Total Opinions', value: totalOpinion },
    { label: 'Total Advisory Committee', value: totalAdvisoryCommittee },
    { label: 'Total Book', value: totalBook },
    { label: 'Total Video', value: totalVideo },
    { label: 'Total Subscribers', value: totalSubscribe },
    { label: 'Total Contacts', value: totalContact },
  ]
  return dashboardData
}

export const DashboardServices = {
  getAllDashboards: getAllAdminDashboards,
}
