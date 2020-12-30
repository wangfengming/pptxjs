import { Xml, XmlComponent, XmlElement, XmlGroup } from '../../xml'
import {
  toEmu,
  toFixedAngle,
  toFixedPct,
  toPct,
  toPositiveFixedAngle,
  toPositiveFixedPct,
  toPositivePct
} from '../../utils'
import { Color, ColorOptions, HslOptions } from './color'
import { Fill, FillOptions } from './fill'

import {
  BlendModeType,
  EffectContainerType,
  EffectReferenceType,
  PresetShadowType,
  RectAlignType
} from '../../interface/enum'
import {
  STFixedAngle,
  STFixedPercentage,
  STPercentage,
  STPoint,
  STPositiveFixedAngle,
  STPositiveFixedPercentage,
  STPositivePercentage
} from '../../interface/type'

export interface BlipEffectOptions extends EffectBaseOptions, BlipEffectBaseOptions {}

export interface EffectListOptions extends EffectBaseOptions, EffectListBaseOptions {}

export interface EffectGroupOptions extends EffectBaseOptions, BlipEffectBaseOptions, EffectListBaseOptions, EffectGroupBaseOptions {}

export interface EffectContainerOptions extends EffectGroupOptions {
  type?: EffectContainerType;
  name?: string;
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
  duotone?: ColorOptions;
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
  constructor (readonly options: BlipEffectOptions = {}) {super()}

  xmlComponent (): XmlGroup {
    const options = this.options
    return {
      type: 'group',
      children: [new EffectBase(options), new BlipEffectBase(options)],
    }
  }
}

export class EffectListGroup extends XmlComponent {
  constructor (readonly options: EffectListOptions = {}) {super()}

  xmlComponent (): XmlGroup {
    const options = this.options
    return {
      type: 'group',
      children: [new EffectBase(options), new EffectListBase(options)],
    }
  }
}

export class EffectGroup extends XmlComponent {
  constructor (readonly options: EffectGroupOptions = {}) {super()}

  xmlComponent (): XmlGroup {
    const options = this.options
    return {
      type: 'group',
      children: [
        new EffectBase(options),
        new BlipEffectBase(options),
        new EffectListBase(options),
        new EffectGroupBase(options),
      ]
    }
  }
}

export class EffectList extends XmlComponent {
  constructor (readonly options: EffectListOptions = {}) {super()}

  xmlComponent (): XmlElement {
    const options = this.options
    return {
      tag: 'a:effectLst',
      children: [new EffectListGroup(options)],
    }
  }
}

export class EffectContainer extends XmlComponent {
  constructor (readonly options: EffectContainerOptions = {}, readonly tag = EffectContainerTag.Container) {super()}

  xmlComponent (): XmlElement {
    const options = this.options
    return {
      tag: this.tag,
      attr: { type: options.type, name: options.name },
      children: [new EffectGroup(options)],
    }
  }
}

export class EffectDag extends EffectContainer {
  constructor (options: EffectContainerOptions = {}) {super(options, EffectContainerTag.Dag)}
}

class EffectBase extends XmlComponent {
  constructor (readonly options: EffectBaseOptions = {}) {super()}

  xmlComponent (): XmlGroup {
    const options = this.options
    const children: Xml[] = []
    if (options.blur) {
      children.push({ tag: 'a:blur', attr: { grow: options.blur.grow, rad: toEmu(options.blur.radius) } })
    }
    if (options.fillOverlay) {
      children.push({
        tag: 'a:fillOverlay',
        attr: { blend: options.fillOverlay.blend },
        children: [new Fill(options.fillOverlay.fill)],
      })
    }
    return { type: 'group', children }
  }
}

class BlipEffectBase extends XmlComponent {
  constructor (readonly options: BlipEffectBaseOptions = {}) {super()}

