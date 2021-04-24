import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3000/posts', {
        mode: 'cors',
      });
      const data = await response.json();
      const item = data.posts;
      console.log(item);
      const listPosts = item.map((post) => {
        return (
          <li key={post.title}>
            <a href={post.url}>{post.title}</a>
          </li>
        );
      });
      setPosts(listPosts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="mainContent">
      <ul className="postIndex">{posts ? posts : ''}</ul>
    </div>
  );
};

export default Home;
