/**
 * Request test
 */
 import { shallowMount, createLocalVue } from '@vue/test-utils';
 import DiagramComponent from '@/components/Request/DiagramComponent.vue';
 import Vuex from 'vuex';
 import vuetify from 'vuetify';
 describe('component/Request/DiagramComponent.vue', () => {
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
     wrapper = shallowMount(DiagramComponent, {
       localVue,
       store,
     });
   });
   it('renders props when passed', () => {
     expect(wrapper.element).toMatchSnapshot();
   });
 });
