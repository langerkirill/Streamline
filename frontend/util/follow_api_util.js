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

export const follow = (follow_id) => {
  return $.ajax({
    method: 'POST',
    url: `/api/follows`,
    data: {follow_id}
  });
};
