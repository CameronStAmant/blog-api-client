import React, { useState, useEffect } from 'react';

const Comments = (props) => {
  const [comments, setComments] = useState(null);

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
      console.log(props);
      // setComments(data);
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
