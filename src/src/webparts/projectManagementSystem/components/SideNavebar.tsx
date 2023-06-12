import * as React from "react";
import { useState, useEffect } from "react";
import { Label } from "@fluentui/react";
import { Dashboard, Group } from "@material-ui/icons";
import { Icon } from "@material-ui/core";

const logo: string = require("../../../ExternalDocs/Technorucs_Logo.png");

const SideNavebar = (props: any) => {
  return (
    <div className="FormContainer">
      {/* Logo Section Starts */}
      <div className="logoSection">
        <img src={logo} alt="Logo" />
        <Label>Technorucs</Label>
      </div>
      {/* Logo Section Ends */}

      {/* Side Nav Section Starts */}
      <div>
        <div
          style={{
            background: props._selectNave ? "#e2ffd1" : "#fff",
          }}
          className="activeTab"
          onClick={() => {
            props.navigation("dashboard");
          }}
        >
          <Dashboard />
          <Label>Dashboard</Label>
        </div>
        <div
          style={{
            background: !props._selectNave ? "#e2ffd1" : "#fff",
          }}
          className="activeTab"
          onClick={() => {
            props.navigation("membersdashboard");
          }}
        >
          <Group />
          <Label>Members</Label>
        </div>
      </div>
      {/* Side Nav Section Ends */}
    </div>
  );
};

export default SideNavebar;
