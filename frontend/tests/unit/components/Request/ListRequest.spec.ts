/**
 * ListRequest test
 */
 import { shallowMount, createLocalVue } from '@vue/test-utils';
 import ListRequest from '@/components/Request/ListRequest.vue';
 import Vuex from 'vuex';
 import vuetify from 'vuetify';
 describe('component/Request/ListRequest.vue', () => {
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
           getters: {
             getRequestList: jest.fn(() => [
               {
                 name: 'request1 ',
                 requestid: 1,
                 description: 'description1',
                 status: 'submitted',
                 createdby: 'divya',
               },
             ]),
             successStatus: jest.fn(),
             errorStatus: jest.fn(),
             getRequestHeaders: jest.fn(() => [
                {
                  text: 'ID',
                  align: 'start',
                  sortable: false,
                  value: 'requestid',
                },
                { text: 'Name', value: 'name' },
                { text: 'Description', value: 'description' },
                { text: 'Status', value: 'status' },
                { text: 'Created By', value: 'createdby' },
              ])
           },
           actions: { loadRequest: jest.fn() },
         },
       },
     });
     wrapper = shallowMount(ListRequest, {
       localVue,
       store,
     });
   });
   it('renders props when passed', () => {
     expect(wrapper.element).toMatchSnapshot();
   });
 });
