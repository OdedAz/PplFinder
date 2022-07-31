import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import { TabContext } from "TabContext";
import { routes } from "components/NavBar/routes";

const AppRouter = () => {
  const [tabValue, setTabValue] = useState(0);
  return (
    <ThemeProvider>
      <Router>
        <TabContext.Provider value={{ tabValue, setTabValue }}>
          <NavBar />
          <Switch>
            {routes.map(({ path, component: Component, exact }, index) => (
              <Route exact={exact} path={path} key={index}>
                <Component />
              </Route>
            ))}
          </Switch>
        </TabContext.Provider>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
