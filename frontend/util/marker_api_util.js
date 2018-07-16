export const fetchMarkers = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/markers'
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
