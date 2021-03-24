import { MutationTree } from 'vuex';
import { RequestState } from './types';

/**
 * mutation
 */
export const mutations: MutationTree<RequestState> = {
  /**
   * Sets loading
   * @param {*} state
   * @param {boolean} flag - loading
   */

  SET_LOADING(state, flag: boolean) {
    state.loading = flag;
  },

  /**
   * Sets requestHeader
   * @param {*} state
   * @param payload header list
   */

  SET_REQUESTHEADER(state, payload: any) {
    state.requestHeaders = payload;
  },

  /**
   * Sets request
   * @param {*} state
   * @param payload request
   */

  SET_REQUEST(state, payload: any) {
      state.request = payload;
    },

  /**
   * Sets request
   * @param {*} state
   * @param payload request list
   */

  SET_REQUESTLIST(state, payload: any) {
    state.requestList = payload;
  },

  /**
   * set stae on success
   * @param {*} state
   * @param {*} payload
   */
  SET_REQUEST_SUCCESSFULLY(state, payload: any) {
    state.successStatus = payload;
  },

  /**
   * set stae on success
   * @param {*} state
   * @param {*} payload
   */
  SET_WF_SUCCESSFULLY(state, payload: any) {
    state.successWFStatus = payload;
  },

  /**
   * set stae on success
   * @param {*} state
   * @param {*} payload
   */
  SET_TASKID_SUCCESSFULLY(state, payload: any) {
      state.taskid = payload;
  },
  /**
   * set stae on error
   * @param {*} state
   * @param {*} payload
   */
  SET_REQUEST_ERROR(state, payload: any) {
    state.errorStatus = payload;
  },
  /**
   * set stae on error
   * @param {*} state
   * @param {*} payload
   */
  SET_STATUS_UPDATE(state, payload: any) {
      state.statusUpdated = payload;
  },

  SET_PROCESSDEFINITIONID(state, payload: any) {
    state.processdefinitionid = payload;
  },

  SET_WFXML(state, payload: any) {
    state.wfXML = payload;
  }
};
