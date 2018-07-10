export const fetchUsers = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/users'
  });
};

export const createUser = user => {
  return $.ajax({
    method: 'POST',
    url: `/api/users/`,
    data: { user } // same as { user: user }
  });
};
