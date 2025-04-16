import { model, Schema } from 'mongoose'
import { ISubsCribe } from './subscribe.interface'

const SubsCribeSchema = new Schema<ISubsCribe>(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const SubsCribe = model<ISubsCribe>('SubsCribe', SubsCribeSchema)
