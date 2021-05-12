import React, { useEffect } from 'react';
import './Comments.css';
const { DateTime } = require('luxon');

const Comments = (props) => {
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        'https://serene-waters-04286.herokuapp.com/posts/' +
          props.postid +
          '/comments',
        {
          mode: 'cors',
        }
      );
      const data = await response.json();

      let array = [];
      for (const comment of data.comments) {
        const element = (
          <div className="commentLayout" key={comment._id}>
            <h4 className="commentAuthor">{comment.author.username}</h4>
            <p className="commentTimestamp">
              {DateTime.fromISO(comment.timestamp).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </p>
            <p className="commentBody">{comment.body}</p>
            <br />
          </div>
        );
        array = [...array, element];
      }
      props.setComments(array);
    };
    fetchComments();
  }, [props.loadComments, props.comments]);
  return <div className="Comment">{props.comments}</div>;
};

export default Comments;
