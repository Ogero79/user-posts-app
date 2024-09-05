import React, { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsersAndPosts = async () => {
    try {
      const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
      const usersData = await usersResponse.json();

      const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
      const postsData = await postsResponse.json();

      const usersWithPostCount = usersData.map((user) => {
        const postCount = postsData.filter(post => post.userId === user.id).length;
        return { ...user, postCount };
      });

      setUsers(usersWithPostCount);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users or posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAndPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Posts</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - Posts: {user.postCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;