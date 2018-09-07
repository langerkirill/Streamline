export const fetchFollowers = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/follows`
  });
};

export const fetchFollowing = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/follows`
  });
};

export const follow = (following_id) => {
  return $.ajax({
    method: 'POST',
    url: `/api/follows`,
    data: { follow: {following_id} }
  });
};
