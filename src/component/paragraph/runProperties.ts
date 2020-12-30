import { Xml, XmlComponent, XmlElement } from '../../xml'
import { toHpt, toPct } from '../../utils'
import { Line, LineOptions, UnderlineLine } from '../components/line'
import { Fill, FillOptions } from '../components/fill'
import { EffectContainerOptions, EffectDag, EffectList, EffectListOptions } from '../components/effect'
import { Color, ColorOptions } from '../components/color'
import { Font, FontOptions } from '../components/font'
import { HyperlinkClick, HyperlinkMouseOver, HyperlinkOptions } from '../components/hyperlink'

import { CapType, StrikeType, UnderlineType } from '../../interface/enum'
import { STPercentage, STPoint } from '../../interface/type'

export interface RunPropertiesOptions {
  kumimoji?: boolean;
  lang?: string;
  altLang?: string;

  fontSize?: STPoint;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean | UnderlineType;
  underlineLine?: boolean | LineOptions;
  underlineFill?: boolean | FillOptions;
  strike?: boolean | StrikeType;
  kerning?: STPoint;
  cap?: CapType;
  charSpacing?: STPoint;
  normalizeHeights?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  baseline?: STPercentage;
  bookmarkLinkTarget?: string;

  noProof?: boolean;
  dirty?: boolean;
  spellingError?: boolean;
  smartTagClean?: boolean;
  smartTagID?: number;

  line?: LineOptions;
  fill?: FillOptions;
  effectList?: EffectListOptions;
  effectDag?: EffectContainerOptions;
  highlight?: ColorOptions;
  font?: FontOptions;
  click?: HyperlinkOptions;
  mouseHover?: HyperlinkOptions;
}

export enum RunPropertiesTag {
  Text = 'a:rpr',
  EndParagraph = 'a:endParaRPr',
  DefaultText = 'a:defRPr',
}

export class RunProperties extends XmlComponent {
  constructor (readonly options: RunPropertiesOptions = {}, readonly tag = RunPropertiesTag.Text) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options

    const attr = {
      kumimoji: options.kumimoji,
      lang: options.lang,
      altLang: options.altLang,
      sz: toHpt(options.fontSize),
      b: options.bold,
      i: options.italic,
      u: typeof options.underline === 'string' ? options.underline : (options.underline ? StrikeType.Single : undefined),
      strike: typeof options.strike === 'string' ? options.strike : (options.strike ? StrikeType.Single : undefined),
      kern: toHpt(options.kerning),
      cap: options.cap,
      spc: toHpt(options.charSpacing),
      normalizeH: options.normalizeHeights,
      baseline: toPct(options.baseline) ?? (options.subscript ? -40000 : (options.superscript ? 30000 : undefined)),
      noProof: options.noProof,
      dirty: (options.dirty ?? false) ? '1' : '0',
      err: options.spellingError,
      smtClean: options.smartTagClean,
      smtId: options.smartTagID,
      bmk: options.bookmarkLinkTarget,
    }

    const children: (Xml | XmlComponent)[] = []

    if (options.line) children.push(new Line(options.line))
    if (options.fill) children.push(new Fill(options.fill))
    if (options.effectList) {
      children.push(new EffectList(options.effectList))
    } else if (options.effectDag) {
      children.push(new EffectDag(options.effectDag))
    }
    if (options.highlight) {
      children.push({ tag: 'a:highlight', children: [new Color(options.highlight)] })
    }
    if (options.underlineLine) {
      if (typeof options.underlineLine === 'boolean') {
        children.push({ tag: 'a:uLnTx' })
      } else {
        children.push(new UnderlineLine(options.underlineLine))
      }
    }
    if (options.underlineFill) {
      if (typeof options.underlineFill === 'boolean') {
        children.push({ tag: 'a:uFillTx' })
      } else {
        children.push({ tag: 'a:uFill', children: [new Fill(options.underlineFill)] })
      }
    }
    if (options.font) children.push(new Font(options.font))
    if (options.click) children.push(new HyperlinkClick(options.click))
    if (options.mouseHover) children.push(new HyperlinkMouseOver(options.mouseHover))

    return { tag: this.tag, attr, children }
  }
}

export class DefaultTextRunProperties extends RunProperties {
  constructor (options: RunPropertiesOptions = {}) {
    super(options, RunPropertiesTag.DefaultText)
  }
}

export class EndParagraphRunProperties extends RunProperties {
  constructor (options: RunPropertiesOptions = {}) {
    super(options, RunPropertiesTag.EndParagraph)
  }
}
