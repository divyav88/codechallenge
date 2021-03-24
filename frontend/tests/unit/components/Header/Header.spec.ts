import { shallowMount, createLocalVue } from '@vue/test-utils';
import Header from '@/components/Header/Header.vue';
import Vuex from 'vuex';
import vuetify from 'vuetify';

describe('Header.vue', () => {
  let wrapper: any;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(vuetify);
    localVue.use(Vuex);
    const store = new Vuex.Store({
      modules: {
        KeyCloakModule: {
          namespaced: true,
          state: { isLoggedin: false },
          getters: {
            userProfile: jest.fn(),
            isLoggedin: jest.fn(),
          },
        },
      },
    });
    wrapper = shallowMount(Header, {
      localVue,
      store,
    });
  });

  it('renders props when passed', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
