import { Xml, XmlAttrs, XmlComponent, XmlElement } from '../../xml'
import {
  toAngle,
  toColorPct,
  toFixedPct,
  toOffsetColorPct,
  toPct,
  toPositiveFixedAngle,
  toPositiveFixedPct,
  toPositivePct,
} from '../../utils'

import { SchemeColorType } from '../../interface/enum'
import {
  STAngle,
  STColorPercentage,
  STFixedPercentage,
  STOffsetColorPercentage,
  STPercentage,
  STPositiveFixedAngle,
  STPositiveFixedPercentage,
  STPositivePercentage,
} from '../../interface/type'

export interface ColorOptions extends ColorChoiceOptions, ColorTransformOptions {}

// 6种颜色方式
export interface ColorChoiceOptions {
  rgb?: string | RgbOptions;
  hsl?: HslOptions;
  scheme?: SchemeColorType; // a color bound to a user's theme
  system?: string; // a color bound to predefined operating system elements
  preset?: string; // a color bound to predefined collection of colors.
}

export interface HslOptions { // (0~360, 0~100, 0~100)
  hue: STPositiveFixedAngle;
  sat: STPercentage;
  lum: STPercentage;
}

export interface RgbOptions { // FFFFFF or (0~255,0~255,0~255)
  red: STColorPercentage;
  green: STColorPercentage;
  blue: STColorPercentage;
}

// 颜色转换参数
export interface ColorTransformOptions {
  alpha?: STPositiveFixedPercentage; // 透明度
  alphaOffset?: STFixedPercentage;
  alphaMod?: STPositivePercentage;

  tint?: STPositiveFixedPercentage; // lighter
  shade?: STPositiveFixedPercentage; // darker

  complement?: boolean; // 补色
  inverse?: boolean; // 反色
  gray?: boolean; // 灰度

  gamma?: boolean;
  inverseGamma?: boolean;

  hue?: STPositiveFixedAngle;
  hueOffset?: STAngle;
  hueMod?: STPositivePercentage;

  sat?: STPercentage;
  satOffset?: STPercentage;
  satMod?: STPercentage;

  lum?: STPercentage;
  lumOffset?: STPercentage;
  lumMod?: STPercentage;

  red?: STColorPercentage;
  redOffset?: STOffsetColorPercentage;
  redMod?: STPercentage;

  green?: STColorPercentage;
  greenOffset?: STOffsetColorPercentage;
  greenMod?: STPercentage;

  blue?: STColorPercentage;
  blueOffset?: STOffsetColorPercentage;
  blueMod?: STPercentage;
}

export class Color extends XmlComponent {
  constructor (readonly options: ColorOptions = {}) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    const choice = this.getChoice(options)
    if (!choice) return
    const { tag, attr } = choice
    const children = this.getTransform(options)
    return { tag, attr, children }
  }

  private getChoice (options: ColorChoiceOptions): { tag: string; attr: XmlAttrs } | undefined {
    if (options.rgb) {
      if (typeof options.rgb === 'string') {
        return { tag: 'a:srgbClr', attr: { val: options.rgb.replace(/^#/, '') } }
      }
      return {
        tag: 'a:scrgbClr',
        attr: {
          r: toColorPct(options.rgb.red),
          g: toColorPct(options.rgb.green),
          b: toColorPct(options.rgb.blue),
        },
      }
    }
    if (options.hsl) {
      return {
        tag: 'a:hslClr',
        attr: {
          hue: toPositiveFixedAngle(options.hsl.hue),
          sat: toPct(options.hsl.sat),
          lum: toPct(options.hsl.lum),
        },
      }
    }
    if (options.scheme) {
      return { tag: 'a:schemeClr', attr: { val: options.scheme } }
    }
    if (options.system) {
      return { tag: 'a:sysClr', attr: { val: options.system } }
    }
    if (options.preset) {
      return { tag: 'a:prstClr', attr: { val: options.preset } }
    }
  }

  private getTransform (options: ColorTransformOptions) {
    const children: Xml[] = []

    if (options.alpha != null) {
      children.push({ tag: 'a:alpha', attr: { val: toPositiveFixedPct(options.alpha) } })
    }
    if (options.alphaOffset != null) {
      children.push({ tag: 'a:alphaOff', attr: { val: toFixedPct(options.alphaOffset) } })
    }
    if (options.alphaMod != null) {
      children.push({ tag: 'a:alphaMod', attr: { val: toPositivePct(options.alphaMod) } })
    }

    if (options.tint != null) {
      children.push({ tag: 'a:tint', attr: { val: toPositiveFixedPct(options.tint) } })
    }
    if (options.shade != null) {
      children.push({ tag: 'a:shade', attr: { val: toPositiveFixedPct(options.shade) } })
    }

    if (options.complement) {
      children.push({ tag: 'a:comp' })
    }
    if (options.inverse) {
      children.push({ tag: 'a:inv' })
    }
    if (options.gray) {
      children.push({ tag: 'a:gray' })
    }

    if (options.gamma) {
      children.push({ tag: 'a:gamma' })
    }
    if (options.inverseGamma) {
      children.push({ tag: 'a:invGamma' })
    }

    if (options.hue != null) {
      children.push({ tag: 'a:hue', attr: { val: toPositiveFixedAngle(options.hue) } })
    }
    if (options.hueOffset != null) {
      children.push({ tag: 'a:hueOff', attr: { val: toAngle(options.hueOffset) } })
    }
    if (options.hueMod != null) {
      children.push({ tag: 'a:hueMod', attr: { val: toPositivePct(options.hueMod) } })
    }

    if (options.sat != null) {
      children.push({ tag: 'a:sat', attr: { val: toPct(options.sat) } })
    }
    if (options.satOffset != null) {
      children.push({ tag: 'a:satOff', attr: { val: toPct(options.satOffset) } })
    }
    if (options.satMod != null) {
      children.push({ tag: 'a:satMod', attr: { val: toPct(options.satMod) } })
    }

    if (options.lum != null) {
      children.push({ tag: 'a:lum', attr: { val: toPct(options.lum) } })
    }
    if (options.lumOffset != null) {
      children.push({ tag: 'a:lumOff', attr: { val: toPct(options.lumOffset) } })
    }
    if (options.lumMod != null) {
      children.push({ tag: 'a:lumMod', attr: { val: toPct(options.lumMod) } })
    }

    if (options.red != null) {
      children.push({ tag: 'a:red', attr: { val: toColorPct(options.red) } })
    }
    if (options.redOffset != null) {
      children.push({ tag: 'a:redOff', attr: { val: toOffsetColorPct(options.redOffset) } })
    }
    if (options.redMod != null) {
      children.push({ tag: 'a:redMod', attr: { val: toPct(options.redMod) } })
    }

    if (options.green != null) {
      children.push({ tag: 'a:green', attr: { val: toColorPct(options.green) } })
    }
    if (options.greenOffset != null) {
      children.push({ tag: 'a:greenOff', attr: { val: toOffsetColorPct(options.greenOffset) } })
    }
    if (options.greenMod != null) {
      children.push({ tag: 'a:greenMod', attr: { val: toPct(options.greenMod) } })
    }

    if (options.blue != null) {
      children.push({ tag: 'a:blue', attr: { val: toColorPct(options.blue) } })
    }
    if (options.blueOffset != null) {
      children.push({ tag: 'a:blueOff', attr: { val: toOffsetColorPct(options.blueOffset) } })
    }
    if (options.blueMod != null) {
      children.push({ tag: 'a:blueMod', attr: { val: toPct(options.blueMod) } })
    }

    return children
  }
}
