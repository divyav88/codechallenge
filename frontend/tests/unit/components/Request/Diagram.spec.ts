/**
 * Request test
 */
 import { shallowMount, createLocalVue } from '@vue/test-utils';
 import Diagram from '@/components/Request/Diagram.vue';
 import Vuex from 'vuex';
 import vuetify from 'vuetify';
 describe('component/Request/Diagram.vue', () => {
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
           getters: {},
           actions: {},
         },
       },
     });
     wrapper = shallowMount(Diagram, {
       localVue,
       store,
     });
   });
   it('renders props when passed', () => {
     expect(wrapper.element).toMatchSnapshot();
   });
 });
