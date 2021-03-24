import { ActionTree } from 'vuex';
import { RequestState, RequestModel } from './types';
import { RootState } from '../../types';
import { BASE_URL,  REQUESTURL, ADDREQUESTURL, EDITREQUESTURL, CAMUNDABASEURL, CAMUNDABPMNDEF } from '@/config/urlList';
import axios from '@/lib/axios';

/**
 * request Actions
 *
 */
export const actions: ActionTree<RequestState, RootState> = {
  /**
   * @param  {} {commit, dispatch}
   * @param  {} request  list
   */
  addRequest({ commit, dispatch }, data) {
    commit('SET_LOADING', true);
    axios
      .post(BASE_URL + ADDREQUESTURL, data)
      .then(_ => {
        commit('SET_LOADING', false);
        commit('SET_REQUEST_SUCCESSFULLY', true);
        commit('SET_REQUEST_ERROR', false);
        dispatch('loadRequest');
      })
      .catch(() => {
        commit('SET_REQUEST_ERROR', true);
      });
  },

  startWorkFlow({ commit, dispatch}, data) {
    commit('SET_LOADING', true);
    // console.log('camundaurl'+ CAMUNDABASEURL);
    axios.post(`${CAMUNDABASEURL}/process-definition/key/${CAMUNDABPMNDEF}/start`, data)
    .then(_ => {
      commit('SET_LOADING', false);
      commit('SET_WF_SUCCESSFULLY', true);
      commit('SET_REQUEST_ERROR', false);
    })
    .catch(() => {
      commit('SET_REQUEST_ERROR', true);
    });
  },

  /**
   * load request from server and set to store
   * @param {*} { commit }
   */
  loadRequestWF({ commit }, txnID) {
    commit('SET_LOADING', true);
    const path = `${CAMUNDABASEURL}/task?processVariables=transactionID_eq_${txnID}`;
    // console.log(path);
    axios
      .get(path)
      .then((r: any) => r.data)
      .then((data: any) => {
        // console.log('taskID: ' + data[0].id);
        sessionStorage.setItem('taskid', data[0].id);
        commit('SET_TASKID_SUCCESSFULLY', data[0].id);
        commit('SET_LOADING', false);
      });
  },

  /**
   * load request from server and set to store
   * @param {*} { commit }
   */
  getWFProcessDefinitionId({ commit }) {
    commit('SET_LOADING', true);
    const path = `${CAMUNDABASEURL}/process-definition/key/${CAMUNDABPMNDEF}`;
    axios
      .get(path)
      .then((r: any) => r.data)
      .then((data: any) => {
        commit('SET_PROCESSDEFINITIONID', data.id);
        commit('SET_LOADING', false);
      });
  },

  /**
   * load request from server and set to store
   * @param {*} { commit }
   */
  getWFXML({ commit }, id) {
    commit('SET_LOADING', true);
    const path = `${CAMUNDABASEURL}/process-definition/${id}/xml`;
    // console.log(path);
    axios
      .get(path)
      .then((r: any) => r.data)
      .then((data: any) => {
        // console.log('XML: ' + data.bpmn20Xml);
        commit('SET_WFXML', data.bpmn20Xml);
        commit('SET_LOADING', false);
      });
  },

  approveRequestWF({ commit }, data) {
    commit('SET_LOADING', true);
    const obj = JSON.parse(data);
    const path = `${CAMUNDABASEURL}/task/${obj.json.transactionID}/complete`;
    // console.log(path);
    // console.log(JSON.stringify(obj.json.payload));
    axios.post(path, JSON.stringify(obj.json.payload))
    .then(_ => {
      commit('SET_LOADING', false);
      commit('SET_STATUS_UPDATE', true);
      commit('SET_REQUEST_ERROR', false);
    })
    .catch(() => {
      commit('SET_REQUEST_ERROR', true);
    });
  },

  updateRequest({ commit, dispatch }, data) {
    commit('SET_LOADING', true);
    commit('SET_REQUEST', data);
    const editRequestURL = EDITREQUESTURL.replace('<requestid>', data.requestid);
    axios
      .put(BASE_URL + editRequestURL, data)
      .then(_ => {
        commit('SET_LOADING', false);
        commit('SET_REQUEST_SUCCESSFULLY', true);
        commit('SET_REQUEST_ERROR', false);
        dispatch('loadRequest');
      })
      .catch(() => {
        commit('SET_REQUEST_ERROR', true);
      });
  },

  deleteRequest({ commit, dispatch }, data) {
    commit('SET_LOADING', true);
    commit('SET_REQUEST', data);
    const deleteRequestURL = EDITREQUESTURL.replace('<requestid>', data.requestid);
    axios
      .delete(BASE_URL + deleteRequestURL)
      .then(_ => {
        commit('SET_LOADING', false);
        commit('SET_REQUEST_SUCCESSFULLY', true);
        commit('SET_REQUEST_ERROR', false);
        dispatch('loadRequest');
      })
      .catch(() => {
        commit('SET_REQUEST_ERROR', true);
      });
  },

  /**
   * load request from server and set to store
   * @param {*} { commit }
   */
  loadRequest({ commit }) {
    commit('SET_LOADING', true);
    axios
      .get(BASE_URL + REQUESTURL)
      .then((r: any) => r.data)
      .then((data: RequestModel[]) => {
        commit('SET_REQUESTHEADER', [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'requestid',
          },
          { text: 'Name', value: 'name' },
          { text: 'Description', value: 'description' },
          { text: 'Status', value: 'status' },
          { text: 'Created By', value: 'createdby' },
        ]);
        commit('SET_REQUESTLIST', data);
        commit('SET_LOADING', false);
      });
  },
  /**
   * clear message
   * @param {*} { commit }
   */
  clearStatus({ commit }) {
    commit('SET_REQUEST_SUCCESSFULLY', false);
    commit('SET_REQUEST_ERROR', false);
  },
};
