import { GetterTree } from 'vuex';
import { ProfileState } from './types';
import { RootState } from '../../types';

/**
 * Getters
 */
export const getters: GetterTree<ProfileState, RootState> = {
  /**
   * userProfile
   * @param {*} state
   * @returns  {object} authors
   */
  userProfile(state) {
    return state.currentUser;
  },
  /**
   * successStatus
   * @param {*} state
   * @returns  {object} authors
   */
  successStatus(state) {
    return state.successStatus;
  },
  /**
   * errorStatus
   * @param {*} state
   * @returns  {object} authors
   */
  errorStatus(state) {
    return state.errorStatus;
  },
};
