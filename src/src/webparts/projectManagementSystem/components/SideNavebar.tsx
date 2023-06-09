import * as React from "react";

import { Label } from "@fluentui/react";
import { Apps, Group } from "@material-ui/icons";

import { Icon } from "@material-ui/core";

const logo: string = require("../../../ExternalDocs/Technorucs_Logo.png");

interface ISideNav {
  name: string;
  key: string;
  iconName: string;
}

const SideNavebar = () => {
  const sideNavInfo: ISideNav[] = [
    {
      name: "Dashboard",
      key: "Dashboard",
      iconName: "Apps",
    },
    {
      name: "Members",
      key: "Members",
      iconName: "People",
    },
  ];
  return (
    <div>
      {/* Logo Section Starts */}
      <div
        style={{
          display: "flex",
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 20,
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
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 50,
          }}
        >
          <Apps />
          <Label style={{ marginLeft: 10 }}>ws</Label>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 50,
          }}
        >
          <Group />
          <Label style={{ marginLeft: 10 }}>sdf</Label>
        </div>
      </div>
      {/* Side Nav Section Ends */}
    </div>
  );
};

export default SideNavebar;
