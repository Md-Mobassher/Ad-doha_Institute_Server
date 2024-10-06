import { Schema, model } from 'mongoose'
import { IAcademicDepartment } from './academicDepartment.interface'

const AcademicDepartmentSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
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
export const AcademicDepartment = model<IAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
)
