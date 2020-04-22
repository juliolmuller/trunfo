import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import vuetify from 'vuetify'
import CenteredPanel from '@/components/centered-panel.vue'

describe('centered-panel.vue', () => {
  let wrapper
  const title = 'new title'
  beforeEach(() => {
    Vue.use(vuetify)
    wrapper = shallowMount(CenteredPanel, {
      propsData: { title },
    })
  })
  it('renders props.title when passed', () => {
    expect(wrapper.text()).toMatch(title)
  })
})
