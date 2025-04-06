import { z } from 'zod'

const createOfferedCourseValidationSchema = z.object({
  academicDepartment: z.string(),
  course: z.string(),
  faculty: z.array(z.string()),
  batch: z.string(),
  orientation: z.string(),
  admissionDeadline: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
})

const updateOfferedCourseValidationSchema = z.object({
  academicDepartment: z.string().optional(),
  course: z.string().optional(),
  faculty: z.array(z.string()).optional(),
  batch: z.string().optional(),
  orientation: z.string().optional(),
  admissionDeadline: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(),
})

export const OfferedCourseValidaton = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
}
