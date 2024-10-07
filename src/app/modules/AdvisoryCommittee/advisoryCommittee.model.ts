import { Schema, model } from 'mongoose'
import { IAdvisoryCommittee } from './advisoryCommittee.interface'

const AdvisoryCommitteeSchema: Schema = new Schema(
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
export const AdvisoryCommittee = model<IAdvisoryCommittee>(
  'AdvisoryCommittee',
  AdvisoryCommitteeSchema,
)
