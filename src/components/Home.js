import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import baseUrl from '../const';
import ArticleCard from './ArticleCard';

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
              <ArticleCard post={post} />
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
        <h2 className="place-self-center text-3xl text-dark-cyan">
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
