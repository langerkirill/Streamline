export const fetchRouteMarkers = (routeId) => {

  return $.ajax({
    method: 'GET',
    url: `/api/routes/${routeId}/markers`
  });
};

export const fetchMarker = (markerId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/markers/${markerId}`
  });
};

export const createMarker = marker => {
  return $.ajax({
    method: 'POST',
    url: `/api/markers`,
    data: { marker }
  });
};

export const fetchUserMarkers = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `api/markers/created_routes`,
    data: {userId}
  })
}
