import { Schema, model } from 'mongoose'
import { IOfferedCourse } from './offeredCourse.interface'

const offeredCourseSchema: Schema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, required: true },
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
const OfferedCourse = model<IOfferedCourse>('OfferdCourse', offeredCourseSchema)

export default OfferedCourse
