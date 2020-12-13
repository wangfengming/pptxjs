import { SlideTextOptions } from './text'

export interface ISlideObjects {
  text: SlideTextOptions;
}

export type SlideObjectType = keyof ISlideObjects

export type SlideObjectOptions = {
  [K in SlideObjectType]: { type: K; options: ISlideObjects[K] }
}[SlideObjectType]

export abstract class SlideObject {
  protected constructor (readonly type: string, readonly options: Record<string, any> = {}) {}
}
