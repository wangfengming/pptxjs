import { TabAlignType } from '../../interface/enum'
import { STPoint } from '../../interface/type'
import { XmlComponent, XmlElement } from '../../xml'
import { toEmu } from '../../utils'

export interface TabStopsOptions {
  tabStops?: TabStopOptions[];
}

export interface TabStopOptions {
  align?: TabAlignType;
  position?: STPoint
}

export class TabStops extends XmlComponent {
  constructor (readonly options: TabStopsOptions = {}) {super()}

  xmlComponent (): XmlElement {
    const options = this.options
    if (!options.tabStops) return
    const children = options.tabStops.map(stop => {
      return { tag: 'a:tab', attr: { algn: stop.align, pos: toEmu(stop.position) } }
    })
    return { tag: 'a:tabLst', children }
  }
}
