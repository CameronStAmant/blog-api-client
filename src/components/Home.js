import React, { useState, useEffect } from 'react';
import './Home.css';
import Layout from './Layout';

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [userId, setUserId] = useState(false);
  //hook up req.user from indexController.js to this pages line 35.

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('http://localhost:3000/', {
        mode: 'cors',
      });
    };
    fetchUser();

    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3000/posts', {
        mode: 'cors',
        // headers: {
        //   Authorization: 'Bearer ' + localStorage.getItem('user'),
        // },
      });
      const data = await response.json();
      const item = data.posts;
      const listPosts = item.map((post) => {
        if (post.published === true) {
          return (
            <li key={post.title} className="postDetails">
              <a href={post.url}>{post.title}</a>
            </li>
          );
        } else {
          return null;
        }
      });
      setPosts(listPosts);
    };
    fetchPosts();
  }, [userId]);

  return (
    <Layout>
      <div className="mainContent">
        {userId && <p>logged in!</p>}
        <div className="homeBanner">Welcome to the tree blog!</div>
        <ul className="postIndex">{posts ? posts : ''}</ul>
      </div>
    </Layout>
  );
};

export default Home;
