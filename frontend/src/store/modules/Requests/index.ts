import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { RequestState } from './types';
import { RootState } from '../../types';

/**
 * request state
 */
export const state: RequestState = {
  requestHeaders: [],
  request: {
    name: '',
    description: '',
    requestid: '',
    status: '',
    createdby: '',
    created_at: '',
    updated_at: '',
    updated: '',
    transactionid: '',
  },
  requestList: [],
  loading: false,
  successStatus: false,
  successWFStatus: false,
  errorStatus: false,
  taskid: '',
  statusUpdated: false,
  processdefinitionid: '',
  wfXML: '',
};

const namespaced: boolean = true;

const RequestModule: Module<RequestState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default RequestModule;
