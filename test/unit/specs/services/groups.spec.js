import firebase from 'firebase'
import Service from '@/services/groups'

describe('Groups Service', function () {
  const group = {
    name: 'test_group'
  }
  it('should create the group', function () {
    const refMock = { push() { return { key: 'test_key' } } }
    const dbMock = { ref() { return refMock } }
    const fbs = sinon.stub(firebase, 'database')
    const refs = sinon.stub(dbMock, 'ref')

    fbs.returns(dbMock)
    refs.returns(refMock)

    const groupId = new Service().create({ uid: 'test_uid', groupName: group.name })

    expect(groupId).to.equal('test_key')
    expect(fbs).to.have.been.called
    expect(refs).to.have.been.called
    expect(refs).to.have.been.calledWith('/users/test_uid/my_groups')
    expect(refs).to.have.been.calledWith('/group_users/test_key')
    expect(refs).to.have.been.calledWith('/users/test_uid/group_memberships')
  })

  it('should throw when no group name is provided', function () {
    (function () {
       new Service().create({ uid: 'test_uid', groupName: '' })
      }).should.throw()
  })
})
