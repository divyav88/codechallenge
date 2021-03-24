import { ActionTree } from 'vuex';
import { KeyCloakState } from './types';
import { RootState } from '../../types';
import KeycloakService from '@/lib/keyCloak';
import axios from '@/lib/axios';
import router from '@/router';

const BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:6402/';

const ENDURL = 'users';
/**
 * Keycload Actions
 *
 */
export const actions: ActionTree<KeyCloakState, RootState> = {
  setLogin({ commit }: any, login: any) {
    commit('SET_LOGIN', login);
  },

  /**
   * setKeyCloakAuth when token provide
   * @param {*} { commit }
   * @param {*} keycloak
   */
  setKeyCloakAuth({ commit }: any, keycloak: any) {
    const token = keycloak.token || false;
    if (token) {
      commit('SET_LOGIN', true);
      commit('SET_KEY_AUTH', keycloak);
      commit('SET_TOKEN');
      sessionStorage.setItem('keycloak_token', token);
      sessionStorage.setItem('user-roles', KeycloakService.userRoles());
      // axios.post(`${BASE_URL}${ENDURL}`).then(_ => {
      //   // commit('SET_BOOKS', _.data);
      //   // router.push({ path: '/list-contact' });
      // });
    }
  },

  /**
   * setLogout remove token when user logout
   * @param {*} { commit }
   */
  setLogout({ commit }: any) {
    commit('SET_LOGOUT', false);
    sessionStorage.removeItem('keycloak_token');
    KeycloakService.logout();
  },
  /**
   * setUserProfile
   * @param {*} { commit }
   * @param {*} keycloak
   */
  setUserProfile({ commit }: any, profile: any) {
    commit('SET_USER_PROFILE', profile);
  },
  /**
   * setKeyCloakAuth when token provide
   * @param {*} { commit }
   * @param {*} keycloak
   */
  setUserRole({ commit }: any, userRole: string[]) {
    let isAdmin = false;
    let isUser = false;
    if (userRole && userRole.length > 0) {
      const isApprover = userRole.indexOf('approver_role');
      if (isApprover > -1) {
        isAdmin = true;
      } else {
        const isUserRole = userRole.indexOf('user_role');
        if (isUserRole > 0) {
          isUser = true;
        }
      }
    }
    commit('SET_USER_ROLES', { isAdmin, isUser });
    commit('SET_TOKEN');
  },

  /**
   * setAuth when token provide
   * @param {*} { commit }
   * @param {*} keycloak
   */
  checkAndSetAuth(state: any, { next, path }) {
    const token = sessionStorage.getItem('keycloak_token');
    if (token) {
      KeycloakService.init(next, path);
    }
  },

  /**
   * setAuth when token provide
   * @param {*} { commit }
   * @param {*} keycloak
   */
  userRedirect(store: any, path) {
    // if (path === '/login') {
    //   if (store.state.isUser) {
    //     router.push({ path: '/' });
    //   } else if (store.state.isAdmin) {
    //     router.push({ path: '/author' });
    //   }
    // }
    router.push({ path: '/requests' });
  },
};
