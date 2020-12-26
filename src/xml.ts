export interface XmlElement {
  declaration?: boolean | XmlAttrs;
  type?: 'element';
  tag: string;
  ns?: XmlAttrs;
  attr?: XmlAttrs;
  children?: (Xml | XmlComponent | undefined)[]
}

export interface XmlGroup {
  type: 'group';
  children?: (Xml | XmlComponent | undefined)[]
}

export interface XmlRaw { // dangerous
  type: 'raw';
  xml: string;
}

export interface XmlText {
  type: 'text';
  text: string;
}

export type Xml = XmlElement | XmlGroup | XmlRaw | XmlText | string

export interface XmlAttrs {
  [P: string]: XmlAttr
}

export type XmlAttr = undefined | null | boolean | number | string

export abstract class XmlComponent {
  abstract xmlComponent (): Xml | undefined;

  xml () {
    const xml = xmlStringify(this)
    return xml
  }
}

export function xmlStringify (xmlComponent?: Xml | XmlComponent): string {
  if (!xmlComponent) return ''

  function helper (xmlComponents: (Xml | XmlComponent | undefined)[]): string {
    const result = xmlComponents.map(xml => {
      if (!xml) return ''
      if (xml instanceof XmlComponent) xml = xml.xmlComponent()
      if (!xml) return ''
      if (typeof xml === 'string') return encodeXml(xml)
      if (xml.type === 'text') return encodeXml(xml.text)
      if (xml.type === 'raw') {
        return xml.xml.replace(/\?>(\r?\n\s*)+</, '?>\r\n<').replace(/(?<!\?)>(\s*\r?\n\s*)+</g, '><').trim()
      }
      const children = xml.children?.length ? helper(xml.children) : ''
      if (xml.type === 'group') return children
      const nsAttrStr = attrStringify(xml.ns, true)
      const attrStr = attrStringify(xml.attr)
      const open = `${xml.tag}${nsAttrStr}${attrStr}`
      const str = children ? `<${open}>${children}</${xml.tag}>` : `<${open}/>`
      return str
    }).join('')
    return result
  }

  const result = helper([xmlComponent])
  const declaration = (xmlComponent as XmlElement)?.declaration
  if (!declaration) return result
  const defaultDeclaration = { version: '1.0', encoding: 'UTF-8', standalone: 'yes' }
  const declarationAttr = typeof declaration === 'boolean' ? defaultDeclaration : { ...defaultDeclaration, ...declaration }
  const declarationAttrStr = attrStringify(declarationAttr)
  return `<?xml${declarationAttrStr}?>\r\n${result}`
}

export function attrStringify (attrs?: XmlAttrs, ns = false) {
  if (!attrs) return ''
  const attrStr = Object.keys(attrs)
    .map(k => [k, attrs[k]])
    .filter(([_k, v]) => v !== '' && v != null)
    .map(([k, v]) => {
      const r = `${k}="${encodeXmlAttr(v)}"`
      return ns ? (k ? `xmlns:${r}` : `xmlns${r}`) : r
    })
    .join(' ')
  return attrStr ? ` ${attrStr}` : ''
}

export function encodeXml (xml?: string) {
  if (!xml) return ''
  return `${xml}`.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function encodeXmlAttr (xml?: XmlAttr) {
  if (xml == null || xml === '') return ''
  if (typeof xml === 'boolean') return xml ? '1' : '0'
  return `${xml}`.replace(/"/g, '&quot;')
}
