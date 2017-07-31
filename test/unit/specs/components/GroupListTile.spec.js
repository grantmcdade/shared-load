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
    expect(items.length).to.equal(4)
    expect(items[1].querySelector('v-icon').textContent).to.equal('mode_edit')
  })

  it('should raise the doAction event when the delete action is clicked', function (done) {
    const items = vm.$el.querySelectorAll('v-list-tile-action v-btn')
    vm.$on('doAction', () => {
      done()
    })
    items[2].click()
  })

  const runAction = (name, afterAction, errorCallback) => {
    try {
      const item = vm.$el.querySelector(`v-btn[data-action=${name}]`)
      item.click()
      vm.$nextTick().then(() => afterAction()).catch(reason => {
        if (errorCallback) errorCallback(reason)
      })
    } catch (error) {
      console.log(error)
    }
  }

  it(`should set the edit group when edit is clicked`, function (done) {
    expect(vm.editGroup).to.equal('')
    runAction('edit', () => {
      expect(vm.editGroup).to.equal('test_key')
      done()
    })
  })

  it(`should save the group when editing and the edit button is clicked`, function (done) {
    let payload
    vm.$on('editName', pl => {
      payload = pl
    })
    expect(vm.editGroup).to.equal('')
    runAction('edit', () => {
      expect(vm.editGroup).to.equal('test_key')
      runAction('edit', () => {
        expect(payload).to.not.be.undefined
        expect(payload.name).to.equal('test_name')
        expect(payload['.key']).to.equal('test_key')
        done()
      })
    })
  })

  it(`should navigate to group users when the Users button is clicked`, function () {
    runAction('group_users', () => {
      expect(vm.$route.path).to.be('/group_users')
    })
  })

  it(`should raise the doAction event when the delete button is clicked`, function (done) {
    const doAction = sinon.spy()
    vm.$on('doAction', doAction)
    try {
      runAction('delete', () => {
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
    } catch (error) {
      done(error)
    }
  })

  it('should fire the "editName" event when the doActionInternal runs', function (done) {
    expect(vm.editGroup).to.equal('')
    runAction('edit', () => {
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
    }, done)
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
    runAction('edit', () => {
      const item = vm.$el.querySelector('v-list-tile-content')
      const selectGroup = sinon.spy()
      vm.$on('selectGroup', selectGroup)
      item.click()
      vm.$nextTick()
        .then(() => {
          expect(selectGroup).to.not.have.been.called
          done()
        })
        .catch(reason => done(reason))
    })
  })

  it('should call doActionInternal', function () {
    const doActionInternal = sinon.stub(vm, 'doActionInternal')
    vm.menuAction({ action: '', group: null })
    expect(doActionInternal).to.have.been.calledOnce
  })
})
