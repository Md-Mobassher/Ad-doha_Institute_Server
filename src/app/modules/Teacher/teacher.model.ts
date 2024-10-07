import { Schema, model } from 'mongoose'
import { ITeacher } from './teacher.interface'

const TeacherSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: { type: String, required: true },
    image: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    position: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Create the model
export const Teacher = model<ITeacher>('AcademicDepartment', TeacherSchema)
