import { shallowMount, createLocalVue } from '@vue/test-utils';
import Profile from '@/components/Profile/Profile.vue';

import Vuex from 'vuex';
import vuetify from 'vuetify';

describe('Profile.vue', () => {
  let wrapper: any;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(vuetify);
    const store = new Vuex.Store({
      modules: {
        ProfileModule: {
          namespaced: true,
          state: {},
          getters: {
            userProfile: jest.fn(),
            successStatus: jest.fn(),
            errorStatus: jest.fn(),
          },
          actions: {
            loadAuthor: jest.fn(),
          },
        },
      },
    });
    wrapper = shallowMount(Profile, {
      localVue,
      store,
    });
  });

  it('renders props when passed', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