  xmlComponent (): XmlGroup {
    const options = this.options
    const children: (Xml | XmlComponent)[] = []
    if (options.alphaBiLevel != null) {
      children.push({ tag: 'a:alphaBiLevel', attr: { thresh: toPositiveFixedPct(options.alphaBiLevel) } })
    }
    if (options.alphaCeiling) {
      children.push({ tag: 'a:alphaCeiling' })
    }
    if (options.alphaFloor) {
      children.push({ tag: 'a:alphaFloor' })
    }
    if (options.alphaInverse) {
      children.push({ tag: 'a:alphaInv', children: [new Color(options.alphaInverse)] })
    }
    if (options.alphaMod) {
      children.push({
        tag: 'a:alphaMod',
        children: [new EffectContainer(options.alphaMod)],
      })
    }
    if (options.alphaModFix) {
      children.push({ tag: 'a:alphaModFix', attr: { amt: toPositivePct(options.alphaModFix) } })
    }
    if (options.alphaReplace) {
      children.push({ tag: 'a:alphaRepl', attr: { a: toPositiveFixedPct(options.alphaReplace) } })
    }
    if (options.biLevel) {
      children.push({ tag: 'a:biLevel', attr: { thresh: toPositiveFixedPct(options.biLevel) } })
    }
    if (options.colorChange) {
      children.push(new ColorChange(options.colorChange))
    }
    if (options.colorReplace) {
      children.push({ tag: 'a:clrRepl', children: [new Color(options.colorReplace)] })
    }
    if (options.duotone) {
      children.push({ tag: 'a:duotone', children: [new Color(options.duotone)] })
    }
    if (options.grayScale) {
      children.push({ tag: 'a:grayscl' })
    }
    if (options.hsl) {
      children.push({
        tag: 'a:hsl',
        attr: {
          hue: toPositiveFixedAngle(options.hsl.hue),
          sat: toPct(options.hsl.sat),
          lum: toPct(options.hsl.lum),
        },
      })
    }
    if (options.lum) {
      children.push({
        tag: 'a:lum',
        attr: {
          bright: toFixedPct(options.lum.brightness),
          contrast: toFixedPct(options.lum.contrast),
        },
      })
    }
    if (options.tint) {
      children.push({
        tag: 'a:tint',
        attr: {
          hue: toPositiveFixedAngle(options.tint.hue),
          amt: toFixedPct(options.tint.amount),
        },
      })
    }
    return { type: 'group', children }
  }
}

class EffectListBase extends XmlComponent {
  constructor (readonly options: EffectListBaseOptions = {}) {super()}

  xmlComponent (): XmlGroup {
    const options = this.options
    const children: (Xml | XmlComponent)[] = []
    if (options.glow) {
      children.push(new Glow(options.glow))
    }
    if (options.innerShadow) {
      children.push(new InnerShadow(options.innerShadow))
    }
    if (options.outerShadow) {
      children.push(new OuterShadow(options.outerShadow))
    }
    if (options.presetShadow) {
      children.push(new PresetShadow(options.presetShadow))
    }
    if (options.reflection) {
      children.push(new Reflection(options.reflection))
    }
    if (options.softEdge) {
      children.push({ tag: 'a:softEdge', attr: { rad: toEmu(options.softEdge.radius) } })
    }
    return { type: 'group', children }
  }
}

class EffectGroupBase extends XmlComponent {
  constructor (readonly options: EffectGroupBaseOptions = {}) {super()}

  xmlComponent (): XmlGroup {
    const options = this.options
    const children: (Xml | XmlComponent)[] = []
    if (options.effectContainer) {
      children.push(new EffectContainer(options.effectContainer))
    }
    if (options.effect) {
      children.push({ tag: 'a:effect', attr: { ref: options.effect.reference } })
    }
    if (options.alphaOutset) {
      children.push({ tag: 'a:alphaOutset', attr: { rad: toEmu(options.alphaOutset.radius) } })
    }
    if (options.blend) {
      children.push({
        tag: 'a:blend',
        attr: { blend: options.blend.blend },
        children: [new EffectContainer(options.blend.effectContainer)],
      })
    }
    if (options.fill) {
      children.push({ tag: 'a:fill', children: [new Fill(options.fill)] })
    }
    if (options.relativeOffset) {
      children.push({
        tag: 'a:relOff',
        attr: { tx: toPct(options.relativeOffset.offsetX), ty: toPct(options.relativeOffset.offsetY) },
      })
    }
    if (options.transform) {
      children.push(new Transform(options.transform))
    }
    return { type: 'group', children }
  }
}

class ColorChange extends XmlComponent {
  constructor (readonly options: ColorChangeOptions) {super()}

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
  constructor (readonly options: GlowOptions = {}) {super()}

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
  constructor (readonly options: InnerShadowOptions = {}) {super()}

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
  constructor (readonly options: OuterShadowOptions = {}) {super()}

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
  constructor (readonly options: PresetShadowOptions = {}) {super()}

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
  constructor (readonly options: ReflectionOptions = {}) {super()}

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
  constructor (readonly options: TransformOptions = {}) {super()}

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
