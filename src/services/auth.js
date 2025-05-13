// auth.js
const users = [
  { username: 'admin', password: 'password' },  // Usuario ficticio
];

export const login = (username, password) => {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  return user ? true : false;
};
