import React, { useState, createContext, useContext } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { FavoriteUsers} from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import { TabContext } from "TabContext";

const AppRouter = () => {
  const [tabValue, setTabValue] = useState(0);
  return (
    <ThemeProvider>
      <Router>
        <TabContext.Provider value={{tabValue, setTabValue}} >
        <NavBar />
        <Switch>
          <Route exact path="/favoriteusers" component={FavoriteUsers} /> 
          <Route exact path="/" component={Home} /> 
        </Switch>
        </TabContext.Provider >
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
