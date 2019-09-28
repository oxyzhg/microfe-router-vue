import types from '../mutation-types';
import { LOADING, SUCCESS, FAIL } from '../status';

const { APP_LOAD, APP_LOAD_SUCCESS, APP_LOAD_FAILURE, APP_ACTIVE } = types;

const state = {
  appMap: {},
  activeApp: null
};

const mutations = {
  [APP_LOAD](state, payload) {
    Object.assign(state.appMap, {
      [payload.name]: LOADING
    });
  },
  [APP_LOAD_SUCCESS](state, payload) {
    Object.assign(state.appMap, {
      [payload.name]: SUCCESS
    });
  },
  [APP_LOAD_FAILURE](state, payload) {
    Object.assign(state.appMap, {
      [payload.name]: FAIL
    });
  },
  [APP_ACTIVE](state, payload) {
    state.activeApp = payload.name;
  }
};

const actions = {};

export default {
  namespaces: true,
  state,
  mutations,
  actions
};
