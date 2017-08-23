import {
  normalizeToBreak,
  normalizeToCamel
} from '../src/helper.js'
import {expect} from 'chai'

describe('Helper: ', function () {
  let camelString = 'aAaAAA'
  let breakString = 'a-aa-a-a-a'

  it('normalizeToBreak', function () {
    expect(normalizeToBreak(camelString)).to.be.equal(breakString)
  })

  it('normalizeToCamel', function () {
    expect(normalizeToCamel(breakString)).to.be.equal(camelString)
  })
});
