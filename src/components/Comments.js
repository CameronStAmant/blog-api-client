import React, { useState, useEffect } from 'react';

const Comments = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // const fetchPost = async () => {
    //   const post = Post.findById(props.id).exec();
    //   console.log(post);
    // };
    // fetchPost();
    const fetchComments = async () => {
      const response = await fetch(
        'http://localhost:3000/posts/' + props.postid + '/comments',
        {
          mode: 'cors',
        }
      );
      const data = await response.json();
      console.log(data.comments);

      for (const comment of data.comments) {
        const element = (
          <div>
            <h4>{comment.author.username}</h4>
            <p>{comment.timestamp}</p>
            <p>{comment.body}</p>
          </div>
        );
        console.log(comment.body);
        setComments((comments) => [...comments, element]);
      }
    };
    fetchComments();
  }, []);
  return (
    <div>
      <p>comments will display here. {comments}</p>
    </div>
  );
};

export default Comments;
