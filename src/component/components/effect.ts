import { Xml, XmlComponent, XmlElement, XmlGroup } from '../../xml'
import {
  toEmu,
  toFixedAngle,
  toFixedPct,
  toPct,
  toPositiveFixedAngle,
  toPositiveFixedPct,
  toPositivePct,
} from '../../utils'
import { Color, ColorOptions, HslOptions } from './color'
import { Fill, FillOptions } from './fill'

import {
  BlendModeType,
  EffectContainerType,
  EffectReferenceType,
  PresetShadowType,
  RectAlignType,
} from '../../interface/enum'
import {
  STFixedAngle,
  STFixedPercentage,
  STPercentage,
  STPoint,
  STPositiveFixedAngle,
  STPositiveFixedPercentage,
  STPositivePercentage,
} from '../../interface/type'

// CT_Blip effect choice
export interface BlipEffectOptions extends EffectBaseOptions, BlipEffectBaseOptions {}

// CT_EffectList note: this is a sequence
export interface EffectListOptions extends EffectBaseOptions, EffectListBaseOptions {}

// EG_Effect
export interface EffectGroupOptions extends EffectBaseOptions, BlipEffectBaseOptions, EffectListBaseOptions, EffectGroupBaseOptions {}

export interface EffectContainerOptions {
  type?: EffectContainerType;
  name?: string;
  effects?: EffectGroupOptions[];
}

export interface ColorChangeOptions {
  from: ColorOptions;
  to: ColorOptions;
  useAlpha?: boolean;
}

export interface GlowOptions {
  radius?: STPoint;
  color?: ColorOptions;
}

export interface InnerShadowOptions {
  blurRadius?: STPoint;
  direction?: STPositiveFixedAngle;
  distance?: STPoint;
  color?: ColorOptions;
}

export interface OuterShadowOptions {
  blurRadius?: STPoint;
  direction?: STPositiveFixedAngle;
  distance?: STPoint;
  xScale?: STPercentage;
  yScale?: STPercentage;
  xSkew?: STFixedAngle;
  ySkew?: STFixedAngle;
  align?: RectAlignType;
  rotateWithShape?: boolean;
  color?: ColorOptions;
}

export interface PresetShadowOptions {
  preset?: PresetShadowType;
  distance?: STPoint;
  direction?: STPositiveFixedAngle;
  color?: ColorOptions;
}

export interface ReflectionOptions {
  blurRadius?: STPoint;
  startAlpha?: STPositiveFixedPercentage;
  startPosition?: STPositiveFixedPercentage;
  endAlpha?: STPositiveFixedPercentage;
  endPosition?: STPositiveFixedPercentage;
  distance?: STPoint;
  direction?: STPositiveFixedAngle;
  fadeDirection?: STPositiveFixedAngle;
  xScale?: STPercentage;
  yScale?: STPercentage;
  xSkew?: STFixedAngle;
  ySkew?: STFixedAngle;
  align?: RectAlignType;
  rotateWithShape?: boolean;
}

export interface TransformOptions {
  xScale?: STPercentage;
  yScale?: STPercentage;
  xSkew?: STFixedAngle;
  ySkew?: STFixedAngle;
  xShift?: STPoint;
  yShift?: STPoint;
}

export enum EffectContainerTag {
  Container = 'a:cont',
  Dag = 'a:effectDag',
}

interface EffectBaseOptions {
  blur?: { grow?: boolean; radius?: STPoint };
  fillOverlay?: {
    fill: FillOptions;
    blend: BlendModeType;
  };
}

interface BlipEffectBaseOptions {
  alphaBiLevel?: STPositiveFixedPercentage;
  alphaCeiling?: boolean;
  alphaFloor?: boolean;
  alphaInverse?: ColorOptions;
  alphaMod?: EffectContainerOptions;
  alphaModFix?: STPositivePercentage;
  alphaReplace?: STPositiveFixedPercentage;
  biLevel?: STPositiveFixedPercentage;
  colorChange?: ColorChangeOptions;
  colorReplace?: ColorOptions;
  duotone?: [ColorOptions, ColorOptions];
  grayScale?: boolean;
  hsl?: Partial<HslOptions>;
  lum?: { brightness?: STFixedPercentage; contrast?: STFixedPercentage };
  tint?: { hue?: STPositiveFixedAngle; amount?: STFixedPercentage };
}

interface EffectListBaseOptions {
  glow?: GlowOptions;
  innerShadow?: InnerShadowOptions;
  outerShadow?: OuterShadowOptions;
  presetShadow?: PresetShadowOptions;
  reflection?: ReflectionOptions;
  softEdge?: { radius?: STPoint };
}

interface EffectGroupBaseOptions {
  effectContainer?: EffectContainerOptions;
  effect?: { reference: EffectReferenceType | string };
  alphaOutset?: { radius?: STPoint };
  blend?: { blend: BlendModeType; effectContainer: EffectContainerOptions };
  fill?: FillOptions;
  relativeOffset?: { offsetX: STPercentage; offsetY: STPercentage };
  transform?: TransformOptions;
}

