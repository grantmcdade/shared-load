import { mockStore, mockRouter, mount } from 'vuenit'
import App from '@/App'

describe('App.vue', () => {
  const createModel = () => {
    const $store = mockStore({
      state: {
        uid: ''
      },
      getters: {
        uid: state => state.uid
      }
    })
    const { $router } = mockRouter('/groups')
    const options = {
      inject: {
        $store,
        $router
      },
      stubComponents: true
    }
    return mount(App, options)
  }

  let vm = null

  beforeEach(function () {
    vm = createModel()
  })

  it('should render correct contents', function () {
    expect(vm.$el.querySelector('v-toolbar-title').textContent)
      .to.equal('Shared Load')
  })

  it('should redirect to "/" when the title it clicked', function () {
    const title = vm.$el.querySelector('v-app > v-toolbar > v-toolbar-title')
    title.click()
    expect(vm.$route.path).to.be.equal('/')
  })
})
