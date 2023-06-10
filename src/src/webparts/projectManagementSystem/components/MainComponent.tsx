import * as React from "react";
import { useState, useEffect } from "react";
import { Icon } from "@fluentui/react";
import SideNavebar from "./SideNavebar";
import Dashboard from "./Dashboard";
import Members from "./Members";

const Users = require("../../../ExternalJSON/Users.json");

const MainComponent = () => {
  // life cycle function for onload
  useEffect(() => {}, []);

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div
        style={{
          background: "#fff",
          width: "15%",
          height: "100vh",
          borderRight: "1px solid #dfdfdf",
        }}
      >
        <SideNavebar />
      </div>
      <div style={{ width: "85%", background: "#fff", height: "100vh" }}>
        {false ? <Dashboard /> : <Members />}
      </div>
    </div>
  );
};

export default MainComponent;
