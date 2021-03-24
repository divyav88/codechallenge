import { shallowMount, createLocalVue } from '@vue/test-utils';
import Profile from '@/views/Profile.vue';
import Vuex from 'vuex';
import vuetify from 'vuetify';

describe('Profile.vue', () => {
  let wrapper: any;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(vuetify);

    wrapper = shallowMount(Profile, {
      localVue,
    });
  });
  it('renders without crashing', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
