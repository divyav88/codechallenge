/**
 * Request test
 */
 import { shallowMount, createLocalVue } from '@vue/test-utils';
 import ManageRequest from '@/components/Request/ManageRequest.vue';
 import Vuex from 'vuex';
 import vuetify from 'vuetify';
 describe('component/Request/ManageRequest.vue', () => {
   let wrapper: any;
   beforeEach(() => {
     const localVue = createLocalVue();
     localVue.use(Vuex);
     localVue.use(vuetify);
     const store = new Vuex.Store({
       modules: {
        RequestModule: {
           namespaced: true,
           state: {},
           getters: { successStatus: jest.fn(), errorStatus: jest.fn(), getTaskId: jest.fn()},
           actions: {},
         },
       },
     });
     wrapper = shallowMount(ManageRequest, {
       localVue,
       store,
     });
   });
   it('renders props when passed', () => {
     expect(wrapper.element).toMatchSnapshot();
   });
 });
