import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetails.css';
import Layout from './Layout';
import CommentForm from './CommentForm';
import Comments from './Comments';

const PostDetails = (props) => {
  const [postDetails, setPostDetails] = useState(null);
  const { id } = useParams();
  const [loadComments, setLoadComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      const response = await fetch(
        'https://serene-waters-04286.herokuapp.com/posts/' + id,
        {
          mode: 'cors',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('user'),
          },
        }
      );
      const data = await response.json();
      const item = data.post;
      setPostDetails(item);
    };
    fetchPostDetails();
  }, []);

  return (
    <Layout authState={props.authState}>
      <div className="postLayout">
        <div className="post">
          <h2>{postDetails ? postDetails.title : ''}</h2>
          <br />
          <p> {postDetails ? postDetails.body : ''}</p>
        </div>
        <CommentForm
          authState={props.authState}
          userId={props.userId}
          loadComments={() => setLoadComments(!loadComments)}
          setComments={() => setComments([])}
          comments={comments}
        />
        <Comments
          postid={id}
          loadComments={loadComments}
          setComments={(state) => setComments(state)}
          comments={comments}
        />
      </div>
    </Layout>
  );
};

export default PostDetails;
