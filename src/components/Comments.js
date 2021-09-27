import React, { useEffect } from 'react';
import baseUrl from '../const';

const { DateTime } = require('luxon');

const Comments = (props) => {
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        baseUrl + '/posts/' + props.postid + '/comments',
        {
          mode: 'cors',
        }
      );
      const data = await response.json();

      let array = [];
      for (const comment of data.comments) {
        const element = (
          <div
            className="box-border border-solid shadow-md p-smd grid gap-2 auto-rows-min border-2 border-cyan rounded-md mb-2"
            key={comment._id}
          >
            <h4 className="text-cyan font-bold">{comment.author.username}</h4>
            <p className="italic text-sm">
              {DateTime.fromISO(comment.timestamp).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </p>
            <p className="row-start-2">{comment.body}</p>
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
