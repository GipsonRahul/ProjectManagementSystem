import * as React from "react";
import { useEffect, useState } from "react";
import {
  DetailsList,
  IColumn,
  IDetailsListStyles,
  ITextFieldStyles,
  Label,
  Persona,
  PersonaSize,
  SelectionMode,
  TextField,
} from "@fluentui/react";
import { sp } from "@pnp/sp/presets/all";
import { VisibilityOutlined } from "@material-ui/icons";

interface IProps {
  masterRecords: IMasterData[];
  _masterUsersDetails: {
    ProjectManagers: IUser[];
    Developers: IUser[];
    TeamLeads: IUser[];
    Testers: IUser[];
    Designers: IUser[];
  }[];
  sp: any;
  context: any;
}
interface IUser {
  Displayname: string;
  Email: string;
  Position: string;
  Availablity: number;
  ID: number;
}

interface IMasterData {
  ID: number;
  ProjectName: string;
  ProjectType: string;
  ProjectDescription: string;
  Status: string;
  StartDate: any;
  EndDate: any;
  Members: IMember[];
  ProjectCost: string;
  ProjectEstimate: string;
  ActualCost: string;
  isSelect: boolean;
}
interface IMember {
  Name: string;
  Email: string;
  Role: string;
  Allocation: number;
}

interface ISelectedUser {
  Displayname: string;
  Email: string;
  Position: string;
  Availablity: number;
  ID: number;
  userDetails: IUserDetails;
}
interface IUserDetails {
  totalProjects: number;
  totalAllocation: number;
  projects: IProject[];
}
interface IProject {
  name: string;
  allocation: number;
  cost: string;
  status: string;
  ID: number;
}

interface IMemberCategory {
  PM: IUser[];
  QA: IUser[];
  TL: IUser[];
  DEV: IUser[];
  DES: IUser[];
}
interface IViewAllStatus {
  PM: boolean;
  TL: boolean;
  DEV: boolean;
  DES: boolean;
  QA: boolean;
}

let currentUser: string = "";

// const userDetails: IUserDetails = {
//   totalProjects: 5,
//   totalAllocation: 80,
//   projects: [
//     {
//       name: "Project 1",
//       allocation: 10,
//       cost: "100",
//       status: "Pending",
//     },
//     {
//       name: "Project 2",
//       allocation: 20,
//       cost: "100",
//       status: "Pending",
//     },
//     {
//       name: "Project 3",
//       allocation: 20,
//       cost: "100",
//       status: "Pending",
//     },
//     {
//       name: "Project 4",
//       allocation: 10,
//       cost: "100",
//       status: "Pending",
//     },
//     {
//       name: "Project 5",
//       allocation: 20,
//       cost: "100",
//       status: "Pending",
//     },
//   ],
// };
let items = [
  {
    name: "Project 1",
    allocation: 10,
    cost: 100,
    status: "Pending",
  },
];

