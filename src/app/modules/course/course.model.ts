import { Schema, model } from 'mongoose'
import { ICourse } from './course.interface'

const CourseSchema: Schema = new Schema(
  {
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'academicDepartment',
    },
    courseName: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true },
    medium: {
      type: String,
      required: true,
    },
    totalClasses: {
      type: String,
      required: true,
    },
    courseDuration: {
      type: String,
      required: true,
    },
    schedule: {
      type: [String],
      required: true,
    },
    classDuration: {
      type: String,
      required: true,
    },
    fee: {
      total: {
        type: String,
        required: true,
      },
      admission: {
        type: String,
        required: true,
      },
      monthly: {
        type: String,
        required: true,
      },
    },
    feePaymentMethod: {
      type: String,
    },
    contact: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: [String],
      default: [],
    },
    formLink: {
      type: String,
      default: null,
    },
    courseImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Create the model
const Course = model<ICourse>('Course', CourseSchema)

export default Course
