import { actFetchStaffInfomation } from 'actions'
import { Component } from 'react'
import { connect } from 'react-redux'

export class AccountInfo extends Component {
  componentDidMount() {
    this.props.actFetchStaffInfomation()
  }

  render() {
    const { name } = this.props
    return (
      <div className='account_info'>
        <div className='account_info-avatar'>
          <img
            src={require('assets/images/icons/user.svg').default}
            alt='avatar'
          />
        </div>
        <p className='account_info-fullname'>{name}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { name: state._staffInfomation._data.name }
}

export default connect(mapStateToProps, { actFetchStaffInfomation })(
  AccountInfo
)