export class BlipEffect extends XmlComponent {
  constructor (readonly options: BlipEffectOptions[]) {
    super()
  }

  xmlComponent (): XmlGroup {
    const options = this.options
    const children = options.map(options => {
      return new EffectBase(options).xmlComponent()
        ?? new BlipEffectBase(options).xmlComponent()
    })
    return { type: 'group', children }
  }
}

export class EffectList extends XmlComponent {
  constructor (readonly options: EffectListOptions[]) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    const children = options.map(options => {
      return new EffectBase(options).xmlComponent()
        ?? new EffectListBase(options).xmlComponent()
    })
    return { tag: 'a:effectLst', children }
  }
}

export class EffectContainer extends XmlComponent {
  constructor (readonly options: EffectContainerOptions = {}, readonly tag = EffectContainerTag.Container) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    const children = options.effects?.map(options => {
      return new EffectBase(options).xmlComponent()
        ?? new BlipEffectBase(options).xmlComponent()
        ?? new EffectListBase(options).xmlComponent()
        ?? new EffectGroupBase(options).xmlComponent()
    }) ?? []
    return {
      tag: this.tag,
      attr: { type: options.type, name: options.name },
      children,
    }
  }
}

export class EffectDag extends EffectContainer {
  constructor (options: EffectContainerOptions = {}) {
    super(options, EffectContainerTag.Dag)
  }
}

class EffectBase extends XmlComponent {
  constructor (readonly options: EffectBaseOptions = {}) {
    super()
  }

  xmlComponent (): Xml {
    const options = this.options
    if (options.blur) {
      return {
        tag: 'a:blur',
        attr: {
          grow: options.blur.grow,
          rad: toEmu(options.blur.radius),
        },
      }
    }
    if (options.fillOverlay) {
      return {
        tag: 'a:fillOverlay',
        attr: { blend: options.fillOverlay.blend },
        children: [new Fill(options.fillOverlay.fill)],
      }
    }
  }
}

class BlipEffectBase extends XmlComponent {
  constructor (readonly options: BlipEffectBaseOptions = {}) {
    super()
  }

  xmlComponent (): Xml {
    const options = this.options
    if (options.alphaBiLevel != null) {
      return {
        tag: 'a:alphaBiLevel',
        attr: { thresh: toPositiveFixedPct(options.alphaBiLevel) },
      }
    }
    if (options.alphaCeiling) {
      return { tag: 'a:alphaCeiling' }
    }
    if (options.alphaFloor) {
      return { tag: 'a:alphaFloor' }
    }
    if (options.alphaInverse) {
      return {
        tag: 'a:alphaInv',
        children: [new Color(options.alphaInverse)],
      }
    }
    if (options.alphaMod) {
      return {
        tag: 'a:alphaMod',
        children: [new EffectContainer(options.alphaMod)],
      }
    }
    if (options.alphaModFix) {
      return {
        tag: 'a:alphaModFix',
        attr: { amt: toPositivePct(options.alphaModFix) },
      }
    }
    if (options.alphaReplace) {
      return {
        tag: 'a:alphaRepl',
        attr: { a: toPositiveFixedPct(options.alphaReplace) },
      }
    }
    if (options.biLevel) {
      return {
        tag: 'a:biLevel',
        attr: { thresh: toPositiveFixedPct(options.biLevel) },
      }
    }
    if (options.colorChange) {
      return new ColorChange(options.colorChange).xmlComponent()
    }
    if (options.colorReplace) {
      return {
        tag: 'a:clrRepl',
        children: [new Color(options.colorReplace)],
      }
    }
    if (options.duotone && options.duotone.length === 2) {
      return {
        tag: 'a:duotone',
        children: options.duotone.map(options => new Color(options)),
      }
    }
    if (options.grayScale) {
      return { tag: 'a:grayscl' }
    }
    if (options.hsl) {
      return {
        tag: 'a:hsl',
        attr: {
          hue: toPositiveFixedAngle(options.hsl.hue),
          sat: toPct(options.hsl.sat),
          lum: toPct(options.hsl.lum),
        },
      }
    }
    if (options.lum) {
      return {
        tag: 'a:lum',
        attr: {
          bright: toFixedPct(options.lum.brightness),
          contrast: toFixedPct(options.lum.contrast),
        },
      }
    }
    if (options.tint) {
      return {
        tag: 'a:tint',
        attr: {
          hue: toPositiveFixedAngle(options.tint.hue),
          amt: toFixedPct(options.tint.amount),
        },
      }
    }
  }
}

class EffectListBase extends XmlComponent {
  constructor (readonly options: EffectListBaseOptions = {}) {
    super()
  }

