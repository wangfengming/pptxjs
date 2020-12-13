import { TextField, TextFieldOptions, TextLineBreak, TextLineBreakOptions, TextRun, TextRunOptions } from './run'
import { ParagraphProperties, ParagraphPropertiesOptions } from './paragraph-properties'
import { XmlComponent } from '../../xml'
import { EndParagraphRunProperties, RunPropertiesOptions } from './run-properties'

export type RunOptions = string | TextRunOptions | TextLineBreakOptions | TextFieldOptions;

export type Run = TextRun | TextLineBreak | TextField;

export interface ParagraphOptions extends ParagraphBaseOptions {
  run?: RunOptions | RunOptions[];
}

export interface ParagraphBaseOptions extends ParagraphPropertiesOptions {
  endParagraphRunProperties?: RunPropertiesOptions;
}

export class Paragraph extends XmlComponent {
  readonly options: ParagraphBaseOptions
  readonly runs: Run[] = []

  constructor ({ run, ...options }: ParagraphOptions = {}) {
    super()
    this.options = options
    if (run) {
      const runs = Array.isArray(run) ? run : [run]
      runs.forEach(run => this.addRun(run))
    }
  }

  addRun (options: RunOptions) {
    let run: Run
    if (typeof options === 'string') {
      run = new TextRun({ text: options })
    } else if (options.runType === 'lineBreak') {
      run = new TextLineBreak(options)
    } else if (options.runType === 'field') {
      run = new TextField(options)
    } else {
      run = new TextRun(options)
    }
    this.runs.push(run)
    return run
  }

  xmlComponent () {
    const options = this.options
    let children: XmlComponent[] = []
    children.push(new ParagraphProperties(options))
    children = children.concat(this.runs)
    if (options.endParagraphRunProperties) {
      children.push(new EndParagraphRunProperties(options.endParagraphRunProperties))
    }
    return { tag: 'a:p', children }
  }
}
