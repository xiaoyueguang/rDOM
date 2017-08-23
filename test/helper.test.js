import {
  normalizeToBreak,
  normalizeToCamel,
  generateUuid
} from '../src/helper.js'
import {expect} from 'chai'
import $ from '../src/index'

describe('Helper: ', function () {
  let camelString = 'aAaAAA'
  let breakString = 'a-aa-a-a-a'

  it('normalizeToBreak', function () {
    expect(normalizeToBreak(camelString)).to.be.equal(breakString)
  })

  it('normalizeToCamel', function () {
    expect(normalizeToCamel(breakString)).to.be.equal(camelString)
  })

  it('uuid', function () {
    expect($.rDOM.uuid).to.be.equal($.uuid)
  })

  it('generateUuid', function () {
    let i = 0
    const uuids = []
    // 测试 100k 次
    while(i < 100000) {
      uuids.push(generateUuid())
      i++
    }
    // 查看是否重复
    expect(uuids.length).to.be.equal(new Set(uuids).size)
  })
});
