import React from 'react';
import { useParams } from 'react-router-dom';

const CommentForm = () => {
  const { id } = useParams();

  const handleSubmit = () => {
    return 'http://localhost:3000/posts/' + id + '/comments';
  };

  return (
    <form method="POST" action={handleSubmit()}>
      <label>
        Name:
        <input type="text" name="author" />
      </label>
      <label>
        Comment:
        <textarea type="text" rows="5" name="body" />
      </label>
      <input type="hidden" value={id} name="post" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CommentForm;
