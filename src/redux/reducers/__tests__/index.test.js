import rootReducer from '..';
import { createStore } from 'redux';

describe('Root Reducers', () => {

  let store = createStore(rootReducer);

  test('user reducer', () => {
    expect(store.getState().user).toEqual({
        users: []
    },);
  });
});