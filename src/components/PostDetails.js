import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetails.css';
import Layout from './Layout';
import CommentForm from './CommentForm';

const PostDetails = () => {
  const [postDetails, setPostDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostDetails = async () => {
      const response = await fetch('http://localhost:3000/posts/' + id, {
        mode: 'cors',
      });
      const data = await response.json();
      const item = data.post;
      setPostDetails(item);
    };
    fetchPostDetails();
  }, []);

  return (
    <Layout>
      <div>
        <h3 className="title">{postDetails ? postDetails.title : ''}</h3>
        <p className="body"> {postDetails ? postDetails.body : ''}</p>
      </div>
      <CommentForm />
    </Layout>
  );
};

export default PostDetails;
