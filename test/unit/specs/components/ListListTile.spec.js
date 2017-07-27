import { mockStore, mockRouter, mount } from 'vuenit'
import ListListTile from '@/components/ListListTile'

describe('ListListTile.vue', function () {
  let vm

  beforeEach(function () {
    const $store = mockStore({})
    const $router = mockRouter('/lists')
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
})
