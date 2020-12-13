import { SlideObject } from './object'
import { Paragraph, ParagraphOptions } from '../component/paragraph/paragraph'

export interface SlideTextOptions {
  paragraph?: string | ParagraphOptions | (string | ParagraphOptions)[];
}

export class SlideText extends SlideObject {
  private paragraphs: Paragraph[] = []

  constructor (options: SlideTextOptions = {}) {
    super('text', options)
    if (options.paragraph) {
      const paragraphs = Array.isArray(options.paragraph) ? options.paragraph : [options.paragraph]
      paragraphs.forEach(p => this.addParagraph(p))
    }
  }

  addParagraph (paragraph: string | ParagraphOptions) {
    const p = new Paragraph(typeof paragraph === 'string' ? { run: paragraph } : paragraph)
    this.paragraphs.push(p)
    return p
  }
}
