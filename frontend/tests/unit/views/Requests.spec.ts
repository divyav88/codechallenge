import { shallowMount, createLocalVue } from '@vue/test-utils';
import RequestsComponent from '@/views/RequestsComponent.vue';
import Vuex from 'vuex';
import vuetify from 'vuetify';

describe('RequestsComponent.vue', () => {
  let wrapper: any;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(vuetify);

    const store = new Vuex.Store({
      modules: {
        RequestsModule: {
          state: { requestList: [] },
          getters: {
            getRequestList: jest.fn(),
          },
        },
      },
    });
    wrapper = shallowMount(RequestsComponent, {
      localVue,
      store,
    });
  });
  it('renders without crashing', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
