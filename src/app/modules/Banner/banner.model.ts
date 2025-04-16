import { model, Schema } from 'mongoose'
import { IBanner } from './banner.interface'

const BannerSchema = new Schema<IBanner>({
  title: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
})

export const Banner = model<IBanner>('Banner', BannerSchema)
