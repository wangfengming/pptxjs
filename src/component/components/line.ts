import { XmlComponent, XmlElement } from '../../xml'
import { toEmu, toPositivePct } from '../../utils'
import { LineFill, LineFillOptions } from './fill'

import {
  CompoundType,
  EndingCapType,
  LineDashType,
  LineEndSizeType,
  LineEndType,
  StrokeAlignType,
} from '../../interface/enum'
import { STInch, STPositivePercentage } from '../../interface/type'

export interface LineOptions {
  width?: STInch;
  endingCap?: EndingCapType;
  compound?: CompoundType;
  strokeAlign?: StrokeAlignType;
  fill?: LineFillOptions;
  dash?: LineDashOptions;
  join?: LineJoinOptions;
  headEnd?: LineEndOptions;
  tailEnd?: LineEndOptions;
}

export enum LineTag {
  Line = 'a:ln',
  UnderlineLine = 'a:uLn',
}

export class Line extends XmlComponent {
  constructor (readonly options: LineOptions = {}, readonly tag = LineTag.Line) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    const tag = this.tag
    const attr = {
      w: toEmu(options.width, 'in'),
      cap: options.endingCap,
      cmpd: options.compound,
      algn: options.strokeAlign,
    }
    const children: XmlComponent[] = []
    if (options.fill) children.push(new LineFill(options.fill))
    if (options.dash) children.push(new LineDash(options.dash))
    if (options.join) children.push(new LineJoin(options.join))
    if (options.headEnd) children.push(new LineHeadEnd(options.headEnd))
    if (options.tailEnd) children.push(new LineTailEnd(options.tailEnd))
    return { tag, attr, children }
  }
}

export class UnderlineLine extends Line {
  constructor (options: LineOptions = {}) {
    super(options, LineTag.UnderlineLine)
  }
}

// EG_LineDashProperties
export interface LineDashOptions {
  preset?: LineDashType;
  custom?: CustomDashStop[];
}

export interface CustomDashStop {
  dash: STPositivePercentage;
  space: STPositivePercentage;
}

export class LineDash extends XmlComponent {
  constructor (readonly options: LineDashOptions = {}) {
    super()
  }

  xmlComponent (): XmlElement | undefined {
    const options = this.options
    if (options.preset) {
      return { tag: 'a:prstDash', attr: { val: options.preset } }
    }
    if (options.custom) {
      const children = options.custom.map(stop => {
        return {
          tag: 'a:ds',
          attr: { d: toPositivePct(stop.dash), sp: toPositivePct(stop.space) },
        }
      })
      return { tag: 'a:custDash', children }
    }
  }
}

// EG_LineJoinProperties
export interface LineJoinOptions {
  round?: true;
  bevel?: true;
  miter?: {
    limit?: STPositivePercentage;
  };
}

export class LineJoin extends XmlComponent {
  constructor (readonly options: LineJoinOptions = {}) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    if (options.round) {
      return { tag: 'a:round' }
    }
    if (options.bevel) {
      return { tag: 'a:bevel' }
    }
    if (options.miter) {
      return {
        tag: 'a:miter',
        attr: { lim: toPositivePct(options.miter.limit) },
      }
    }
  }
}

export interface LineEndOptions {
  type?: LineEndType;
  width?: LineEndSizeType;
  length?: LineEndSizeType;
}

export enum LineEndTag {
  Head = 'a:headEnd',
  Tail = 'a:tailEnd',
}

export class LineEnd extends XmlComponent {
  constructor (readonly options: LineEndOptions = {}, readonly tag: LineEndTag) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    return { tag: this.tag, attr: { type: options.type, w: options.width, len: options.length } }
  }
}

export class LineHeadEnd extends LineEnd {
  constructor (options?: LineEndOptions) {
    super(options, LineEndTag.Head)
  }
}

export class LineTailEnd extends LineEnd {
  constructor (options?: LineEndOptions) {
    super(options, LineEndTag.Tail)
  }
}
