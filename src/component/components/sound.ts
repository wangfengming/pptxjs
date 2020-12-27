import { XmlComponent, XmlElement } from '../../xml'

export interface SoundOptions {
  embed: string;
  name?: string;
  buildIn?: boolean;
}

export enum SoundTag {
  Sound = 'a:snd',
  WavAudioFile = 'a:wavAudioFile',
}

export class Sound extends XmlComponent {
  constructor (readonly options: SoundOptions, readonly tag = SoundTag.Sound) {super()}

  xmlComponent (): XmlElement {
    const tag = this.tag
    const options = this.options
    return { tag, attr: { 'r:embed': options.embed, name: options.name, buildIn: options.buildIn } }
  }
}

export class WavAudioFile extends Sound {
  constructor (options: SoundOptions) {super(options, SoundTag.WavAudioFile)}
}
