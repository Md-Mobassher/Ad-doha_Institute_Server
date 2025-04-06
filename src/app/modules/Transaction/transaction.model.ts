import { Schema, model } from 'mongoose'
import { ITransaction } from './transaction.interface'

const TransactionSchema: Schema = new Schema<ITransaction>(
  {
    offeredCourse: {
      type: Schema.Types.ObjectId,
      ref: 'OfferedCourse',
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    transactionId: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['BKASH', 'NAGAD', 'CELLFINE'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'FAILED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  },
)
// Create the model
export const Transaction = model<ITransaction>('Transaction', TransactionSchema)