  xmlComponent (): Xml {
    const options = this.options
    if (options.glow) {
      return new Glow(options.glow).xmlComponent()
    }
    if (options.innerShadow) {
      return new InnerShadow(options.innerShadow).xmlComponent()
    }
    if (options.outerShadow) {
      return new OuterShadow(options.outerShadow).xmlComponent()
    }
    if (options.presetShadow) {
      return new PresetShadow(options.presetShadow).xmlComponent()
    }
    if (options.reflection) {
      return new Reflection(options.reflection).xmlComponent()
    }
    if (options.softEdge) {
      return {
        tag: 'a:softEdge',
        attr: { rad: toEmu(options.softEdge.radius) },
      }
    }
  }
}

class EffectGroupBase extends XmlComponent {
  constructor (readonly options: EffectGroupBaseOptions = {}) {
    super()
  }

  xmlComponent (): Xml {
    const options = this.options
    if (options.effectContainer) {
      return new EffectContainer(options.effectContainer).xmlComponent()
    }
    if (options.effect) {
      return {
        tag: 'a:effect',
        attr: { ref: options.effect.reference },
      }
    }
    if (options.alphaOutset) {
      return {
        tag: 'a:alphaOutset',
        attr: { rad: toEmu(options.alphaOutset.radius) },
      }
    }
    if (options.blend) {
      return {
        tag: 'a:blend',
        attr: { blend: options.blend.blend },
        children: [new EffectContainer(options.blend.effectContainer)],
      }
    }
    if (options.fill) {
      return { tag: 'a:fill', children: [new Fill(options.fill)] }
    }
    if (options.relativeOffset) {
      return {
        tag: 'a:relOff',
        attr: {
          tx: toPct(options.relativeOffset.offsetX),
          ty: toPct(options.relativeOffset.offsetY),
        },
      }
    }
    if (options.transform) {
      return new Transform(options.transform).xmlComponent()
    }
  }
}

class ColorChange extends XmlComponent {
  constructor (readonly options: ColorChangeOptions) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    return {
      tag: 'a:clrChange',
      attr: { useA: options.useAlpha },
      children: [
        { tag: 'a:clrFrom', children: [new Color(options.from)] },
        { tag: 'a:clrTo', children: [new Color(options.to)] },
      ],
    }
  }
}

class Glow extends XmlComponent {
  constructor (readonly options: GlowOptions = {}) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    if (!options.color) return
    return {
      tag: 'a:glow',
      attr: { rad: toEmu(options.radius) },
      children: [new Color(options.color)],
    }
  }
}

class InnerShadow extends XmlComponent {
  constructor (readonly options: InnerShadowOptions = {}) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    return {
      tag: 'a:innerShdw',
      attr: {
        blurRad: toEmu(options.blurRadius),
        dist: toEmu(options.distance),
        dir: toPositiveFixedAngle(options.direction),
      },
      children: [new Color(options.color)],
    }
  }
}

class OuterShadow extends XmlComponent {
  constructor (readonly options: OuterShadowOptions = {}) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    return {
      tag: 'a:outerShdw',
      attr: {
        blurRad: toEmu(options.blurRadius),
        dist: toEmu(options.distance),
        dir: toPositiveFixedAngle(options.direction),
        sx: toPct(options.xScale),
        sy: toPct(options.yScale),
        kx: toFixedAngle(options.xSkew),
        ky: toFixedAngle(options.ySkew),
        algn: options.align,
        rotWithShape: options.rotateWithShape,
      },
      children: [new Color(options.color)],
    }
  }
}

class PresetShadow extends XmlComponent {
  constructor (readonly options: PresetShadowOptions = {}) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    if (!options.preset) return
    return {
      tag: 'a:prstShdw',
      attr: {
        prst: options.preset,
        dist: toEmu(options.distance),
        dir: toPositiveFixedAngle(options.direction),
      },
      children: [new Color(options.color)],
    }
  }
}

class Reflection extends XmlComponent {
  constructor (readonly options: ReflectionOptions = {}) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    return {
      tag: 'a:reflection',
      attr: {
        blurRad: toEmu(options.blurRadius),
        stA: toPositiveFixedPct(options.startAlpha),
        stPos: toPositiveFixedPct(options.startPosition),
        endA: toPositiveFixedPct(options.endAlpha),
        sendPos: toPositiveFixedPct(options.endPosition),
        dist: toEmu(options.distance),
        dir: toPositiveFixedAngle(options.direction),
        fadeDir: toPositiveFixedAngle(options.fadeDirection),
        sx: toPct(options.xScale),
        sy: toPct(options.yScale),
        kx: toFixedAngle(options.xSkew),
        ky: toFixedAngle(options.ySkew),
        algn: options.align,
        rotWithShape: options.rotateWithShape,
      },
    }
  }
}

class Transform extends XmlComponent {
  constructor (readonly options: TransformOptions = {}) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    return {
      tag: 'a:xfrm',
      attr: {
        sx: toPct(options.xScale),
        sy: toPct(options.yScale),
        kx: toFixedAngle(options.xSkew),
        ky: toFixedAngle(options.ySkew),
        tx: toEmu(options.xShift),
        ty: toEmu(options.yShift),
      },
    }
  }
}
