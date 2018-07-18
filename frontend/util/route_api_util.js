export const fetchRoutes = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/routes'
  });
};

export const fetchUserRoutes = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `api/markers/created_routes`,
    data: {userId}
  })
}

export const fetchRoute = (routeId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/routes/${routeId}`
  });
};

export const createRoute = route => {
  return $.ajax({
    method: 'POST',
    url: `/api/routes`,
    data: { route }
  });
};
