import { Xml, XmlComponent, XmlElement } from '../../xml'
import { uuid } from '../../utils'
import { ParagraphProperties, ParagraphPropertiesOptions } from './paragraphProperties'
import { RunProperties, RunPropertiesOptions } from './runProperties'

import { TextFieldType } from '../../interface/enum'

export interface TextRunOptions extends RunPropertiesOptions {
  runType?: 'run',
  text?: string;
}

export interface TextLineBreakOptions extends RunPropertiesOptions {
  runType: 'lineBreak';
  text?: never;
}

export interface TextFieldOptions extends RunPropertiesOptions {
  runType: 'field';
  type?: TextFieldType;
  text?: string;
  paragraphProperties?: ParagraphPropertiesOptions;
  runProperties?: RunPropertiesOptions;
}

export class TextRun extends XmlComponent {
  constructor (readonly options: TextRunOptions = {}) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    return {
      tag: 'a:r',
      children: [new RunProperties(options), { tag: 'a:t', children: [options.text ?? ''] }],
    }
  }
}

export class TextLineBreak extends XmlComponent {
  constructor (readonly options: TextLineBreakOptions = { runType: 'lineBreak' }) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    return { tag: 'a:br', children: [new RunProperties(options)] }
  }
}

export class TextField extends XmlComponent {
  constructor (readonly options: TextFieldOptions = { runType: 'field' }) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    const attr = { id: uuid(), type: options.type }
    const children: (Xml | XmlComponent)[] = []
    if (options.runProperties) children.push(new RunProperties(options.runProperties))
    if (options.paragraphProperties) children.push(new ParagraphProperties(options.paragraphProperties))
    if (options.text != null) children.push({ tag: 'a:t', children: [options.text] })
    return { tag: 'a:fld', attr, children }
  }
}
