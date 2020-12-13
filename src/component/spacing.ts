import { STPoint, STPositivePercentage } from '../interface/type'
import { Xml, XmlComponent } from '../xml'
import { toHpt, toPositivePct } from '../utils'

export interface SpacingOptions {
  multiple?: STPositivePercentage;
  exactly?: STPoint;
}

export enum SpacingTag {
  Line = 'a:lnSpc',
  Before = 'a:spcBef',
  After = 'a:spcAft',
}

export class Spacing extends XmlComponent {
  constructor (readonly options: SpacingOptions = {}, readonly tag = SpacingTag.Line) {super()}

  xmlComponent () {
    const children: Xml[] = []
    const options = this.options
    if (options.multiple != null) {
      children.push({ tag: 'a:spcPct', attr: { val: toPositivePct(options.multiple) } })
    } else if (options.exactly != null) {
      children.push({ tag: 'a:spcPts', attr: { val: toHpt(options.exactly) } })
    } else {
      return
    }
    const tag = this.tag
    return { tag, children }
  }
}

export class SpacingBefore extends Spacing {
  constructor (options: SpacingOptions) {super(options, SpacingTag.Before)}
}

export class SpacingAfter extends Spacing {
  constructor (options: SpacingOptions) {super(options, SpacingTag.After)}
}
