import index from '../src/index.js'
import {expect} from 'chai'

describe('Hello', function () {
  it('First assert', function () {
    expect(index).to.equal('Hello rDOM');
  });
});