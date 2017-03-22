import { contexts } from '../data/contexts.json';

const populateContext = initialContext => new Promise((resolve, reject) => {
  for (const property in initialContext) {
    const found = contexts.find(context => context[property] === initialContext[property]);
    if (found) {
      resolve(found);
      return;
    }
  }
  reject();
});

export default populateContext;
