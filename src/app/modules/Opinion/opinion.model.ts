import { Schema, model } from 'mongoose'
import { IOpinion } from './opinion.interface'

const OpinionSchema: Schema = new Schema(
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
    designation: { type: String, required: true },
    opinion: { type: String, required: true },
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
export const Opinion = model<IOpinion>('Opinion', OpinionSchema)
