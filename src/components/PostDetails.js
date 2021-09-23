import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import CommentForm from './CommentForm';
import Comments from './Comments';
import baseUrl from '../const';

const PostDetails = (props) => {
  const [postDetails, setPostDetails] = useState(null);
  const { id } = useParams();
  const [loadComments, setLoadComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      const response = await fetch(baseUrl + '/posts/' + id, {
        mode: 'cors',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('user'),
        },
      });
      const data = await response.json();
      const item = data.post;
      setPostDetails(item);
    };
    fetchPostDetails();
  }, []);

  return (
    <Layout authState={props.authState}>
      <div className="display: grid grid-rows-post auto-rows-auto row-start-2 col-span-full">
        <div className="display: grid grid-rows-postTitle">
          <h2 className="row-start-1 place-self-center text-2xl font-semibold">
            {postDetails ? postDetails.title : ''}
          </h2>
          <img
            src={
              postDetails ? baseUrl + '/uploads/' + postDetails.coverPhoto : ''
            }
            alt="Post Cover"
          />
          <p className="mx-2 px-1"> {postDetails ? postDetails.body : ''}</p>
        </div>
        {props.authState && (
          <CommentForm
            authState={props.authState}
            userId={props.userId}
            loadComments={() => setLoadComments(!loadComments)}
            setComments={() => setComments([])}
            comments={comments}
          />
        )}
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
