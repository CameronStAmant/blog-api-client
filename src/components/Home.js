import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

const Home = (props) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        'https://serene-waters-04286.herokuapp.com/posts',
        {
          mode: 'cors',
        }
      );
      const data = await response.json();
      const item = data.posts;
      const listPosts = item.map((post) => {
        if (post.published === true) {
          return (
            <li
              key={post.title}
              className="display: grid box-border border-2 shadow-sm rounded-md gap-4 border-green-200 "
            >
              <Link to={'/posts/' + post.id}>
                <p className="m-14 md:m-32">{post.title}</p>
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
      <div className="display: grid grid-rows-home auto-rows-min row-start-2 col-span-full">
        <p className="row-start-1 place-self-center min-h-px col-span-full">
          Welcome to the blog!
        </p>
        <ul className="display: grid grid-flow-row md:grid-cols-2 row-start-2 lg:grid-cols-3 col-span-full gap-4 h-lg">
          {posts ? posts : ''}
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
