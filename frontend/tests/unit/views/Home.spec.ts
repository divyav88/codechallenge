import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('renders without crashing', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.element).toMatchSnapshot();
  });
});
