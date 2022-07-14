import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TabContext } from "TabContext";

const NavBar = () => {
  const {tabValue, setTabValue} = useContext(TabContext);

  const handleChange = (_e,tabValue) => {
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
        <Tab label="Home" index={0} href="/"/>
        <Tab label="Favorites" index={1} href="/favoritusers"/>
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
