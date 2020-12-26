import { expect } from 'chai'
import { xmlStringify } from './xml'

describe('xml', () => {
  describe('xml stringify', () => {
    it('should stringify string', () => {
      const xml = 'Hello World!'
      const result = xmlStringify(xml)
      expect(result).to.equal('Hello World!')
    })
  })
})
