import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import baseUrl from '../const';

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
    await fetch(baseUrl + '/posts/' + id + '/comments', requestOptions);
    props.setComments();
    setBody(null);
    props.loadComments();
  };

  useEffect(() => {}, [props.comments]);

  return (
    <div className="gap-4">
      {props.authState && (
        <form className="mt-14 mx-2 text-center" onSubmit={handleSubmit}>
          <label className="">Submit a comment:</label>
          <textarea
            className="w-full box-border border-2 border-solid rounded-md shadow-md gap-2 auto-rows-min-content justify-self-stretch border-green-200"
            rows="5"
            name="body"
            value={body ? body : ''}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <input type="hidden" value={id} className="w-full" name="post" />
          <input
            type="submit"
            className="border-solid border-4 border-green-200 rounded-md bg-green-200 hover:bg-green-300 hover:border-green-300 w-2/6 active:bg-green-400 active:border-green-400 shadow-sm"
            value="Submit"
          />
        </form>
      )}
    </div>
  );
};

export default CommentForm;