const Members = (props: IProps) => {
  const col: IColumn[] = [
    {
      key: "column1",
      name: "Project Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "column2",
      name: "Allocation",
      fieldName: "allocation",
      minWidth: 80,
      maxWidth: 150,
    },
    {
      key: "column3",
      name: "Status",
      fieldName: "Status",
      minWidth: 100,
      maxWidth: 120,
    },
    {
      key: "column4",
      name: "Project Cost",
      fieldName: "cost",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "column5",
      name: "Action",
      fieldName: "",
      minWidth: 30,
      maxWidth: 30,
      onRender: () => {
        return <VisibilityOutlined />;
      },
    },
  ];
  let _masterMembers: IMemberCategory = {
    PM: [],
    QA: [],
    TL: [],
    DEV: [],
    DES: [],
  };

  const [userInfo, setUserInfo] = useState<ISelectedUser>(null);
  const [datas, setDatas] = useState<IMemberCategory>({ ..._masterMembers });
  const [viewAllStatus, setViewAllStatus] = useState<IViewAllStatus>({
    PM: false,
    TL: false,
    DEV: false,
    DES: false,
    QA: false,
  });
  const [visibleSections, setVisibleSections] = useState({
    PM: 5,
    TL: 5,
    DEV: 5,
    DES: 5,
    QA: 5,
  });

  const handleViewFunction = (key: string) => {
    let _viewAllStatus = { ...viewAllStatus };
    let _visibleSection = { ...visibleSections };
    _viewAllStatus[key] = !_viewAllStatus[key];
    _visibleSection[key] =
      datas[key].length < 5 || _viewAllStatus[key] ? datas[key].length : 5;
    setViewAllStatus({ ..._viewAllStatus });
    setVisibleSections({ ..._visibleSection });
  };

  // current user get function
  const getCurrentUser = () => {
    sp.web.currentUser().then((user) => {
      currentUser = user ? user.Email : "";
      getPosition(currentUser);
    });
  };

  const getPosition = (currentUser: string) => {
    let allUsers: IUser[] = [
      ...props._masterUsersDetails[0].ProjectManagers,
      ...props._masterUsersDetails[0].TeamLeads,
      ...props._masterUsersDetails[0].Testers,
      ...props._masterUsersDetails[0].Designers,
      ...props._masterUsersDetails[0].Developers,
    ];

    let PM: IUser[] = [];
    let TL: IUser[] = [];
    let Developer: IUser[] = [];
    let Designer: IUser[] = [];
    let Tester: IUser[] = [];

    allUsers.forEach((user: IUser, index: number) => {
      if (user.Position == "PM") {
        PM.push({ ...user, Availablity: 10 });
      } else if (user.Position == "TL") {
        TL.push({ ...user, Availablity: 10 });
      } else if (user.Position == "Developer") {
        Developer.push({ ...user, Availablity: 10 });
      } else if (user.Position == "Designer") {
        Designer.push({ ...user, Availablity: 10 });
      } else if (user.Position == "Tester") {
        Tester.push({ ...user, Availablity: 10 });
      }

      if (index == allUsers.length - 1) {
        let _data: IMemberCategory = {
          PM: PM.length ? [...PM] : [],
          TL: TL.length ? [...TL] : [],
          DEV: Developer.length ? [...Developer] : [],
          DES: Designer.length ? [...Designer] : [],
          QA: Tester.length ? [...Tester] : [],
        };

        setDatas({ ..._data });
        getuserDetails(_data.PM[0]);
      }
    });
  };

  const getuserDetails = (user: IUser) => {
    let _allocation: number = 0;
    let _projects: IProject[] = [];
    let filteredArr: IMasterData[] = props.masterRecords.filter(
      (data: IMasterData) =>
        data.Members.some(
          (_user: IMember) => _user.Email.trim() == user.Email.trim()
        )
    );

    if (filteredArr.length > 0) {
      filteredArr.forEach((_data: IMasterData, index: number) => {
        _data.Members.forEach((_members: IMember) => {
          if (_members.Email == user.Email) {
            if (_data.Status != "Completed") {
              _allocation += _members.Allocation;
            }
            _projects.push({
              ID: _data.ID,
              name: _data.ProjectName,
              allocation: _members.Allocation,
              cost: _data.ProjectCost,
              status: _data.Status,
            });
          }
        });

        if (index == filteredArr.length - 1) {
          setUserInfo({
            ...user,
            Availablity: 100 - _allocation,
            userDetails: {
              totalProjects: _projects.length,
              totalAllocation: _allocation,
              projects: [..._projects],
            },
          });
        }
      });
    } else {
      setUserInfo({
        ...user,
        Availablity: 100 - _allocation,
        userDetails: {
          totalProjects: _projects.length,
          totalAllocation: _allocation,
          projects: [..._projects],
        },
      });
    }
  };

  // persona styles
  const personaStyle = {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "auto",
      /* Add any other styles specific to the persona */
    },

    image: {
      width: "150px",
      height: "150px",
      objectFit: "cover",
      /* Add any other styles specific to the image */
    },
    primaryText: {
      fontSize: "20px",
      textAlign: "center",

      /* Add any other styles specific to the persona name */
    },
    secondaryText: {
      fontSize: "16px",
      textAlign: "center",
      /* Add any other styles specific to the secondary text */
    },
  };

  const detailListStyle: Partial<IDetailsListStyles> = {
    root: {
      width: "100%",
      ".ms-DetailsHeader": {
        padding: 0,
        backgroundColor: "#e2ffd1",
      },
      ".ms-DetailsHeader-cell": {
        ":hover": {
          backgroundColor: "#e2ffd1",
        },
      },
      ".ms-DetailsHeader-cellTitle": {
        color: "#000",
      },
      ".ms-DetailsRow-cell": {
        color: "#000",
        height: 40,
        // fontSize:15
      },
    },
    contentWrapper: {
      height: "65vh",
      overflowX: "hidden",
      overflowY: "auto",
    },
  };

  const diableTextField: Partial<ITextFieldStyles> = {
    field: {
      border: "1px solid #E5E5E5 !important",
      textAlign: "center",
      color: "#181818",
      background: "none !important",
      borderRadius: 6,
    },
    fieldGroup: {
      background: "none !important",
    },
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div
      // style={{ width: "100%" }}
      className="FormContainer"
    >
      {/* Members Heading */}
      <div className="formHeaderFlex">
        <div className="arrowRightFlex">
          <Label>Members</Label>
        </div>
      </div>
      {/* section split */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "40%",
            backgroundColor: "#FFF",
            height: "500px",
            padding: "20px",
          }}
        >
          {/* managersection */}
          <div style={{ margin: "10px 0px 20px 0px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                width: "89%",
              }}
            >
              <Label className="roleStyle">{`Project Manager  (${datas.PM.length})`}</Label>
              {datas.PM.length > 5 && (
                <Label
                  className="viewAllBtn"
                  onClick={() => handleViewFunction("PM")}
                >
                  {viewAllStatus.PM ? "Collapse" : "View All"}
                </Label>
              )}
            </div>
            <div className="membersFlex">
              {datas.PM.slice(0, visibleSections.PM).map((user: IUser) => {
                return (
                  <div
                    onClick={() => {
                      getuserDetails(user);
                    }}
                  >
                    <Persona
                      size={PersonaSize.size48}
                      imageUrl={
                        "/_layouts/15/userphoto.aspx?size=S&username=" +
                        user.Email
                      }
                      styles={{
                        root: {
                          ".ms-Persona-coin": {
                            cursor: "pointer",
                          },
                        },
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team Leader   */}
          <div style={{ margin: "10px 0px 20px 0px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                width: "89%",
              }}
            >
              <Label className="roleStyle">{`Team Leader      (${datas.TL.length})`}</Label>
              {datas.TL.length > 5 && (
                <Label
                  // style={{ cursor: "pointer" }}
                  className="viewAllBtn"
                  onClick={() => handleViewFunction("TL")}
                >
                  {viewAllStatus.TL ? "Collapse" : "View All"}
                </Label>
              )}
            </div>
            <div className="membersFlex">
              {datas.TL.slice(0, visibleSections.TL).map((user: IUser) => {
                return (
                  <div
                    onClick={() => {
                      getuserDetails(user);
                    }}
                  >
                    <Persona
                      size={PersonaSize.size48}
                      imageUrl={
                        "/_layouts/15/userphoto.aspx?size=S&username=" +
                        user.Email
                      }
                      styles={{
                        root: {
                          ".ms-Persona-coin": {
                            cursor: "pointer",
                          },
                        },
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* DEVection */}
          <div style={{ margin: "10px 0px 20px 0px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                width: "89%",
              }}
            >
              <Label className="roleStyle">{`Developer      (${datas.DEV.length})`}</Label>
              {datas.DEV.length > 5 && (
                <Label
                  className="viewAllBtn"
                  onClick={() => handleViewFunction("DEV")}
                >
                  {viewAllStatus.DEV ? "Collapse" : "View All"}
                </Label>
              )}
            </div>
            <div className="membersFlex">
              {datas.DEV.slice(0, visibleSections.DEV).map((user: IUser) => {
                return (
                  <div
                    onClick={() => {
                      getuserDetails(user);
                    }}
                  >
                    <Persona
                      size={PersonaSize.size48}
                      imageUrl={
                        "/_layouts/15/userphoto.aspx?size=S&username=" +
                        user.Email
                      }
                      styles={{
                        root: {
                          ".ms-Persona-coin": {
                            cursor: "pointer",
                          },
                        },
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Designer section */}
          <div style={{ margin: "10px 0px 20px 0px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                width: "89%",
              }}
            >
              <Label className="roleStyle">{`Designer      (${datas.DES.length})`}</Label>
              {datas.DES.length > 5 && (
                <Label
                  className="viewAllBtn"
                  onClick={() => handleViewFunction("DES")}
                >
                  {viewAllStatus.DES ? "Collapse" : "View All"}
                </Label>
              )}
            </div>
            <div className="membersFlex">
              {datas.DES.slice(0, visibleSections.DES).map((user: IUser) => {
                return (
                  <div
                    onClick={() => {
                      getuserDetails(user);
                    }}
                  >
                    <Persona
                      size={PersonaSize.size48}
                      imageUrl={
                        "/_layouts/15/userphoto.aspx?size=S&username=" +
                        user.Email
                      }
                      styles={{
                        root: {
                          ".ms-Persona-coin": {
                            cursor: "pointer",
                          },
                        },
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* tester section */}
          <div style={{ margin: "10px 0px 20px 0px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                width: "89%",
              }}
            >
              <Label className="roleStyle">{`Tester      (${datas.QA.length})`}</Label>
              {datas.QA.length > 5 && (
                <Label
                  className="viewAllBtn"
                  onClick={() => handleViewFunction("QA")}
                >
                  {viewAllStatus.QA ? "Collapse" : "View All"}
                </Label>
              )}
            </div>
            <div className="membersFlex">
              {datas.QA.slice(0, visibleSections.QA).map((user: IUser) => {
                return (
                  <div
                    onClick={() => {
                      getuserDetails(user);
                    }}
                  >
                    <Persona
                      size={PersonaSize.size48}
                      imageUrl={
                        "/_layouts/15/userphoto.aspx?size=S&username=" +
                        user.Email
                      }
                      styles={{
                        root: {
                          ".ms-Persona-coin": {
                            cursor: "pointer",
                          },
                        },
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* rightsection */}
        <div
          // style={{
          //   width: "30%",
          //   height: "99vh",
          //   border: "1px solid #ddd",
          //   borderRadius: "8px",
          //   backgroundColor: "#fff",
          //   position: "absolute",
          //   right: 0,
          //   top: 0,
          // }}
          className="membersRightSection"
        >
          {userInfo != null && (
            <>
              <div style={{ padding: "20px 1px" }} className="profileDetails">
                <div className="profileLeft">
                  <Persona
                    size={PersonaSize.size120}
                    imageUrl={
                      "/_layouts/15/userphoto.aspx?size=L&username=" +
                      userInfo.Email
                    }
                    styles={personaStyle}
                    // text={userInfo.Displayname}
                    // secondaryText={userInfo.Position}
                  />
                </div>
                <div className="profileRight">
                  <div className="rightDiv">
                    <Label className="profileLabel">
                      {userInfo.Displayname}
                    </Label>

                    <Label
                      className="profileLabel"
                      style={{ fontSize: 15, marginTop: 11 }}
                    >
                      {userInfo.Position}
                    </Label>
                  </div>

                  <div className="rightDiv">
                    <div className="allocationBox">
                      <Label className="profileLabel">Assigned Projects </Label>{" "}
                      <span className="colan">:</span>
                      <div className="projectCostValue2">
                        <TextField
                          styles={diableTextField}
                          disabled
                          value="5"
                        />
                      </div>
                    </div>

                    <div className="allocationBox">
                      <Label className="profileLabel"> Allocation </Label>{" "}
                      <span className="colan">:</span>
                      <div className="projectCostValue2">
                        <TextField
                          styles={diableTextField}
                          disabled
                          value="100%"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div style={{ marginTop: 30 }}>
                  <div className="projectsFlex">
                    <Label className="totalProjectsLabel">Total Projects</Label>
                    <Label className="totalsLabel">
                      {userInfo.userDetails.totalProjects}
                    </Label>
                  </div>
                  <div className="projectsFlex">
                    <Label className="totalProjectsLabel">
                      Total Allocation
                    </Label>
                    <Label className="totalsLabel">
                      {userInfo.userDetails.totalAllocation}%
                    </Label>
                  </div>
                </div> */}
              </div>
              <Label className="projectDetailsHeader">Projects Details</Label>
              <div style={{ width: "100%" }}>
                <DetailsList
                  items={items}
                  columns={col}
                  selectionMode={SelectionMode.none}
                  styles={detailListStyle}
                />
              </div>

              {/*<div className="projectScroll">
                {userInfo.userDetails.projects.map((detail) => {
                  return (
                    <div>
                      <div className="singleProjectsBox">
                        <div className="singleProjects">
                          <p style={{ color: "#4ba665", marginBottom: 5 }}>
                            {detail.name}
                          </p>
                        </div>
                        <div className="singleProjects">
                          {" "}
                          <p>Allocation </p>{" "}
                          <span style={{ width: 5 }}>: </span>{" "}
                          <p> {detail.allocation}</p>
                        </div>
                        <div className="singleProjects">
                          {" "}
                          <p>Cost</p> <span style={{ width: 5 }}>: </span>{" "}
                          <p> {detail.cost}</p>
                        </div>
                        <div className="singleProjects">
                          {" "}
                          <p>Status</p> <span style={{ width: 5 }}>: </span>{" "}
                          <p
                            style={
                              detail.status == "Pending"
                                ? { color: "#F0BB00" }
                                : detail.status == "Completed"
                                ? { color: "#A9F37F" }
                                : null
                            }
                          >
                            {detail.status}
                          </p>
                        </div>
                         <Label> Allocation : {detail.allocation}%</Label> 
                         <Label> Cost : {detail.cost}</Label> 
                         <Label> Status : {detail.status}</Label> 
                      </div>
                    </div>
                  );
                })}
                {/* {userInfo.userDetails.projects.length > 4 && (
                  <div style={{ display: "flex" }}>
                    <Label onClick={() => {}}>See more ...</Label>
                  </div>
                )} 
              </div>*/}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;
