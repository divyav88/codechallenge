import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import vuetify from 'vuetify';
import Router from 'vue-router';

Vue.use(vuetify);
Vue.use(Router);
describe('App.vue', () => {
  it('renders without crashing', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.element).toMatchSnapshot();
  });
});
