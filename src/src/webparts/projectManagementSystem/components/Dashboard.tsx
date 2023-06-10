import * as React from "react";
import { useState, useEffect } from "react";
import {
  Label,
  DetailsList,
  Persona,
  PersonaSize,
  Dropdown,
  ICommandBarItemProps,
  CommandBar,
  IButtonProps,
} from "@fluentui/react";
import {
  Add,
  Apps,
  List,
  MoreVert,
  Visibility,
  Edit,
  Delete,
} from "@material-ui/icons";
import { SelectionMode } from "office-ui-fabric-react";

const Users = require("../../../ExternalJSON/Users.json");

interface IDetails {
  DisplayName: string;
  Email: string;
}

interface IMasterData {
  ProjectName: string;
  Status: string;
  StartDate: any;
  ProjectManager: IDetails;
  TeamLead: IDetails;
  Developers: string[];
  ID: number;
}

const Dashboard = () => {
  // list column names
  let DetailListColumn: any[] = [
    {
      key: "column1",
      name: "Project Name",
      fieldName: "ProjectName",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "column2",
      name: "Status",
      fieldName: "Status",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "column3",
      name: "Start date",
      fieldName: "StartDate",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "column4",
      name: "Project Manager",
      fieldName: "ProjectManager",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: any) => {
        return (
          <p style={{ display: "flex" }}>
            <Persona
              size={PersonaSize.size32}
              imageUrl={
                "/_layouts/15/userphoto.aspx?size=S&username=" +
                item.ProjectManager.Email
              }
            />
            <Label>{item.ProjectManager.DisplayName}</Label>
          </p>
        );
      },
    },
    {
      key: "column5",
      name: "Team Lead",
      fieldName: "TeamLead",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: any) => {
        return (
          <p style={{ display: "flex" }}>
            <Persona
              size={PersonaSize.size32}
              imageUrl={
                "/_layouts/15/userphoto.aspx?size=S&username=" +
                item.TeamLead.Email
              }
            />
            <Label>{item.TeamLead.DisplayName}</Label>
          </p>
        );
      },
    },
    {
      key: "column6",
      name: "Developer",
      fieldName: "Developers",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: any) => {
        return (
          <p style={{ display: "flex" }}>
            {item.Developers.length
              ? item.Developers.map((e: any) => {
                  return (
                    <Persona
                      size={PersonaSize.size32}
                      imageUrl={
                        "/_layouts/15/userphoto.aspx?size=S&username=" + e
                      }
                    />
                  );
                })
              : ""}
          </p>
        );
      },
    },
    {
      key: "column7",
      name: "Actions",
      fieldName: "Actions",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: any) => {
        return (
          <div style={{ display: "flex", gap: "1%" }}>
            <Visibility />
            <Edit />
            <Delete />
          </div>
        );
      },
    },
  ];

  // list Datas
  let sampleDatas: IMasterData[] = [
    {
      ProjectName: "Project Test 001",
      Status: "Active",
      StartDate: "06/09/2023",
      ProjectManager: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      TeamLead: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Developers: [
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
      ],
      ID: 1,
    },
    {
      ProjectName: "Project Test 002",
      Status: "Inactive",
      StartDate: "06/10/2023",
      ProjectManager: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      TeamLead: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Developers: [
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
      ],
      ID: 2,
    },
    {
      ProjectName: "Project Test 003",
      Status: "On hold",
      StartDate: "06/11/2023",
      ProjectManager: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      TeamLead: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Developers: [
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
      ],
      ID: 3,
    },
    {
      ProjectName: "Project Test 004",
      Status: "Active",
      StartDate: "06/12/2023",
      ProjectManager: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      TeamLead: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Developers: [
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
      ],
      ID: 4,
    },
    {
      ProjectName: "Project Test 005",
      Status: "Active",
      StartDate: "06/13/2023",
      ProjectManager: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      TeamLead: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Developers: [
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
      ],
      ID: 5,
    },
    {
      ProjectName: "Project Test 006",
      Status: "Active",
      StartDate: "06/14/2023",
      ProjectManager: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      TeamLead: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Developers: [
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
      ],
      ID: 6,
    },
  ];

  // State section start
  const [masterData, setMasterData] = useState<IMasterData[]>(sampleDatas);
  const [isListView, setIsListView] = useState<boolean>(true);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  // State section end

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
            <Label
              style={{
                margin: "5px 10px",
                cursor: "pointer",
                color: "All" == "All" && "#5cff00",
              }}
            >
              All
            </Label>
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
            {isListView ? (
              <Apps
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsListView(false);
                }}
              />
            ) : (
              <List
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsListView(true);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Details list filter section */}
      <div
        style={{
          margin: "10px 20px",
          display: "flex",
          justifyContent: "end",
          gap: "2%",
        }}
      >
        <div style={{ width: "26%" }}>
          <Dropdown
            placeholder="Select an project"
            options={[
              { key: "1", text: "1" },
              { key: "2", text: "2" },
              { key: "3", text: "3" },
            ]}
          />
        </div>
        <div style={{ width: "26%" }}>
          <Dropdown
            placeholder="Select an Status"
            options={[
              { key: "1", text: "1" },
              { key: "2", text: "2" },
              { key: "3", text: "3" },
            ]}
          />
        </div>
      </div>

      {/* Details list section */}
      <div
        style={{
          margin: "10px 20px",
        }}
      >
        {isListView ? (
          <div>
            {masterData.length ? (
              <div
                style={{
                  display: "flex",
                  gap: "4%",
                  //   position: "absolute",
                  flexWrap: "wrap",
                  margin: "10px 0px",
                  height: "500px",
                  width: "100%",
                }}
              >
                {masterData.map((e: any) => {
                  return (
                    <div style={{ width: "30%", position: "relative" }}>
                      <div
                        style={{
                          border: "1px solid #dfdfdf",
                          borderRadius: "5px",
                          padding: "15px",
                          display: "flex",
                          height: "178px",
                        }}
                      >
                        <div style={{ width: "70%" }}>
                          <Label>{e.ProjectName}</Label>
                          <Label>{e.Status}</Label>
                          <Label>Start Date</Label>
                          <Label>{e.StartDate}</Label>
                          <Label>Members</Label>
                          <div style={{ display: "flex" }}>
                            {e.Developers.length
                              ? e.Developers.map((user: string) => {
                                  return (
                                    <Persona
                                      size={PersonaSize.size32}
                                      imageUrl={
                                        "/_layouts/15/userphoto.aspx?size=S&username=" +
                                        user
                                      }
                                    />
                                  );
                                })
                              : ""}
                          </div>
                        </div>
                        <div style={{ width: "30%" }}>
                          <div style={{ textAlign: "right" }}>
                            <MoreVert
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                if (isPopup) {
                                  setIsPopup(false);
                                } else {
                                  setIsPopup(true);
                                }
                              }}
                            />
                          </div>
                          <Label>Project Manager</Label>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Persona
                              size={PersonaSize.size32}
                              imageUrl={
                                "/_layouts/15/userphoto.aspx?size=S&username=" +
                                e.ProjectManager.Email
                              }
                            />
                          </div>
                          <Label>Team Lead</Label>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Persona
                              size={PersonaSize.size32}
                              imageUrl={
                                "/_layouts/15/userphoto.aspx?size=S&username=" +
                                e.TeamLead.Email
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {isPopup ? (
                        <div
                          style={{
                            width: "30%",
                            height: "106px",
                            position: "absolute",
                            background: "#fff",
                            left: "258px",
                            bottom: "96px",
                            borderRadius: "5px",
                            boxShadow: "#c7c7c7 0px 0px 10px 2px",
                            padding: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "10px",
                              cursor: "pointer",
                            }}
                          >
                            <Label style={{ cursor: "pointer" }}>View</Label>
                            <Visibility />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "10px",
                              cursor: "pointer",
                            }}
                          >
                            <Label style={{ cursor: "pointer" }}>Edit</Label>
                            <Edit />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "10px",
                              cursor: "pointer",
                            }}
                          >
                            <Label style={{ cursor: "pointer" }}>Delete</Label>
                            <Delete />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <Label
                style={{
                  textAlign: "center",
                }}
              >
                No Data Found!!!
              </Label>
            )}
          </div>
        ) : (
          <div>
            <DetailsList
              items={[...masterData]}
              columns={DetailListColumn}
              selectionMode={SelectionMode.none}
            />
            {masterData.length == 0 && (
              <Label
                style={{
                  textAlign: "center",
                }}
              >
                No Data Found!!!
              </Label>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
