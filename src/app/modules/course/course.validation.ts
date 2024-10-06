import { z } from 'zod'

const createFeeSchema = z.object({
  total: z.string(),
  admission: z.string(),
  monthly: z.string(),
})

const createCourseValidationSchema = z.object({
  academicDepartment: z.string().optional(),
  courseName: z.string().min(1, { message: 'Course name is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  courseImage: z.string().url({ message: 'Course image must be a valid URL' }),
  medium: z.string().min(1, { message: 'Medium is required' }),
  totalClasses: z
    .string()
    .min(1, { message: 'Total classes must be a string' }),
  duration: z.string().min(1, { message: 'Duration is required' }),
  schedule: z.array(z.string()).min(1, { message: 'Schedule is required' }),
  classDuration: z.string().min(1, { message: 'Class duration is required' }),
  fee: createFeeSchema,
  contact: z.string().min(1, { message: 'Contact information is required' }),
  courseDescription: z.array(z.string()).optional(),
  objectives: z.array(z.string()).optional(),
  outcomes: z.array(z.string()).optional(),
  targetAudience: z.array(z.string()).optional(),
  modules: z.array(z.string()).optional(),
  topic: z.array(z.string()).optional(),
  link: z.string().url().optional(),
})

const updateFeeSchema = z.object({
  total: z.string().optional(),
  admission: z.string().optional(),
  monthly: z.string().optional(),
})

const updateCourseValidationSchema = z.object({
  academicDepartment: z.string().optional(),
  courseName: z
    .string()
    .min(1, { message: 'Course name is required' })
    .optional(),
  slug: z.string().min(1, { message: 'Slug is required' }).optional(),
  courseImage: z
    .string()
    .url({ message: 'Course image must be a valid URL' })
    .optional(),
  medium: z.string().min(1, { message: 'Medium is required' }).optional(),
  totalClasses: z
    .string()
    .min(1, { message: 'Total classes must be a string' })
    .optional(),
  duration: z.string().min(1, { message: 'Duration is required' }).optional(),
  schedule: z
    .array(z.string())
    .min(1, { message: 'Schedule is required' })
    .optional(),
  classDuration: z
    .string()
    .min(1, { message: 'Class duration is required' })
    .optional(),
  fee: updateFeeSchema.optional(),
  contact: z
    .string()
    .min(1, { message: 'Contact information is required' })
    .optional(),
  courseDescription: z.array(z.string()).optional(),
  objectives: z.array(z.string()).optional(),
  outcomes: z.array(z.string()).optional(),
  targetAudience: z.array(z.string()).optional(),
  modules: z.array(z.string()).optional(),
  topic: z.array(z.string()).optional(),
  link: z.string().url().optional(),
})

export const CourseValidaton = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
}
