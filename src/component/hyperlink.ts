import { XmlComponent } from '../xml'
import { Sound, SoundOptions } from './sound'

export interface HyperlinkOptions {
  id?: string;
  invalidUrl?: string;
  action?: string;
  targetFrame?: string;
  tooltip?: string;
  history?: boolean;
  highlightClick?: boolean;
  endSound?: boolean;
  sound?: SoundOptions;
}

export enum HyperlinkTag {
  Click = 'a:hlinkClick',
  MouseOver = 'a:hlinkMouseOver',
  Hover = 'a:hlinkHover',
}

export class Hyperlink extends XmlComponent {
  constructor (readonly options: HyperlinkOptions = {}, readonly tag: HyperlinkTag) {super()}

  xmlComponent () {
    const tag = this.tag
    const options = this.options
    const attr = {
      'r:id': options.id,
      invalidUrl: options.invalidUrl,
      action: options.action,
      tgtFrame: options.targetFrame,
      tooltip: options.tooltip,
      history: options.history,
      highlightClick: options.highlightClick,
      endSnd: options.endSound,
    }
    const children: XmlComponent[] = []
    if (options.sound) children.push(new Sound(options.sound))
    return { tag, attr, children }
  }
}

export class HyperlinkClick extends Hyperlink {
  constructor (options: HyperlinkOptions) {super(options, HyperlinkTag.Click)}
}

export class HyperlinkMouseOver extends Hyperlink {
  constructor (options: HyperlinkOptions) {super(options, HyperlinkTag.MouseOver)}
}

export class HyperlinkHover extends Hyperlink {
  constructor (options: HyperlinkOptions) {super(options, HyperlinkTag.Hover)}
}
