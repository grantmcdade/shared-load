import {
  mockStore,
  mockRouter,
  mount
} from 'vuenit'
import ActionMenu from '@/components/ActionMenu'

describe('ActionMenu.vue', function () {
  let vm = null
  const group = {
    '.key': 'test_key',
    name: 'test_name'
  }
  const createModel = () => {
    const $store = mockStore({})
    const {
      $router
    } = mockRouter({
      path: '/items'
    })
    const options = {
      inject: {
        $store,
        $router
      },
      props: {
        group,
        actions: [{
            title: 'Edit Group',
            icon: 'mode_edit',
            action: 'edit'
          },
          {
            title: 'Group Users',
            icon: 'people_outline',
            action: 'group_users'
          },
          {
            title: 'Delete Group',
            icon: 'delete',
            action: 'delete'
          }
        ]
      }

    }
    return mount(ActionMenu, options)
  }

  beforeEach(function () {
    vm = createModel()
  })

  it('should render the actions', function () {
    const items = vm.$el.querySelectorAll('v-list-tile-action')
    expect(items.length).to.equal(3)
    expect(items[0].querySelector('v-icon').textContent).to.equal('mode_edit')
  })

  const waitForNextTick = (model) => {
    return new Promise((resolve, reject) => {
      try {
        model.$nextTick(() => resolve(model))
      } catch (error) {
        reject(error)
      }
    })
  }

  it('should raise the doAction event for any action', function (done) {
    const item = vm.$el.querySelector('v-list-tile-action > v-btn')
    const doAction = sinon.spy()
    vm.$on('doAction', doAction)
    item.click()
    waitForNextTick(vm)
    .then(model => {
      expect(doAction).to.have.been.called
      done()
    })
    .catch(reason => done(reason))
  })
})
