import { Xml, XmlComponent } from '../../xml'
import { STPoint, STTextIndentLevel } from '../../interface/type'
import { toEmu } from '../../utils'
import { FontAlignType, TextAlignType } from '../../interface/enum'
import { Spacing, SpacingAfter, SpacingBefore, SpacingOptions } from '../spacing'
import { Bullet, BulletOptions } from '../bullet'
import { TabStopOptions, TabStops } from '../tab-stops'
import { DefaultTextRunProperties, RunPropertiesOptions } from './run-properties'

export interface ParagraphPropertiesOptions {
  marginLeft?: STPoint;
  marginRight?: STPoint;
  level?: STTextIndentLevel;
  indent?: STPoint;
  align?: TextAlignType;
  defaultTabSize?: STPoint;
  rtl?: boolean;
  eastAsianLineBreak?: boolean;
  fontAlign?: FontAlignType;
  latinLinBreak?: boolean;
  hangingPunctuation?: boolean;

  lineSpacing?: SpacingOptions;
  spacingBefore?: SpacingOptions;
  spacingAfter?: SpacingOptions;
  bullet?: BulletOptions;
  tabStops?: TabStopOptions[];
  defaultRunProperties?: RunPropertiesOptions;
}

export enum ParagraphPropertiesTag {
  Paragraph = 'a:pPr',
  DefaultParagraph = 'a:defPPr',
  Level1 = 'a:lvl1pPr',
  Level2 = 'a:lvl2pPr',
  Level3 = 'a:lvl3pPr',
  Level4 = 'a:lvl4pPr',
  Level5 = 'a:lvl5pPr',
  Level6 = 'a:lvl6pPr',
  Level7 = 'a:lvl7pPr',
  Level8 = 'a:lvl8pPr',
  Level9 = 'a:lvl9pPr',
}

export class ParagraphProperties extends XmlComponent {
  constructor (readonly options: ParagraphPropertiesOptions = {}, readonly tag = ParagraphPropertiesTag.Paragraph) {super()}

  xmlComponent () {
    const options = this.options
    const attr = {
      marL: toEmu(options.marginLeft),
      marR: toEmu(options.marginRight),
      lvl: options.level,
      indent: toEmu(options.indent),
      algn: options.align,
      defTabSz: toEmu(options.defaultTabSize),
      rtl: options.rtl,
      eaLnBrk: options.eastAsianLineBreak,
      fontAlgn: options.fontAlign,
      latinLnBrk: options.latinLinBreak,
      hangingPunct: options.hangingPunctuation,
    }
    const children: (Xml | XmlComponent)[] = []

    if (options.lineSpacing) children.push(new Spacing(options.lineSpacing))
    if (options.spacingBefore) children.push(new SpacingBefore(options.spacingBefore))
    if (options.spacingAfter) children.push(new SpacingAfter(options.spacingAfter))
    if (options.bullet) children.push(new Bullet(options.bullet))
    if (options.tabStops) children.push(new TabStops({ tabStops: options.tabStops }))
    if (options.defaultRunProperties) children.push(new DefaultTextRunProperties(options.defaultRunProperties))

    return { tag: this.tag, attr, children }
  }
}

export class DefaultParagraphProperties extends ParagraphProperties {
  constructor (options: ParagraphPropertiesOptions = {}) {super(options, ParagraphPropertiesTag.DefaultParagraph)}
}
