import { XmlComponent, XmlElement } from '../../xml'
import { BlipEffect, BlipEffectOptions } from './effect'

import { BlipCompressionType } from '../../interface/enum'

export interface BlipOptions extends BlipChoiceOptions {
  compressionState?: BlipCompressionType;
  effects?: BlipEffectOptions[];
}

// CT_OleObject
export interface BlipChoiceOptions {
  embedId?: string;
  linkId?: string;
}

export class Blip extends XmlComponent {
  constructor (readonly options: BlipOptions = {}) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    if (!options.embedId && !options.linkId) return
    const attr = {
      'r:embed': options.embedId,
      'r:link': options.embedId ? undefined : options.linkId,
      cstate: options.compressionState,
    }
    return {
      tag: 'a:blip',
      attr,
      children: [new BlipEffect(options.effects)],
    }
  }
}
