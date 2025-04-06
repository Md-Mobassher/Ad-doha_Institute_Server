import { Schema, model } from 'mongoose'
import { IOfferedCourse } from './offeredCourse.interface'

const offeredCourseSchema: Schema = new Schema(
  {
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    batch: { type: String, required: true },
    faculty: [{ type: Schema.Types.ObjectId, ref: 'Teacher', required: true }],
    orientation: { type: String, required: true },
    admissionDeadline: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    status: {
      type: String,
      enum: ['UPCOMING', 'ONGOING', 'ENDED'],
      required: true,
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
)

// Create the model
const OfferedCourse = model<IOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
)

export default OfferedCourse
