import { expect } from 'chai'
import {
  toAngle,
  toColorPct,
  toEmu,
  toFixedAngle,
  toFixedPct,
  toHpt,
  toOffsetColorPct,
  toPct,
  toPositiveFixedAngle,
  toPositiveFixedPct,
  toPositivePct,
  uuid,
} from './utils'

describe('handle unit', () => {
  describe('to emu', () => {
    it('should return undefined', () => {
      expect(toEmu()).to.undefined
      expect(toEmu(null)).to.undefined
      expect(toEmu(undefined, 'pt')).to.undefined
      expect(toEmu(null, 'pt')).to.undefined
    })
    it('should from pt', () => {
      expect(toEmu(10)).to.equal(127000)
    })
    it('should from inch', () => {
      expect(toEmu(10, 'in')).to.equal(9144000)
    })
    it('should from cm', () => {
      expect(toEmu(10, 'cm')).to.equal(360000)
    })
    it('should from mm', () => {
      expect(toEmu(10, 'mm')).to.equal(36000)
    })
    it('should from hpt', () => {
      expect(toEmu(10, 'hpt')).to.equal(1270)
    })
    it('should from emu', () => {
      expect(toEmu(10, 'emu')).to.equal(10)
    })
  })
  describe('to emu from string', () => {
    it('should from pt', () => {
      expect(toEmu('10pt')).to.equal(127000)
    })
    it('should from inch', () => {
      expect(toEmu('10in')).to.equal(9144000)
    })
    it('should from cm', () => {
      expect(toEmu('10cm')).to.equal(360000)
    })
    it('should from mm', () => {
      expect(toEmu('10mm')).to.equal(36000)
    })
    it('should from hpt', () => {
      expect(toEmu('10hpt')).to.equal(1270)
    })
    it('should from emu', () => {
      expect(toEmu('10emu')).to.equal(10)
    })
  })
  describe('to hpt', () => {
    it('should return undefined', () => {
      expect(toHpt()).to.undefined
      expect(toHpt(null)).to.undefined
      expect(toHpt(undefined, 'pt')).to.undefined
      expect(toHpt(null, 'pt')).to.undefined
    })
    it('should from pt', () => {
      expect(toHpt(10)).to.equal(1000)
    })
    it('should from inch', () => {
      expect(toHpt(10, 'in')).to.equal(72000)
    })
    it('should from cm', () => {
      expect(toHpt(127, 'cm')).to.equal(36000)
    })
    it('should from mm', () => {
      expect(toHpt(127, 'mm')).to.equal(3600)
    })
    it('should from hpt', () => {
      expect(toHpt(10, 'hpt')).to.equal(10)
    })
    it('should from emu', () => {
      expect(toHpt(127, 'emu')).to.equal(1)
    })
  })
  describe('to hpt from string', () => {
    it('should from pt', () => {
      expect(toHpt('10pt')).to.equal(1000)
    })
    it('should from inch', () => {
      expect(toHpt('10in')).to.equal(72000)
    })
    it('should from cm', () => {
      expect(toHpt('127cm')).to.equal(36000)
    })
    it('should from mm', () => {
      expect(toHpt('127mm')).to.equal(3600)
    })
    it('should from hpt', () => {
      expect(toHpt('10hpt')).to.equal(10)
    })
    it('should from emu', () => {
      expect(toHpt('127emu')).to.equal(1)
    })
  })
})

describe('handle percentage', () => {
  it('should return undefined', () => {
    expect(toPct()).to.undefined
    expect(toPct(undefined)).to.undefined
    expect(toPct(null)).to.undefined
    expect(toPct(NaN)).to.undefined
  })
  it('should to percentage', () => {
    expect(toPct(1)).to.equal(1000)
  })
  it('should to fixed percentage', () => {
    expect(toFixedPct(1)).to.equal(1000)
    expect(toFixedPct(-10)).to.equal(-10000)
    expect(() => toFixedPct(-101)).to.throw('<=-100% and >=100%')
    expect(() => toFixedPct(101)).to.throw('<=-100% and >=100%')
  })
  it('should to positive percentage', () => {
    expect(toPositivePct(1)).to.equal(1000)
    expect(toPositivePct(101)).to.equal(101000)
    expect(() => toPositivePct(-1)).to.throw('>=0%')
  })
  it('should to positive fixed percentage', () => {
    expect(toPositiveFixedPct(1)).to.equal(1000)
    expect(() => toPositiveFixedPct(101)).to.throw('>=0% and <=100%')
    expect(() => toPositiveFixedPct(-1)).to.throw('>=0% and <=100%')
  })
})

describe('handle color percentage', () => {
  it('should to offset color', () => {
    expect(toOffsetColorPct(255)).to.equal(100000)
    expect(() => toOffsetColorPct(256)).to.throw('>=-255 and <=255')
    expect(() => toOffsetColorPct(-256)).to.throw('>=-255 and <=255')
  })
  it('should to color', () => {
    expect(toColorPct(255)).to.equal(100000)
    expect(() => toColorPct(256)).to.throw('>=0 and <=255')
    expect(() => toColorPct(-1)).to.throw('>=0 and <=255')
  })
})

describe('handle angle', () => {
  it('should return undefined', () => {
    expect(toAngle()).to.undefined
    expect(toAngle(undefined)).to.undefined
    expect(toAngle(null)).to.undefined
    expect(toAngle(NaN)).to.undefined
  })
  it('should to angle', () => {
    expect(toAngle(1)).to.equal(60000)
  })
  it('should to fixed angle', () => {
    expect(toFixedAngle(1)).to.equal(60000)
    expect(toFixedAngle(-90)).to.equal(-5400000)
    expect(toFixedAngle(90)).to.equal(5400000)
    expect(() => toFixedAngle(91)).to.throw('>=-90 and <=90')
    expect(() => toFixedAngle(-91)).to.throw('>=-90 and <=90')
  })
  it('should to positive fixed angle', () => {
    expect(toPositiveFixedAngle(1)).to.equal(60000)
    expect(toPositiveFixedAngle(360)).to.equal(21600000)
    expect(() => toPositiveFixedAngle(-1)).to.throw('>=0 and <=360')
    expect(() => toPositiveFixedAngle(361)).to.throw('>=0 and <=360')
  })
})

describe('uuid', () => {
  it('uuid', () => {
    expect(uuid()).to.match(/[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}/)
  })
})
