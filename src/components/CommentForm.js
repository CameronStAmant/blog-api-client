import React from 'react';
import { useParams } from 'react-router-dom';
import './CommentForm.css';

const CommentForm = () => {
  const { id } = useParams();

  const handleSubmit = () => {
    return 'http://localhost:3000/posts/' + id + '/comments';
  };

  return (
    <div className="commentForm">
      <h3>Submit a comment</h3>
      <br />
      <form method="POST" action={handleSubmit()}>
        <label>Name: </label>
        <br />
        <input type="text" name="author" />
        <br />
        <label>Comment:</label>
        <br />
        <textarea type="text" rows="5" name="body" />
        <br />
        <input type="hidden" value={id} name="post" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
