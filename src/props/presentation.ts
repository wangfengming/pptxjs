import { XmlComponent } from '../xml'
import { Pptx } from '../pptx'

export class Presentation extends XmlComponent {
  constructor (readonly pptx: Pptx) {super()}

  xmlComponent () {
    const pptx = this.pptx
    const options = pptx.options
    return {
      tag: 'p:presentation',
      declaration: true,
      ns: {
        a: 'http://schemas.openxmlformats.org/drawingml/2006/main',
        r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
        p: 'http://schemas.openxmlformats.org/presentationml/2006/main',
      },
      attr: {
        rlt: options.rlt,
        saveSubsetFonts: true,
        autoCompressPictures: false,
      },
    }
  }
}
