import { Slide, SlideOptions } from './slide/slide'
import { CorePropertiesOptions } from './props/core-properties'
import { AppPropertiesOptions } from './props/app-properties'

export interface PptxOptions extends CorePropertiesOptions, AppPropertiesOptions {
  rlt?: boolean;
  slides?: SlideOptions[];
}

export enum SIZES {
  SCREEN_4X3 = 'SCREEN_4X3',
  SCREEN_16X9 = 'SCREEN_16X9',
  SCREEN_16X10 = 'SCREEN_16X10',
  WIDE = 'WIDE',
}

export const SIZE_MAP = {
  [SIZES.SCREEN_4X3]: { width: 9144000, height: 6858000 },
  [SIZES.SCREEN_16X9]: { width: 9144000, height: 5143500 },
  [SIZES.SCREEN_16X10]: { width: 9144000, height: 5715000 },
  [SIZES.WIDE]: { width: 12192000, height: 6858000 },
} as const

export class Pptx {
  readonly slides: Slide[] = []
  readonly noteSlides = []

  constructor (readonly options: PptxOptions = {}) {
    options.slides?.forEach(slide => this.addSlide(slide))
  }

  get lastSlide (): Slide | undefined {
    return this.slides[this.slides.length - 1]
  }

  addSlide (slideOptions: SlideOptions = {}) {
    const slide = new Slide(slideOptions, this)
    this.slides.push(slide)
    return slide
  }
}
