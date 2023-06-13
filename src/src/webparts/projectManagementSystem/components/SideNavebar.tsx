import * as React from "react";
import { Label } from "@fluentui/react";
import { Dashboard, Group } from "@material-ui/icons";

const logo: string = require("../../../ExternalDocs/TechnoRUCS Final.png");

const SideNavebar = (props: any) => {
  return (
    <div className="FormContainer">
      {/* Logo Section Starts */}
      <div className="logoSection">
        <img src={logo} alt="Logo" style={{ width: "76%", height: "5vh" }} />
      </div>
      {/* Logo Section Ends */}

      {/* Side Nav Section Starts */}
      <div>
        <div
          style={{
            background: props._selectNave == "Dashboard" || props._selectNave == "Form" ? "#e2ffd1" : "#fff",
          }}
          className="activeTab"
          onClick={() => {
            props.navigation("Dashboard");
          }}
        >
          <Dashboard />
          <Label>Dashboard</Label>
        </div>
        <div
          style={{
            background: props._selectNave == "Members" ? "#e2ffd1" : "#fff",
          }}
          className="activeTab"
          onClick={() => {
            props.navigation("Members");
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
