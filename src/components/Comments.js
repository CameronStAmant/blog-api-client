import React, { useState, useEffect } from 'react';
import './Comments.css';

const Comments = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        'http://localhost:3000/posts/' + props.postid + '/comments',
        {
          mode: 'cors',
        }
      );
      const data = await response.json();

      for (const comment of data.comments) {
        const element = (
          <div className="commentLayout" key={comment._id}>
            <h4 className="commentAuthor">{comment.author.username}</h4>
            <p className="commentTimestamp">{comment.timestamp}</p>
            <p className="commentBody">{comment.body}</p>
            <br />
          </div>
        );
        setComments((comments) => [...comments, element]);
      }
    };
    fetchComments();
  }, [props.postid]);
  return (
    <div>
      <div>{comments}</div>
    </div>
  );
};

export default Comments;
