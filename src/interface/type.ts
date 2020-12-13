import { STUnit } from '../utils'

// simple types
export type STPercentage = number;  // percentage. 200 means 200%
export type STFixedPercentage = number; // percentage. -100%~100%
export type STPositivePercentage = number; // percentage. >=0%
export type STPositiveFixedPercentage = number; // percentage. 0%~100%
export type STOffsetColorPercentage = number; // color offset. can be negative. -255~255
export type STColorPercentage = number; // color. 0~255

export type STAngle = number; // angle.
export type STFixedAngle = number; // angle. -90~90
export type STPositiveFixedAngle = number; // angle. 0~360

export interface STValue {
  value?: number;
  unit?: STUnit;
}

// inch value. or value with unit. e.g. 72pt/25.4mm/2.54cm/1in/1
export type STInch = number | string | STValue;
// point value. or value with unit. e.g. 72pt/25.4mm/2.54cm/1in/72
export type STPoint = number | string | STValue;
export type STTextIndentLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
