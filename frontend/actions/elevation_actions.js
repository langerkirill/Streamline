import * as ElevationApiUtil from "../util/elevation";

export const fetchElevation = (lat, long) => {
  return ElevationApiUtil.fetchElevation(lat, long).then(payload => {
    return payload;
  });
};
