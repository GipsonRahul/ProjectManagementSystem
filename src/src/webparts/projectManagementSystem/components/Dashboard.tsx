import * as React from "react";
import { useState, useEffect } from "react";
import { Label, DetailsList, Persona, PersonaSize } from "@fluentui/react";
import { Add, Apps, List } from "@material-ui/icons";

const Users = require("../../../ExternalJSON/Users.json");

const Dashboard = () => {
  // list column names
  let column: any[] = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "column2",
      name: "Value",
      fieldName: "value",
      minWidth: 100,
      maxWidth: 200,
    },
  ];

  // life cycle function for onload
  useEffect(() => {
    console.log(Users);
  }, []);
  
  return (
    <div style={{ width: "100%" }}>
      {/* Project Heading */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 20px",
          alignItems: "center",
        }}
      >
        <Label>Projects</Label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginRight: "20px",
            }}
          >
            <div>
              <Label>Deva Raj</Label>
            </div>
            <div>
              <Label>devaraj@chandrudemo.onmicrosoft.com</Label>
            </div>
          </div>
          <Persona
            size={PersonaSize.size32}
            imageUrl={
              "/_layouts/15/userphoto.aspx?size=S&username=" +
              "devaraj@chandrudemo.onmicrosoft.com"
            }
          />
        </div>
      </div>

      {/* Navigation section */}
      <div
        style={{
          display: "flex",
          margin: "10px 20px",
        }}
      >
        <div
          style={{
            width: "15%",
          }}
        >
          <button
            style={{
              background: "#A9F37F",
              display: "flex",
              border: "none",
              width: "60%",
              borderRadius: "50px",
              cursor: "pointer",
              height: "40px",
            }}
          >
            <Add />
            <Label style={{ color: "#000" }}>New</Label>
          </button>
        </div>
        <div
          style={{
            border: "1px solid #dfdfdf",
            display: "flex",
            justifyContent: "space-between",
            width: "85%",
            alignItems: "center",
            height: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Label style={{ margin: "5px 10px", cursor: "pointer" }}>All</Label>
            <Label style={{ margin: "5px 10px", cursor: "pointer" }}>
              Active
            </Label>
            <Label style={{ margin: "5px 10px", cursor: "pointer" }}>
              Inactive
            </Label>
            <Label style={{ margin: "5px 10px", cursor: "pointer" }}>
              On hold
            </Label>
            <Label style={{ margin: "5px 10px", cursor: "pointer" }}>
              Completed
            </Label>
          </div>
          <div
            style={{
              margin: "10px",
            }}
          >
            {true ? (
              <Apps
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {}}
              />
            ) : (
              <List
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {}}
              />
            )}
          </div>
        </div>
      </div>

      {/* Details list filter section */}
      <div
        style={{
          margin: "10px 20px",
        }}
      >
        Filters
      </div>

      {/* Details list section */}
      <div
        style={{
          margin: "10px 20px",
        }}
      >
        {false ? (
          <div>Block list</div>
        ) : (
          <div>
            <DetailsList items={[]} columns={column} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
