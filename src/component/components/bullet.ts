import { Xml, XmlComponent, XmlGroup } from '../../xml'
import { Blip, BlipOptions } from './blip'
import { toHpt, toPct } from '../../utils'
import { Color, ColorOptions } from './color'

import { BulletAutonumberType } from '../../interface/enum'
import { STPoint, STPositivePercentage } from '../../interface/type'

export interface BulletOptions {
  autonumber?: {
    type?: BulletAutonumberType;
    startAt?: number;
  };
  char?: string;
  blip?: BlipOptions;
  font?: boolean | string;
  size?: {
    followText?: boolean;
    multiple?: STPositivePercentage;
    exactly?: STPoint;
  };
  color?: boolean | ColorOptions;
}

export class Bullet extends XmlComponent {
  constructor (readonly options: BulletOptions = {}) {
    super()
  }

  xmlComponent (): XmlGroup {
    const options = this.options
    const children: (Xml | XmlComponent)[] = []

    if (options.color === true) {
      children.push({ tag: 'a:buClrTx' })
    } else if (options.color) {
      children.push({ tag: 'a:buClr', children: [new Color(options.color)] })
    }

    if (options.size?.followText) {
      children.push({ tag: 'a:buSzTx' })
    } else if (options.size?.multiple) {
      children.push({ tag: 'a:buSzPct', attr: { val: toPct(options.size.multiple) } })
    } else if (options.size?.exactly) {
      children.push({ tag: 'a:buSzPts', attr: { val: toHpt(options.size.exactly) } })
    }

    if (options.font === true) {
      children.push({ tag: 'a:buFontTx' })
    } else if (typeof options.font === 'string' && options.font) {
      children.push({ tag: 'a:buFont', attr: { typeface: options.font, charset: 0 } })
    }

    if (options.autonumber) {
      children.push({
        tag: 'a:buAutoNum',
        attr: {
          type: options.autonumber.type ?? BulletAutonumberType.arabicPeriod,
          startAt: options.autonumber.startAt,
        },
      })
    } else if (options.char) {
      children.push({ tag: 'a:buChar', attr: { char: options.char } })
    } else if (options.blip) {
      children.push(new Blip(options.blip))
    }

    return { type: 'group', children }
  }
}
