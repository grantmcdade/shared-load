import { mockStore, mockRouter, mount } from 'vuenit'
import ListListTile from '@/components/ListListTile'

describe('ListListTile.vue', function () {
  let vm

  beforeEach(function () {
    const $store = mockStore({
      state: {
        _selectedList: null
      },
      mutations: {
        SET_SELECTED_LIST: (state, value) => {
          state._selectedList = value
        }
      }
    })
    const { $router } = mockRouter('/lists')
    const options = {
      inject: {
        $store,
        $router
      },
      props: {
        list: {
          '.key': 'test_key',
          name: 'test_name'
        }
      },
      stubComponents: true
    }

    vm = mount(ListListTile, options)
  })

  it('should show the list item', function () {
    const item = vm.$el.querySelector('v-list-tile-title')
    expect(item.textContent).to.equal('test_name')
  })

  it('should navigate to the list details view', function (done) {
    const item = vm.$el.querySelector('v-list-tile-action:first-child')
    item.click()
    vm.$nextTick(() => {
      expect(vm.$route.path).to.equal('/lists/test_key')
      done()
    })
  })

  it('should have one action', function () {
    const items = vm.$el.querySelectorAll('v-list-tile-action > v-btn')
    expect(items.length).to.equal(1)
  })

  it('should raise the deleteList event', function (done) {
    const deleteList = sinon.spy()
    vm.$on('deleteList', deleteList)
    const item = vm.$el.querySelector('v-list-tile-action > v-btn')
    item.click()
    vm.$nextTick(() => {
      expect(deleteList).to.have.been.called
      done()
    })
  })
})
