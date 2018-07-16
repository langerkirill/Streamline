import * as MarkerApiUtil from "../util/marker_api_util";

export const RECEIVE_MARKERS = "RECEIVE_MARKERS";
export const RECEIVE_MARKER = "RECEIVE_MARKER";

const receiveMarkers = ({ markers, users }) => {

  return {
    type: RECEIVE_MARKERS,
    markers,
    users
  };
};

const receiveMarker = marker => {
  return {
    type: RECEIVE_MARKER,
    marker
  };
};

export const fetchMarkers = () => {
  return dispatch => {
    return MarkerApiUtil.fetchMarkers().then(markers => {
      return dispatch(receiveMarkers(markers));
    });
  };
};

export const createMarker = marker => {
  return dispatch => {
    return MarkerApiUtil.createMarker(marker).then(marker => {
      return dispatch(receiveMarker(marker));
    });
  };
};
