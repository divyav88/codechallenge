import { ActionTree } from 'vuex';
import { ProfileState, ProfileModel } from './types';
import { RootState } from '../../types';
import axios from '@/lib/axios';
import { BASE_URL } from '@/config/urlList';

/**
 * profile
 *
 */
export const actions: ActionTree<ProfileState, RootState> = {
  /**
   * load users from server and set to store
   * @param {*} { commit }
   */
  // loadUserProfile({ commit }) {
  //   commit('SET_LOADING', true);
  //   axios
  //     .get(`${BASE_URL}${PROFILE_URL}`)
  //     .then(r => r.data)
  //     .then(users => {
  //       commit('SET_USERS_PROFILE', users);
  //       commit('SET_LOADING', false);
  //     });
  // },
  /**
   * clear all alerts
   * @param {*} { commit }
   */
  clearAlert({ commit }) {
    commit('SET_LOADING', false);
    commit('SET_PROFILE_SUCCESSFULLY', false);
    commit('SET_PROFILE_ERROR', false);
  },
};
