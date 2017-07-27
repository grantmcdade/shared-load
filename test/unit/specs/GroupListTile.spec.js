import {
  mockStore,
  mockRouter,
  mount
} from 'vuenit'
import GroupListTile from '@/components/GroupListTile'

describe('GroupListTile.vue', function () {
  let vm = null

  beforeEach(function () {
    const $store = mockStore({})
    const {
      $router
    } = mockRouter({
      path: '/group'
    })
    const options = {
      inject: {
        $store,
        $router
      },
      props: {
        group: {
          '.key': 'test_key',
          name: 'test_name'
        },
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
    vm = mount(GroupListTile, options)
  })

  it('should render the one group', function () {
    const items = vm.$el.querySelectorAll('v-list-tile-title')
    expect(items.length).to.equal(1)
    expect(items[0].textContent).to.equal('test_name')
  })

  it('should render the actions', function () {
    const items = vm.$el.querySelectorAll('v-list-tile-action')
    expect(items.length).to.equal(8)
    expect(items[5].querySelector('v-icon').textContent).to.equal('mode_edit')
  })

  it('should raise the doAction event when the delete action is clicked', function (done) {
    const items = vm.$el.querySelectorAll('v-list-tile-action v-btn')
    vm.$on('doAction', () => {
      done()
    })
    items[2].click()
  })

  const getActionButton = (name, location) => {
    if (location === 'menu') {
      return vm.$el.querySelector(`v-btn[data-menu-action=${name}]`)
    }
    return vm.$el.querySelector(`v-btn[data-action=${name}]`)
  }

  const runAction = (name, location, afterAction) => {
    try {
      const item = getActionButton(name, location)
      item.click()
      vm.$nextTick().then(() => afterAction())
    } catch (error) {
      console.log(error)
    }
  }

  it('should set the edit group when edit is clicked', function (done) {
    expect(vm.editGroup).to.equal('')
    runAction('edit', '', () => {
      expect(vm.editGroup).to.equal('test_key')
      done()
    })
  })

  it('should save the group when editing and the edit button is clicked', function (done) {
    let payload
    vm.$on('editName', pl => {
      payload = pl
    })
    expect(vm.editGroup).to.equal('')
    runAction('edit', '', () => {
      expect(vm.editGroup).to.equal('test_key')
      runAction('edit', '', () => {
        expect(payload).to.not.be.undefined
        expect(payload.name).to.equal('test_name')
        expect(payload['.key']).to.equal('test_key')
        done()
      })
    })
  })

  it('should navigate to group users when the Users button is clicked', function () {
    runAction('group_users', '', () => {
      expect(vm.$route.path).to.be('/group_users')
    })
  })

  it('should raise the doAction event when the delete button is clicked', function (done) {
    const doAction = sinon.spy()
    vm.$on('doAction', doAction)
    runAction('delete', '', () => {
      try {
        expect(doAction).calledOnce
        expect(doAction).calledWith({
          action: 'delete',
          key: 'test_key'
        })
      } catch (reason) {
        done(reason)
      }
      done()
    })
  })
})
