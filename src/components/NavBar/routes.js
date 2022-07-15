import { Home, FavoriteUsers } from "pages";

export const routes = [
  { path: "/", name: "Home", component: Home, exact: true },
  { path: "/favorite-users", name: "Favorites", component: FavoriteUsers },
];