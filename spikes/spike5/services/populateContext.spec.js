/* eslint-env mocha */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import subject from './populateContext.js';

chai.use(chaiAsPromised);
chai.should();

describe('Service: populateContext', () => {
  it('returns an error for an unknown context', () => {
    const initial = { number: '07771999999' };
    return subject(initial).should.be.rejected;
  });

  it('returns Alice for number 07771000001', () => {
    const initial = { number: '07771000001' };
    return subject(initial).then(context => {
      context.user.should.equal('Alice');
    });
  });

  it('returns Bob for number 07771000002', () => {
    const initial = { number: '07771000002' };
    return subject(initial).then(context => {
      context.user.should.equal('Bob');
    });
  });
});
