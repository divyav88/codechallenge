import { GetterTree } from 'vuex';
import { RequestState } from './types';
import { RootState } from '../../types';

/**
 * Getters
 */
export const getters: GetterTree<RequestState, RootState> = {
  /**
   * request
   * @param {*} state
   * @returns  {object} request
   */
  getRequestHeaders(state) {
    return state.requestHeaders;
  },
  getRequestList(state) {
    return state.requestList;
  },
  successStatus(state) {
    return state.successStatus;
  },
  successWFStatus(state) {
    return state.successWFStatus;
  },
  errorStatus(state) {
    return state.errorStatus;
  },
  getTaskId(state) {
    return state.taskid;
  },
  getStatusUpdated(state) {
    return state.statusUpdated;
  },
  getProcessDefinitionId(state) {
    return state.processdefinitionid;
  },
  getWFXML(state) {
    return state.wfXML;
  }
};
