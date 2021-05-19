import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CommentForm.css';

const CommentForm = (props) => {
  const [body, setBody] = useState(null);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    await fetch(
      'https://serene-waters-04286.herokuapp.com/posts/' + id + '/comments',
      requestOptions
    );
    props.setComments();
    setBody(null);
    props.loadComments();
  };

  useEffect(() => {}, [props.comments]);

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
            <input type="submit" id="commentSubmit" value="Submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
