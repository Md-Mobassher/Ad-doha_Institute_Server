/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import QueryBuilder from '../../builder/QueryBuilder'
import { TransactionSearchableFields } from './transaction.constant'
import { ITransaction } from './transaction.interface'
import { Transaction } from './transaction.model'

const createTransaction = async (payload: ITransaction) => {
  const newTransaction = await Transaction.create(payload)

  if (!newTransaction) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Transaction')
  }
  return newTransaction
}

const getAllTransaction = async (query: Record<string, unknown>) => {
  const departmentQuery = new QueryBuilder(
    Transaction.find().populate('offeredCourse').populate('studentId'),
    query,
  )
    .search(TransactionSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await departmentQuery.modelQuery
  const meta = await departmentQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleTransaction = async (id: string) => {
  const result = await Transaction.findById(id)
  return result
}

const updateTransaction = async (
  id: string,
  payload: Partial<ITransaction>,
) => {
  const result = await Transaction.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteTransaction = async (id: string) => {
  const isTransactionExist = await Transaction.findById(id)
  if (!isTransactionExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Transaction Found!!!')
  }
  await Transaction.findByIdAndDelete(id)

  return null
}

export const TransactionServices = {
  createTransaction,
  getAllTransaction,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
}
