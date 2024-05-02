import { StoreProvider } from './store/storeProvider';
import { StoreContext, useStore } from './store/storeContext';
import { fetchFromApi } from './store/fetch';
import { postToApi } from './store/post';

import { paginate } from './utils/paginate';
import { fuzzySearch } from './utils/search';
import { reOrder } from './utils/sorting';
import { classNames, sleep } from './utils/utils';

export { StoreContext, StoreProvider };
export { useStore, fetchFromApi, postToApi };

export { classNames, sleep };
export { paginate, fuzzySearch, reOrder };


export const apiUrl = 'http://4.237.58.241:3000';

