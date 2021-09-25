import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import baseUrl from '../const';
import Button from './Button';
import Textarea from './Textarea';

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
        <form className="mt-14 text-center">
          <label className="">Submit a comment:</label>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
          <input type="hidden" value={id} className="w-full" name="post" />
          <Button value="Submit" color="green" onClick={handleSubmit} />
        </form>
      )}
    </div>
  );
};

export default CommentForm;
