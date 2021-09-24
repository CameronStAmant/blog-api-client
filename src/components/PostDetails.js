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
    <div className="bg-gray-600 min-h-screen">
      <Layout authState={props.authState}>
        <div className="display: grid auto-rows-min auto-rows-auto row-start-2 col-span-full mx-4">
          <div className="display: grid grid-rows-postTitle">
            <h2 className="row-start-1 place-self-center text-3xl text-green-900">
              {postDetails ? postDetails.title : ''}
            </h2>
            <div className="overflow-hidden h-postCoverPhoto">
              <img
                className="w-full"
                src={
                  postDetails
                    ? baseUrl + '/uploads/' + postDetails.coverPhoto
                    : ''
                }
                alt="Post Cover"
              />
            </div>
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
    </div>
  );
};

export default PostDetails;
