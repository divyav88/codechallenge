/**
 * Request test
 */
 import { shallowMount, createLocalVue } from '@vue/test-utils';
 import ShowWF from '@/components/Request/ShowWF.vue';
 import Vuex from 'vuex';
 import vuetify from 'vuetify';
 describe('component/Request/ShowWF.vue', () => {
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
           getters: { getProcessDefinitionId: jest.fn() },
           actions: { getWFProcessDefinitionId: jest.fn() },
         },
       },
     });
     wrapper = shallowMount(ShowWF, {
       localVue,
       store,
     });
   });
   it('renders props when passed', () => {
     expect(wrapper.element).toMatchSnapshot();
   });
 });
