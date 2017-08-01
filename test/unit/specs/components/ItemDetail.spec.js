import { mockStore, mockRouter, mount } from 'vuenit'
import ItemDetails from '@/components/ItemDetails'

const injector = {
  install (Vue) {
    Vue.mixin({
      created () {
        this.$firebaseRefs = {
          item: {
            update: sinon.spy()
          }
        }
      }
    })
    Vue.prototype.$bindAsObject = sinon.spy()
  }
}

describe('ItemDetails.vue', function () {
  let vm

  beforeEach(function () {
    const $store = mockStore()
    const users = [ { name: 'test_user', uid: 'test_uid' } ]
    const { $router, $route } = mockRouter({
      routes: ['/items/:itemId'],
      route: '/items/test_key'
    })
    const options = {
      inject: {
        $store,
        $router,
        $route
      },
      install (Vue, inj) {
        Vue.use(injector)
        inj.service('UserService', () => {
          return {
            getUsers: sinon.stub().returns({ then (cb) { cb(users) } })
          }
        })
      },
      props: {
        itemId: 'test_key'
      },
      stubComponents: true
    }

    vm = mount(ItemDetails, options)

    vm.item = { name: 'test_item', '.key': 'test_key', assignedTo: 'test_uid', aproximateDuration: 8 }
  })

  it('should have the correct item ID', function () {
    expect(vm.itemId).to.equal('test_key')
    expect(vm.$bindAsObject).to.have.been.called
    expect(vm.UserService.getUsers).to.have.been.called
  })

  it('should have the correct assigned user', function () {
    expect(vm.item.assignedTo).to.equal('test_uid')
  })

  it('should save the item', function () {
    vm.saveItem()
    expect(vm.$firebaseRefs.item.update).to.have.been.called
  })
})
