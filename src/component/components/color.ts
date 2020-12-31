import { XmlAttrs, XmlComponent, XmlElement } from '../../xml'
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

// 6种颜色方式 EG_ColorChoice
export interface ColorOptions {
  rgb?: RgbOptions;
  hex?: string;
  hsl?: HslOptions;
  scheme?: SchemeColorType; // a color bound to a user's theme
  system?: string; // a color bound to predefined operating system elements
  preset?: string; // a color bound to predefined collection of colors.
  transform?: ColorTransformOptions[];
}

export interface RgbOptions { // FFFFFF or (0~255,0~255,0~255)
  red: STColorPercentage;
  green: STColorPercentage;
  blue: STColorPercentage;
}

export interface HslOptions { // (0~360, 0~100, 0~100)
  hue: STPositiveFixedAngle;
  sat: STPercentage;
  lum: STPercentage;
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
    const children = options.transform?.map(options => new ColorTransform(options)) ?? []
    return { tag, attr, children }
  }

  private getChoice (options: ColorOptions): { tag: string; attr: XmlAttrs } | undefined {
    if (options.rgb) {
      return {
        tag: 'a:scrgbClr',
        attr: {
          r: toColorPct(options.rgb.red),
          g: toColorPct(options.rgb.green),
          b: toColorPct(options.rgb.blue),
        },
      }
    }
    if (options.hex) {
      return {
        tag: 'a:srgbClr',
        attr: { val: options.hex.replace(/^#/, '') },
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
      return {
        tag: 'a:schemeClr',
        attr: { val: options.scheme },
      }
    }
    if (options.system) {
      return {
        tag: 'a:sysClr',
        attr: { val: options.system },
      }
    }
    if (options.preset) {
      return {
        tag: 'a:prstClr',
        attr: { val: options.preset },
      }
    }
  }
}

// 颜色转换参数 EG_ColorTransform
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

class ColorTransform extends XmlComponent {
  constructor (readonly options: ColorTransformOptions = {}) {
    super()
  }

  xmlComponent (): XmlElement | undefined {
    const options = this.options
    if (options.alpha != null) {
      return {
        tag: 'a:alpha',
        attr: { val: toPositiveFixedPct(options.alpha) },
      }
    }
    if (options.alphaOffset != null) {
      return {
        tag: 'a:alphaOff',
        attr: { val: toFixedPct(options.alphaOffset) },
      }
    }
    if (options.alphaMod != null) {
      return {
        tag: 'a:alphaMod',
        attr: { val: toPositivePct(options.alphaMod) },
      }
    }

    if (options.tint != null) {
      return {
        tag: 'a:tint',
        attr: { val: toPositiveFixedPct(options.tint) },
      }
    }
    if (options.shade != null) {
      return {
        tag: 'a:shade',
        attr: { val: toPositiveFixedPct(options.shade) },
      }
    }

    if (options.complement) {
      return { tag: 'a:comp' }
    }
    if (options.inverse) {
      return { tag: 'a:inv' }
    }
    if (options.gray) {
      return { tag: 'a:gray' }
    }

    if (options.gamma) {
      return { tag: 'a:gamma' }
    }
    if (options.inverseGamma) {
      return { tag: 'a:invGamma' }
    }

    if (options.hue != null) {
      return {
        tag: 'a:hue',
        attr: { val: toPositiveFixedAngle(options.hue) },
      }
    }
    if (options.hueOffset != null) {
      return {
        tag: 'a:hueOff',
        attr: { val: toAngle(options.hueOffset) },
      }
    }
    if (options.hueMod != null) {
      return {
        tag: 'a:hueMod',
        attr: { val: toPositivePct(options.hueMod) },
      }
    }

    if (options.sat != null) {
      return {
        tag: 'a:sat',
        attr: { val: toPct(options.sat) },
      }
    }
    if (options.satOffset != null) {
      return {
        tag: 'a:satOff',
        attr: { val: toPct(options.satOffset) },
      }
    }
    if (options.satMod != null) {
      return {
        tag: 'a:satMod',
        attr: { val: toPct(options.satMod) },
      }
    }

    if (options.lum != null) {
      return {
        tag: 'a:lum',
        attr: { val: toPct(options.lum) },
      }
    }
    if (options.lumOffset != null) {
      return {
        tag: 'a:lumOff',
        attr: { val: toPct(options.lumOffset) },
      }
    }
    if (options.lumMod != null) {
      return {
        tag: 'a:lumMod',
        attr: { val: toPct(options.lumMod) },
      }
    }

    if (options.red != null) {
      return {
        tag: 'a:red',
        attr: { val: toColorPct(options.red) },
      }
    }
    if (options.redOffset != null) {
      return {
        tag: 'a:redOff',
        attr: { val: toOffsetColorPct(options.redOffset) },
      }
    }
    if (options.redMod != null) {
      return {
        tag: 'a:redMod',
        attr: { val: toPct(options.redMod) },
      }
    }

    if (options.green != null) {
      return {
        tag: 'a:green',
        attr: { val: toColorPct(options.green) },
      }
    }
    if (options.greenOffset != null) {
      return {
        tag: 'a:greenOff',
        attr: { val: toOffsetColorPct(options.greenOffset) },
      }
    }
    if (options.greenMod != null) {
      return {
        tag: 'a:greenMod',
        attr: { val: toPct(options.greenMod) },
      }
    }

    if (options.blue != null) {
      return {
        tag: 'a:blue',
        attr: { val: toColorPct(options.blue) },
      }
    }
    if (options.blueOffset != null) {
      return {
        tag: 'a:blueOff',
        attr: { val: toOffsetColorPct(options.blueOffset) },
      }
    }
    if (options.blueMod != null) {
      return {
        tag: 'a:blueMod',
        attr: { val: toPct(options.blueMod) },
      }
    }
  }
}
