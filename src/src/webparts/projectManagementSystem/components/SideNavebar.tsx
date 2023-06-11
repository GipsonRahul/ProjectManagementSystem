import * as React from "react";
import { useState, useEffect } from "react";
import { Label } from "@fluentui/react";
import { Dashboard, Group } from "@material-ui/icons";
import { Icon } from "@material-ui/core";

const logo: string = require("../../../ExternalDocs/Technorucs_Logo.png");

const SideNavebar = (props: any) => {
  return (
    <div style={{ width: "100%" }}>
      {/* Logo Section Starts */}
      <div
        style={{
          display: "flex",
          margin: 30,
        }}
      >
        <img src={logo} alt="Logo" />
        <Label style={{ fontSize: 20, marginLeft: 10 }}>Technorucs</Label>
      </div>
      {/* Logo Section Ends */}

      {/* Side Nav Section Starts */}
      <div>
        <div
          style={{
            display: "flex",
            padding: "10px 30px",
            marginBottom: 16,
            cursor: "pointer",
            background: props._selectNave ? "#e2ffd1" : "#fff",
          }}
          onClick={() => {
            props.navigation("dashboard");
          }}
        >
          <Dashboard />
          <Label style={{ marginLeft: 10, cursor: "pointer" }}>Dashboard</Label>
        </div>
        <div
          style={{
            display: "flex",
            padding: "10px 30px",
            marginBottom: 16,
            cursor: "pointer",
            background: !props._selectNave ? "#e2ffd1" : "#fff",
          }}
          onClick={() => {
            props.navigation("membersdashboard");
          }}
        >
          <Group />
          <Label style={{ marginLeft: 10, cursor: "pointer" }}>Members</Label>
        </div>
      </div>
      {/* Side Nav Section Ends */}
    </div>
  );
};

export default SideNavebar;
