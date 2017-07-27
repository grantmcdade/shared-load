import Vue from 'vue'
import snackbar from '@/scripts/snackbar'
import { messageBus } from '@/scripts/message-bus'

describe('Snackbar', () => {
  const msg = {
    type: 'test_type',
    text: 'test_text'
  }

  let vm
  beforeEach(function () {
    Vue.config.silent = true
    vm = new Vue({
      mixins: [snackbar]
    }).$mount(document.createElement('div'))
  })

  it('should show a message when addMessage is called', function () {
    vm.addMessage(msg)
    expect(vm.snackbar).to.equal(true)
    expect(vm.snackbarType).to.equal('test_type')
    expect(vm.snackbarText).to.equal('test_text')
  })

  it('should add a message when it arrives on the bus', function () {
    messageBus.$emit('addMessage', msg)
    expect(vm.snackbar).to.equal(true)
    expect(vm.snackbarType).to.equal('test_type')
    expect(vm.snackbarText).to.equal('test_text')
  })
})
