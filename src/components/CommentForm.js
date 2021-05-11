import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CommentForm.css';

const CommentForm = (props) => {
  const [body, setBody] = useState(null);
  const { id } = useParams();

  const handleSubmit = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('user'),
      },
      body: JSON.stringify({
        author: props.userId,
        body: body,
      }),
    };
    fetch(
      'http://localhost:3000/posts/' + id + '/comments',
      requestOptions
    ).then(props.loadComments(true));
  };
  return (
    <div className="form">
      {props.authState && (
        <div className="commentForm">
          <h3>Submit a comment</h3>
          <br />
          <form onSubmit={handleSubmit}>
            <label>Comment:</label>
            <br />
            <textarea
              type="text"
              rows="5"
              name="body"
              value={body ? body : ''}
              onChange={(e) => setBody(e.target.value)}
              required
            />
            <br />
            <input type="hidden" value={id} name="post" />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
