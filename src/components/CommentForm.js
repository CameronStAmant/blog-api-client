import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import './CommentForm.css';

const CommentForm = () => {
  const [author, setAuthor] = useState(null);
  const [body, setBody] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const { id } = useParams();

  const handleSubmit = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: author,
        body: body,
        post: id,
      }),
    };
    fetch('http://localhost:3000/posts/' + id + '/comments', requestOptions)
      .then((response) => response.json())
      .then((results) => {
        return setRedirect(true);
      });
  };

  useEffect(() => {}, [redirect]);

  return (
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
  );
};

export default CommentForm;
