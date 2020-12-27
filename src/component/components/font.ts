import { Xml, XmlComponent, XmlGroup } from '../../xml'

export interface FontOptions {
  latin?: string;
  symbol?: string;
  eastAsian?: string;
  complexScript?: string;
}

export class Font extends XmlComponent {
  constructor (readonly options: FontOptions = {}) {super()}

  xmlComponent (): XmlGroup {
    const options = this.options
    const children: Xml[] = []
    if (options.latin) {
      children.push({ tag: 'a:latin', attr: { typeface: options.latin, charset: 0 } })
    }
    if (options.symbol) {
      children.push({ tag: 'a:sym', attr: { typeface: options.symbol, charset: 0 } })
    }
    if (options.eastAsian) {
      children.push({ tag: 'a:ea', attr: { typeface: options.eastAsian, charset: 0 } })
    }
    if (options.complexScript) {
      children.push({ tag: 'a:cs', attr: { typeface: options.complexScript, charset: 0 } })
    }
    return { type: 'group', children }
  }
}
