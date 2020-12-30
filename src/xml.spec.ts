import { expect } from 'chai'
import { attrStringify, XmlAttrs, XmlComponent, XmlElement, XmlGroup, XmlRaw, xmlStringify, XmlText } from './xml'

describe('xml', () => {
  it('should stringify string', () => {
    const xml = 'Hello World!'
    const result = xmlStringify(xml)
    expect(result).to.equal('Hello World!')
  })

  it('should stringify escape string', () => {
    const xml = 'A > B'
    const result = xmlStringify(xml)
    expect(result).to.equal('A &gt; B')
  })

  it('should stringify text', () => {
    const xml: XmlText = { type: 'text', text: 'C < D' }
    const result = xmlStringify(xml)
    expect(result).to.equal('C &lt; D')
  })

  it('should stringify raw', () => {
    const xml: XmlRaw = {
      type: 'raw',
      xml: `
        <a>
          <b>c</b>
        </a>
        `,
    }
    const result = xmlStringify(xml)
    expect(result).to.equal('<a><b>c</b></a>')
  })

  it('should stringify raw with declaration', () => {
    const xml: XmlRaw = {
      type: 'raw',
      xml: `
        <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <a>
          <b>c</b>
        </a>
        `,
    }
    const result = xmlStringify(xml)
    expect(result).to.equal('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n<a><b>c</b></a>')
  })

  it('should stringify attr', () => {
    const attr: XmlAttrs = {
      a: undefined,
      b: null,
      c: true,
      d: false,
      e: 100,
      f: 'Char "O"',
    }
    const result = attrStringify(attr)
    expect(result).to.equal(' c="1" d="0" e="100" f="Char &quot;O&quot;"')
  })

  it('should stringify empty attr', () => {
    const attr: XmlAttrs = {
      a: undefined,
      b: null,
    }
    const result = attrStringify(attr)
    expect(result).to.equal('')
  })

  it('should stringify element', () => {
    const xml: XmlElement = {
      attr: { x: true },
      tag: 'a',
      children: [
        {
          tag: 'b1',
          children: [{ tag: 'c' }],
        },
        {
          tag: 'b2',
          children: [{ tag: 'c' }],
        },
      ],
    }
    const result = xmlStringify(xml)
    expect(result).to.equal('<a x="1"><b1><c/></b1><b2><c/></b2></a>')
  })

  it('should stringify element with declaration', () => {
    const xml: XmlElement = {
      declaration: true,
      ns: { '': 'http://a', c: 'http://c' },
      attr: { x: true },
      tag: 'a',
      children: [
        {
          tag: 'b1',
          children: [{ tag: 'c' }],
        },
        {
          tag: 'b2',
          children: [{ tag: 'c' }],
        },
      ],
    }
    const result = xmlStringify(xml)
    expect(result).to.equal('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n<a xmlns="http://a" xmlns:c="http://c" x="1"><b1><c/></b1><b2><c/></b2></a>')
  })

  it('should stringify group', () => {
    const xml: XmlGroup = {
      type: 'group',
      children: [
        {
          tag: 'b1',
          children: [{ tag: 'c' }],
        },
        {
          tag: 'b2',
          children: [{ tag: 'c' }],
        },
      ],
    }
    const result = xmlStringify(xml)
    expect(result).to.equal('<b1><c/></b1><b2><c/></b2>')
  })

  it('should stringify component', () => {
    class Xml extends XmlComponent {
      xmlComponent () {
        return {
          tag: 'a',
          children: [
            {
              tag: 'b1',
              children: [{ tag: 'c' }],
            },
            {
              tag: 'b2',
              children: [{ tag: 'c' }],
            },
          ],
        }
      }
    }

    const xml = new Xml()
    const result = xml.xml()
    expect(result).to.equal('<a><b1><c/></b1><b2><c/></b2></a>')
  })
})
