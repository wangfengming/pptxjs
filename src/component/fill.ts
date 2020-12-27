import { Xml, XmlComponent, XmlElement } from '../xml'
import { Color, ColorOptions } from './color'
import { PathShadeType, PatternFillPresetType, RectAlignType, TileFlipType } from '../interface/enum'
import { STPercentage, STPoint, STPositiveFixedPercentage } from '../interface/type'
import { toEmu, toPct, toPositiveFixedPct } from '../utils'
import { Blip, BlipOptions } from './blip'

export type FillOptions =
  { type?: 'no' }
  | { type?: 'solid' } & SolidFillOption
  | { type?: 'gradient' } & GradientFillOptions
  | { type?: 'pattern' } & PatternFillOptions
  | { type?: 'blip' } & BlipFillOptions
  | { type?: 'group' }

export class Fill extends XmlComponent {
  constructor (readonly options: FillOptions = {}) {super()}

  xmlComponent (): XmlElement | undefined {
    const options = this.options
    if (!options.type) return
    if (options.type === 'no') return new NoFill().xmlComponent()
    if (options.type === 'solid') return new SolidFill(options).xmlComponent()
    if (options.type === 'gradient') return new GradientFill(options).xmlComponent()
    if (options.type === 'pattern') return new PatternFill(options).xmlComponent()
    if (options.type === 'blip') return new BlipFill(options).xmlComponent()
    if (options.type === 'group') return new GroupFill().xmlComponent()
  }
}

export type LineFillOptions =
  { type?: 'no' }
  | { type?: 'solid' } & SolidFillOption
  | { type?: 'gradient' } & GradientFillOptions
  | { type?: 'pattern' } & PatternFillOptions

export class LineFill extends XmlComponent {
  constructor (readonly options: LineFillOptions = {}) {super()}

  xmlComponent (): XmlElement | undefined {
    const options = this.options
    if (!options.type) return
    if (options.type === 'no') return new NoFill().xmlComponent()
    if (options.type === 'solid') return new SolidFill(options).xmlComponent()
    if (options.type === 'gradient') return new GradientFill(options).xmlComponent()
    if (options.type === 'pattern') return new PatternFill(options).xmlComponent()
  }
}

export class NoFill extends XmlComponent {
  xmlComponent (): XmlElement {
    return { tag: 'a:noFill' }
  }
}

export interface SolidFillOption {
  color?: ColorOptions;
}

export class SolidFill extends XmlComponent {
  constructor (readonly options: SolidFillOption = {}) {super()}

  xmlComponent (): XmlElement {
    const options = this.options
    return { tag: 'a:solidFill', children: [new Color(options.color)] }
  }
}

export interface PatternFillOptions {
  background?: ColorOptions;
  foreground?: ColorOptions;
  preset?: PatternFillPresetType;
}

export class PatternFill extends XmlComponent {
  constructor (readonly options?: PatternFillOptions) {super()}

  xmlComponent (): XmlElement {
    const options = this.options
    if (!options) return
    const children: Xml[] = []
    if (options.background) children.push({ tag: 'a:bgClr', children: [new Color(options.background)] })
    if (options.foreground) children.push({ tag: 'a:fgClr', children: [new Color(options.foreground)] })
    return { tag: 'a:pattFill', attr: { prst: options.preset }, children }
  }
}

export interface GradientFillOptions {
  flip?: TileFlipType;
  rotateWithShape?: boolean;
  stops?: GradientStopOptions[];
  linear?: { angle?: number; scaled?: boolean };
  path?: { path?: PathShadeType; fillToRect?: RectangleOptions };
  tileRect?: RectangleOptions;
}

export interface GradientStopOptions {
  position: STPositiveFixedPercentage;
  color: ColorOptions;
}

export class GradientFill extends XmlComponent {
  constructor (readonly options?: GradientFillOptions) {super()}

  xmlComponent (): XmlElement {
    const options = this.options
    if (!options) return
    const attr = { flip: options.flip, rotWithShape: options.rotateWithShape }
    const children: (XmlComponent | Xml | undefined)[] = []
    if (options.stops?.length && options.stops.length > 1) {
      const stops = options.stops.map(stop => {
        return { tag: 'a:gs', attr: { pos: toPositiveFixedPct(stop.position) }, children: [new Color(stop.color)] }
      })
      children.push({ tag: 'a:gsLst', children: stops })
    }
    if (options.linear) {
      children.push({
        tag: 'a:lin',
        attr: { ang: options.linear.angle, scaled: options.linear.scaled },
      })
    } else if (options.path) {
      children.push({
        tag: 'a:path',
        attr: { path: options.path.path },
        children: [new Rectangle(options.path.fillToRect, RectangleTag.FillToRect)],
      })
    }
    if (options.tileRect) children.push(new Rectangle(options.tileRect, RectangleTag.TileRect))
    return { tag: 'a:gradFill', attr, children }
  }
}

export interface BlipFillOptions {
  blip?: BlipOptions;
  dpi?: number;
  rotateWithShape?: boolean;
  sourceRect?: RectangleOptions;
  tile?: {
    horizontalOffset?: STPoint;
    verticalOffset?: STPoint;
    horizontalScale?: STPercentage;
    verticalScale?: STPercentage;
    flip?: TileFlipType;
    align?: RectAlignType;
  };
  stretch?: RectangleOptions;
}

export class BlipFill extends XmlComponent {
  constructor (readonly options?: BlipFillOptions) {super()}

  xmlComponent (): XmlElement {
    const options = this.options
    if (!options) return
    const attr = { dpi: options.dpi, rotWithShape: options.rotateWithShape }
    const children: (Xml | XmlComponent)[] = []
    if (options.blip) {
      children.push(new Blip(options.blip))
    }
    if (options.sourceRect) {
      children.push(new Rectangle(options.sourceRect, RectangleTag.SrcRect))
    }
    if (options?.tile) {
      children.push({
        tag: 'a:tile',
        attr: {
          tx: toEmu(options.tile.horizontalOffset),
          ty: toEmu(options.tile.verticalOffset),
          sx: toPct(options.tile.horizontalScale),
          sy: toPct(options.tile.verticalScale),
          flip: options.tile.flip,
          algn: options.tile.align,
        },
      })
    } else if (options.stretch) {
      children.push({
        tag: 'a:stretch',
        children: [new Rectangle(options.stretch, RectangleTag.FillRect)],
      })
    }
    return { tag: 'a:blipFill', attr, children }
  }
}

export class GroupFill extends XmlComponent {
  xmlComponent (): XmlElement {
    return { tag: 'a:grpFill' }
  }
}

export interface RectangleOptions {
  top?: STPercentage;
  right?: STPercentage;
  bottom?: STPercentage;
  left?: STPercentage;
}

export enum RectangleTag {
  FillToRect = 'a:fillToRect',
  FillRect = 'a:fillRect',
  TileRect = 'a:tileRect',
  SrcRect = 'a:srcRect',
}

export class Rectangle extends XmlComponent {
  constructor (readonly options: RectangleOptions | undefined, readonly tag: RectangleTag) {super()}

  xmlComponent (): XmlElement {
    const options = this.options
    if (!options) return
    const attr = {
      l: toPct(options.left),
      t: toPct(options.top),
      r: toPct(options.right),
      b: toPct(options.bottom),
    }
    return { tag: this.tag, attr }
  }
}
