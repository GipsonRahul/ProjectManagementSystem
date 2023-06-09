import * as React from "react";
import { useState, useEffect } from "react";
import { Icon } from "@fluentui/react";
import SideNavebar from "./SideNavebar";
import Dashboard from "./Dashboard";

const Users = require("../../../ExternalJSON/Users.json");

const MainComponent = () => {
  // life cycle function for onload
  useEffect(() => {
    console.log(Users);
  }, []);

  return (
    <div style={{ width: "100%", display: 'flex' }}>
      <div style={{ width: "15%", background: '#000', height: '100vh' }}>
        <SideNavebar />
      </div>
      <div style={{ width: "85%", background: '#0f0', height: '100vh' }}>
        <Dashboard />
      </div>
    </div>
  );
};

export default MainComponent;
