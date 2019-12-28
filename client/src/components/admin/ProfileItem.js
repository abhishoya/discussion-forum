import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import axios from 'axios';

class ProfileItem extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      render: false
    }
  }

  onDeleteClick(e) {
    if (window.confirm('Are you sure? This can NOT be undone!')){
      console.log(this.props.profile.user._id);
      axios.delete(`/api/profile/${this.props.profile.user._id}`)
      .then(res => {window.alert("Deleted");this.setState({render:!this.state.render});})
      .catch(err => console.log(err));
    }
  }

  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
            &nbsp;
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete This Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;