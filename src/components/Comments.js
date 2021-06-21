import React, { useEffect } from 'react';
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
          <div
            className="box-border border-solid m-2 shadow-md p-1 display: grid gap-2 grid-rows-2 grid-cols-2 auto-rows-min-content justify-self-stretch border-2 border-green-200 rounded-md "
            key={comment._id}
          >
            <h4 className="justify-self-start">{comment.author.username}</h4>
            <p className="justify-self-end">
              {DateTime.fromISO(comment.timestamp).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </p>
            <p className="row-start-2 col-span-full">{comment.body}</p>
            <br />
          </div>
        );
        array = [...array, element];
      }
      props.setComments(array);
    };
    fetchComments();
  }, [props.loadComments]);
  return <div className="justify-self-stretch my-14">{props.comments}</div>;
};

export default Comments;
