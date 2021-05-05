import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CommentForm.css';

const CommentForm = () => {
  const [author, setAuthor] = useState(null);
  const [body, setBody] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [auth, setAuth] = useState(false);

  const { id } = useParams();

  const authChecker = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('user'),
      },
    };
    fetch('http://localhost:3000/auth', requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        setAuth(results);
      });
  };

  const handleSubmit = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('user'),
      },
      body: JSON.stringify({
        author: author,
        body: body,
      }),
    };
    fetch(
      'http://localhost:3000/posts/' + id + '/comments',
      requestOptions
    ).then(setRedirect(true));
  };

  useEffect(() => {
    authChecker();
  }, [redirect]);

  return (
    <div>
      {auth && (
        <div className="commentForm">
          <h3>Submit a comment</h3>
          <br />
          <form onSubmit={handleSubmit}>
            <label>Name: </label>
            <br />
            <input
              type="text"
              name="author"
              value={author ? author : ''}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <br />
            <label>Comment:</label>
            <br />
            <textarea
              type="text"
              rows="5"
              name="body"
              value={body ? body : ''}
              onChange={(e) => setBody(e.target.value)}
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
