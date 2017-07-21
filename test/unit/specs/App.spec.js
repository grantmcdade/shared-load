import App from '@/App'
import { mockStore, mockRouter, mount } from 'vuenit'

describe('App.vue', () => {
  it('should render correct contents', () => {
    const $store = mockStore({
      state: {
        uid: ''
      },
      getters: {
        uid: state => state.uid
      }
    })
    const { $router } = mockRouter()
    const options = {
      inject: {
        $store,
        $router
      },
      stubComponents: true
    }
    const vm = mount(App, options)
    expect(vm.$el.querySelector('v-toolbar-title').textContent)
      .to.equal('Shared Load')
  })
})
