import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import baseUrl from '../const';

const Home = (props) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(baseUrl + '/posts', {
        mode: 'cors',
      });
      const data = await response.json();
      const item = data.posts;
      const listPosts = item.map((post) => {
        if (post.published === true) {
          return (
            <li
              key={post.title}
              className="box-border shadow-sm rounded-md h-full"
            >
              <Link to={'/posts/' + post.id}>
                <div className="grid auto-rows-post">
                  <div className="overflow-hidden h-postCoverPhoto">
                    <img
                      className="w-full rounded-tl-md rounded-tr-md"
                      src={post ? baseUrl + '/uploads/' + post.coverPhoto : ''}
                      alt="Post Cover"
                    />
                  </div>
                  <div className="text-3xl font-semibold flex-grow px-4 rounded-bl-md rounded-br-md bg-white -mt-1 pb-1">
                    {post.title}
                  </div>
                </div>
              </Link>
            </li>
          );
        } else {
          return null;
        }
      });
      setPosts(listPosts);
    };
    fetchPosts();
  }, []);

  return (
    <Layout authState={props.authState}>
      <div className="grid grid-rows-home row-start-2 mx-4">
        <h2 className="place-self-center text-3xl text-green-900">
          Welcome to the blog!
        </h2>
        <ul className="grid md:grid-cols-2 auto-rows-min lg:grid-cols-3 gap-4">
          {posts ? posts : ''}
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
