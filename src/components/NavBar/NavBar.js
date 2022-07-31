import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { routes } from "./routes";
import { useHistory, useLocation } from "react-router";

const getInitTabValue = (pathname) => routes.findIndex(({ path }) => path === pathname);

const NavBar = () => {
  const { pathname } = useLocation();
  console.log({pathname})

  const [tabValue, setTabValue] = useState(getInitTabValue(pathname));
  const history = useHistory();

  const handleChange = (_e, tabValue) => {
    history.push(routes[tabValue].path);
    setTabValue(tabValue);
  };
  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        {routes.map(({ name }, index) => (
          <Tab label={name} index={index} key={index} />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default NavBar;