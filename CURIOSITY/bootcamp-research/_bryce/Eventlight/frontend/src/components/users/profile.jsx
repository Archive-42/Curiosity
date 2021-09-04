import React from 'react'
import { connect } from 'react-redux'
import Avatar from './avatar'
import { updateUser } from '../../actions/user_actions'

const mstp = state => ({
  user: state.session.user
})

const mdtp = dispatch => ({
  updateUser: user => dispatch(updateUser(user))
})

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.beginEdit = this.beginEdit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.saveName = this.saveName.bind(this)
    this.handleScroll = this.handleScroll.bind(this)

    this.state = {
      mode: 'display',
      scroll_position: 0
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(e) {
    this.setState({
      scroll_position: document.documentElement.scrollTop
    })
  }

  beginEdit(name) {
    this.setState({
      mode: 'edit',
      edited_name: name
    })
  }

  handleNameChange(e) {
    this.setState({
      edited_name: e.target.value
    })
  }

  saveName() {
    const { user } = this.props
    const { edited_name } = this.state

    if (user.full_name !== edited_name && edited_name.length > 0) {
      const newuser = {
        ...user,
        full_name: edited_name
      }
      this.props.updateUser(newuser)
    }
    this.setState({
      mode: 'display'
    })
  }

  render() {
    const { user } = this.props
    const { mode, edited_name, scroll_position } = this.state

    const small = scroll_position >= 280

    const name_array = user.full_name.split(' ')
    const name = name_array
      .map((name, idx) => {
        if (idx === name_array.length - 1) return name.toUpperCase()
        return name
      })
      .join(' ')
    let num_tickets = user.registrations.length
    num_tickets = num_tickets + (num_tickets === 1 ? ' ticket' : ' tickets')
    let num_likes = user.liked_events.length
    num_likes = num_likes + (num_likes === 1 ? ' like' : ' likes')

    return (
      <div className={`profile ${small ? 'profile-small' : ''} `}>
        <Avatar user={user} />
        <div className="copy-wrapper">
          {mode === 'display' ? (
            <div className="name-line">
              <h1>{name}</h1>
              {!small && (
                <i
                  className={`fas fa-pencil-alt`}
                  onClick={() => this.beginEdit(user.full_name)}
                />
              )}
            </div>
          ) : (
            <div className="name-line">
              <input
                value={edited_name}
                onChange={this.handleNameChange}
                onBlur={this.saveName}
                autoFocus={true}
              />
            </div>
          )}
          <div className="summary">
            <span>{num_tickets}</span>&bull;<span>{num_likes}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mstp,
  mdtp
)(Profile)
