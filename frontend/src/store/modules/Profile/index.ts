import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { ProfileState } from './types';
import { RootState } from '../../types';

/**
 * Profile state
 */
export const state: ProfileState = {
  currentUser: [],
  loading: false,
  successStatus: false,
  errorStatus: false,
};

const namespaced: boolean = true;

const ProfileModule: Module<ProfileState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default ProfileModule;
