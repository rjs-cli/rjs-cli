import { fsUtil } from '../FsUtil';
import { Terminal } from '../Terminal';

export class Store {
  create = async () => {
    await fsUtil.createDirIfNotExists('store');
    Terminal.navigateTo(['store']);
    await fsUtil.createDirIfNotExists('actions');
    await fsUtil.createDirIfNotExists('middlewares');
    await fsUtil.createDirIfNotExists('reducers');
    await fsUtil.createDirIfNotExists('selectors');
  };
}

export const store = new Store();
