import { z } from 'zod'

const createVideoValidationSchema = z.object({
  title: z.string({ required_error: 'Video title is required.' }),
  url: z.string({ required_error: 'Video url is required' }),
})

const updateVideoValidationSchema = z.object({
  title: z.string({ required_error: 'Video title is required.' }).optional(),
  url: z.string({ required_error: 'Video url is required' }).optional(),
})

export const VideoValidaton = {
  createVideoValidationSchema,
  updateVideoValidationSchema,
}
