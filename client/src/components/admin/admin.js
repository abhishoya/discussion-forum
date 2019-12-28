import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';

class Admin extends Component {
  componentDidMount() {
    if(!(localStorage.getItem("usr")=="admin" && localStorage.getItem("pwd")=="password")){
        this.props.history.push("/adminLogin");
    }
    this.props.getProfiles();
  }

  logout()
  {
    localStorage.removeItem("usr");
    localStorage.removeItem("pwd");
    this.props.history.push("/");
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Remove Developers
              </p>
              <button className="btn-danger" onClick={()=>this.logout()}>Logout</button>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Admin);
