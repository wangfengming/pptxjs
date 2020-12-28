import { Slide, SlideOptions } from './slide/slide'
import { CorePropertiesOptions } from './props/coreProperties'
import { AppPropertiesOptions } from './props/appProperties'

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

interface Zip {
  file (path: string, data: string, options?: { base64?: boolean }): this;
}

export class Pptx {
  readonly slides: Slide[] = []
  readonly noteSlides: string[] = []

  constructor (readonly options: PptxOptions = {}, readonly zip: Zip) {
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
