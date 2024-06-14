import { model, Schema } from 'mongoose'
import { TVideo } from './video.interface'

const videoSchema = new Schema<TVideo>({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
})

export const Video = model<TVideo>('Video', videoSchema)
