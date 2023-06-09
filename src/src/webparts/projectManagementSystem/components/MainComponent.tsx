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
    <div style={{ width: "100%", display: "flex" }}>
      <div
        style={{
          background: "#fff",
          width: "15%",
          height: "100vh",
          border: "1px solid #000",
        }}
      >
        <SideNavebar />
      </div>
      <div style={{ width: "85%", background: "#fff", height: "100vh" }}>
        <Dashboard />
      </div>
    </div>
  );
};

export default MainComponent;
