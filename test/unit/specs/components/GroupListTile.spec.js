import {
  mockStore,
  mockRouter,
  mount
} from 'vuenit'
import GroupListTile from '@/components/GroupListTile'

describe('GroupListTile.vue', function () {
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
      path: '/group'
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
    return mount(GroupListTile, options)
  }

  beforeEach(function () {
    vm = createModel()
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

  ['', 'menu'].forEach(location => {
    vm = createModel()
    it(`should set the edit group when edit is clicked (${location})`, function (done) {
      expect(vm.editGroup).to.equal('')
      runAction('edit', location, () => {
        expect(vm.editGroup).to.equal('test_key')
        done()
      })
    })

    vm = createModel()
    it(`should save the group when editing and the edit button is clicked (${location})`, function (done) {
      let payload
      vm.$on('editName', pl => {
        payload = pl
      })
      expect(vm.editGroup).to.equal('')
      runAction('edit', location, () => {
        expect(vm.editGroup).to.equal('test_key')
        runAction('edit', location, () => {
          expect(payload).to.not.be.undefined
          expect(payload.name).to.equal('test_name')
          expect(payload['.key']).to.equal('test_key')
          done()
        })
      })
    })

    vm = createModel()
    it(`should navigate to group users when the Users button is clicked (${location})`, function () {
      runAction('group_users', location, () => {
        expect(vm.$route.path).to.be('/group_users')
      })
    })

    vm = createModel()
    it(`should raise the doAction event when the delete button is clicked (${location})`, function (done) {
      const doAction = sinon.spy()
      vm.$on('doAction', doAction)
      runAction('delete', location, () => {
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

  it('should fire the "editName" event when the doActionInternal runs', function (done) {
    expect(vm.editGroup).to.equal('')
    runAction('edit', location, () => {
      try {
        const editName = sinon.spy()
        expect(vm.editGroup).to.equal('test_key')
        vm.$on('editName', editName)
        vm.doActionInternal('editName', group)
        vm.$nextTick()
          .then(() => {
            expect(editName).to.have.been.calledOnce
            done()
          })
          .catch(reason => done(reason))
      } catch (error) {
        done(error)
      }
    })
  })

  it('should run selectOrEdit when the list item is clicked', function (done) {
    const item = vm.$el.querySelector('v-list-tile-content')
    const selectGroup = sinon.spy()
    vm.$on('selectGroup', selectGroup)
    item.click()
    vm.$nextTick()
      .then(() => {
        expect(selectGroup).to.have.been.calledOnce
        expect(selectGroup).to.have.been.calledWith(group)
        done()
      })
  })

  it('should do nothing when editing and the list item is clicked', function (done) {
    runAction('edit', '', () => {
      const item = vm.$el.querySelector('v-list-tile-content')
      const selectGroup = sinon.spy()
      vm.$on('selectGroup', selectGroup)
      item.click()
      vm.$nextTick()
        .then(() => {
          expect(selectGroup).to.not.have.been.called
          done()
        })
    })
  })
})

