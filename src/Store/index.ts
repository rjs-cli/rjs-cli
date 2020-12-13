import { fsUtil } from '../FsUtil';
import { terminal } from '../Terminal';

export class Store {
  create = async () => {
    await fsUtil.checkAndCreateDir('store');
    terminal.navigateTo(['store']);
    await fsUtil.checkAndCreateDir('actions');
    await fsUtil.checkAndCreateDir('middlewares');
    await fsUtil.checkAndCreateDir('reducers');
  };
}

export const store = new Store();
