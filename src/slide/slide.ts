import { SlideObject, SlideObjectOptions } from '../object/object'
import { SlideText, SlideTextOptions } from '../object/text'
import { Pptx } from '../pptx'

export interface SlideOptions extends SlidePropertiesOptions {
  objects?: SlideObjectOptions[];
}

export interface SlidePropertiesOptions {
  masterName?: string;
  sectionName?: string;
}

export class Slide {
  readonly options: SlidePropertiesOptions
  readonly slideIndex: number
  readonly objects: SlideObject[] = []

  constructor ({ objects, ...options }: SlideOptions = {}, readonly pptx: Pptx) {
    if (!options.sectionName) options.sectionName = pptx.lastSlide?.options.sectionName ?? 'Default Section'
    this.options = options
    this.slideIndex = pptx.slides.length
    objects?.forEach(options => {
      this.addObject(options)
    })
  }

  addObject (options: SlideObjectOptions) {
    if (options.type === 'text') {
      this.addText(options.options)
    }
  }

  addText (options: SlideTextOptions) {
    const textObject = new SlideText(options)
    this.objects.push(textObject)
    return textObject
  }
}
