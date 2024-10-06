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
    courseImage: {
      type: String,
      required: true,
    },
    medium: {
      type: String,
      required: true,
    },
    totalClasses: {
      type: String,
      required: true,
    },
    duration: {
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
        type: Number,
        required: true,
      },
      admission: {
        type: Number,
        required: true,
      },
      monthly: {
        type: Number,
        required: true,
      },
    },
    contact: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: [String],
      default: [],
    },
    objectives: {
      type: [String],
      default: [],
    },
    outcomes: {
      type: [String],
      default: [],
    },
    targetAudience: {
      type: [String],
      default: [],
    },
    modules: {
      type: [String],
      default: [],
    },
    topic: {
      type: [String],
      default: [],
    },
    link: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

// Create the model
const Course = model<ICourse>('Course', CourseSchema)

export default Course
