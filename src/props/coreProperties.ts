import { Xml, XmlComponent, XmlElement } from '../xml'

export interface CorePropertiesOptions {
  title?: string;
  subject?: string;
  language?: string;
  creator?: string;
  lastModifiedBy?: string;
  version?: string;
  revision?: string;
  created?: Date | string;
  modified?: Date | string;
  category?: string;
  contentType?: string;
  contentStatus?: string;
  description?: string;
  identifier?: string;
  keywords?: string;
}

export class CoreProperties extends XmlComponent {
  constructor (readonly options: CorePropertiesOptions = {}) {
    super()
  }

  xmlComponent (): XmlElement {
    const options = this.options
    const created = options.created ?? new Date()
    const modified = options.modified ?? new Date()
    const children: Xml[] = []
    children.push({ tag: 'dc:title', children: [options.title] })
    if (options.subject) children.push({ tag: 'dc:subject', children: [options.subject] })
    if (options.language) children.push({ tag: 'dc:language', children: [options.language] })
    children.push({ tag: 'dc:creator', children: [options.creator ?? 'pptxjs'] })
    children.push({ tag: 'cp:lastModifiedBy', children: [options.lastModifiedBy ?? options.creator ?? 'pptxjs'] })
    if (options.version) children.push({ tag: 'cp:version', children: [options.version] })
    children.push({ tag: 'cp:revision', children: [options.revision ?? '1'] })
    if (options.category) children.push({ tag: 'cp:category', children: [options.category] })
    if (options.contentType) children.push({ tag: 'cp:contentType', children: [options.contentType] })
    if (options.contentStatus) children.push({ tag: 'cp:contentStatus', children: [options.contentStatus] })
    children.push({
      tag: 'dcterms:created',
      attr: { 'xsi:type': 'dcterms:W3CDTF' },
      children: [typeof created === 'string' ? created : created.toISOString().replace(/\.\d{3}Z/, 'Z')],
    })
    children.push({
      tag: 'dcterms:modified',
      attr: { 'xsi:type': 'dcterms:W3CDTF' },
      children: [typeof modified === 'string' ? modified : modified.toISOString().replace(/\.\d{3}Z/, 'Z')],
    })
    if (options.description) children.push({ tag: 'dc:description', children: [options.description] })
    if (options.identifier) children.push({ tag: 'dc:identifier', children: [options.identifier] })
    if (options.keywords) children.push({ tag: 'cp:keywords', children: [options.keywords] })
    return {
      declaration: true,
      tag: 'cp:coreProperties',
      ns: {
        cp: 'http://schemas.openxmlformats.org/package/2006/metadata/core-properties',
        dc: 'http://purl.org/dc/elements/1.1/',
        dcterms: 'http://purl.org/dc/terms/',
        dcmitype: 'http://purl.org/dc/dcmitype/',
        xsi: 'http://www.w3.org/2001/XMLSchema-instance',
      },
      children,
    }
  }
}
