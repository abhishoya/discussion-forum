import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './comment.css';

class CommentItem extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      profile:null
    }
  }

  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;
    const user_id = comment.user;
    let gravatar;
    
    axios.get(`/api/profile/user/${user_id}`)
    .then(res => {
      this.setState({profile: res.data});
    })
    .catch(err => console.log("Failed to fetch profile"));
    
    if(this.state.profile!==null)
    {
        gravatar=(
        <Link to={`/profile/${this.state.profile.handle}`}>
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </Link>
        )
    }
    else
    {
      gravatar=(
        <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
        />
      )
    }
    return (
      <div className="comment card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            {gravatar}
            <br />
            <p className="user">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
