import store from '@/store'

describe('Store', () => {
  it('should set the uid', function () {
    store.commit('SET_UID', 'test_uid')
    expect(store.state._uid).to.equal('test_uid')
  })

  it('should set the email', function () {
    store.commit('SET_EMAIL', 'test_email')
    expect(store.state._email).to.equal('test_email')
  })

  it('should set the group', function () {
    store.commit('SET_SELECTED_GROUP', 'test_group')
    expect(store.state._selectedGroup).to.equal('test_group')
  })

  it('should set the list', function () {
    store.commit('SET_SELECTED_LIST', 'test_list')
    expect(store.state._selectedList).to.equal('test_list')
  })

  it('should clear the state', function () {
    store.state._uid = 'test_uid'
    store.state._email = 'test_email'
    store.commit('CLEAR_STATE')
    expect(store.state._uid).to.equal('')
    expect(store.state._email).to.equal('')
  })

  it('should have covered getters', function () {
    store.replaceState({
      _uid: 'test_uid',
      _email: 'test_email',
      _selectedGroup: 'test_group',
      _selectedList: 'test_list'
    })

    expect(store.getters.uid).to.equal('test_uid')
    expect(store.getters.email).to.equal('test_email')
    expect(store.getters.selectedGroup).to.equal('test_group')
    expect(store.getters.selectedList).to.equal('test_list')
  })
})
