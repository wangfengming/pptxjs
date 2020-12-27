import {
  STAngle,
  STColorPercentage,
  STFixedAngle,
  STFixedPercentage,
  STInch,
  STOffsetColorPercentage,
  STPercentage,
  STPoint,
  STPositiveFixedAngle,
  STPositiveFixedPercentage,
  STPositivePercentage,
  STValue
} from './interface/type'

const units = {
  in: 9600,
  inc: 9600,
  inch: 9600,
  cm: 48000 / 127,
  mm: 4800 / 127,
  pt: 400 / 3,
  hpt: 4 / 3,  // hundredths of a point. 1 pt = 100 hpts
  emu: 4 / 3 / 127, // 12700 of a points. 1 pt = 12700 EMUs
}

export type STUnit = keyof typeof units

function unitConvert (value: number | string | STValue | undefined, toType: STUnit, fromType?: STUnit) {
  if (value == null) return
  if (typeof value === 'string') {
    const match = value.toLowerCase().match(/^([+-]?(\d+\.?\d*)|(\d*\.?\d+))(pt|mm|cm|in|inch?|hpt|emu)?$/)
    if (!match) return
    value = +match[1]
    fromType = match[4] as STUnit || fromType
  } else if (typeof value !== 'number') {
    fromType = value.unit || fromType
    value = value.value
    if (value == null) return
  }
  if (fromType === toType) return value
  if (!fromType || !units[toType] || !units[fromType]) return
  return value / units[toType] * units[fromType]
}

export function toEmu (value?: STInch | STPoint, fromType: STUnit = 'pt') {
  if (value == null) return
  const val = unitConvert(value, 'emu', fromType)
  return val ? Math.round(val) : val
}

export function toHpt (value?: STInch | STPoint, fromType: STUnit = 'pt') {
  if (value == null) return
  const val = unitConvert(value, 'hpt', fromType)
  return val ? Math.round(val) : val
}

export function toPct (value?: STPercentage) {
  if (value == null || isNaN(value)) return
  return Math.round(value * 1000)
}

export function toFixedPct (value?: STFixedPercentage) {
  if (value && (value < -100 || value > 100)) {
    throw new Error('Fixed percentage should <=-100% and >=100%!')
  }
  return toPct(value)
}

export function toPositivePct (value?: STPositivePercentage) {
  if (value && (value < 0)) {
    throw new Error('Positive percentage should >=0%!')
  }
  return toPct(value)
}

export function toPositiveFixedPct (value?: STPositiveFixedPercentage) {
  if (value && (value < 0 || value > 100)) {
    throw new Error('Positive fixed percentage should >=0% and <=100%!')
  }
  return toPct(value)
}

export function toOffsetColorPct (value?: STOffsetColorPercentage) {
  if (value && (value < -255 || value > 255)) {
    throw new Error('Color offset value should >=-255 and <=255!')
  }
  return value == null ? undefined : toPct(value / 255 * 100)
}

export function toColorPct (value?: STColorPercentage) {
  if (value && (value < 0 || value > 255)) {
    throw new Error('Positive color value should >=0 and <=255!')
  }
  return value == null ? undefined : toPct(value / 255 * 100)
}

export function toAngle (value?: STAngle) {
  if (value == null || isNaN(value)) return
  return Math.round(value * 60000)
}

export function toFixedAngle (value?: STFixedAngle) {
  if (value && (value < -90 || value > 90)) {
    throw new Error('Fixed angle should >=-90 and <=90!')
  }
  return toAngle(value)
}

export function toPositiveFixedAngle (value?: STPositiveFixedAngle) {
  if (value && (value < 0 || value > 360)) {
    throw new Error('Positive fixed angle should >=0 and <=360!')
  }
  return toAngle(value)
}

export function uuid () {
  return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
