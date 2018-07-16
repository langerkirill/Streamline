// https://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536,-104.9847034&key=YOUR_API_KEY

let api = "AIzaSyAPjYkDq0-iiCd6W5-qCw46J-r0EW39L1U";

export const fetchElevation = (lat, long) => {
  return $.ajax({
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${long}&key=${api}`
  });
};
