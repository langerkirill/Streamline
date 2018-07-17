import * as RouteApiUtil from "../util/route_api_util";

export const RECEIVE_ROUTES = "RECEIVE_ROUTES";
export const RECEIVE_ROUTE = "RECEIVE_ROUTE";

const receiveRoutes = ({ routes, users }) => {

  return {
    type: RECEIVE_ROUTES,
    routes,
    users
  };
};

const receiveRoute = route => {
  return {
    type: RECEIVE_ROUTE,
    route
  };
};

export const fetchRoutes = () => {
  return dispatch => {
    return RouteApiUtil.fetchRoutes().then(payload => {
      return dispatch(receiveRoutes(payload));
    });
  };
};

export const createRoute = route => {
  
  return dispatch => {
    return RouteApiUtil.createRoute(route).then(route => {
      return dispatch(receiveRoute(route));
    });
  };
};
