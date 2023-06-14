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
  IModalStyles,
  Modal,
} from "@fluentui/react";
import { sp } from "@pnp/sp/presets/all";
import {
  VisibilityOutlined,
  Close,
  CheckCircleOutline,
  PermIdentity,
} from "@material-ui/icons";

const noDataFoundDB = require("../assets/NoProject.gif");

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
      fieldName: "status",
      minWidth: 100,
      maxWidth: 120,
      onRender: (item: any) => {
        return (
          <div
            style={{
              textAlign: "center",
              background:
                item.status.toLowerCase() == "active"
                  ? "#A9F37F"
                  : item.status.toLowerCase() == "inactive"
                  ? "#FF285C"
                  : item.status.toLowerCase() == "on hold"
                  ? "#F0BB00"
                  : "#0f0",
              borderRadius: "30px",
              padding: "6px",
            }}
          >
            {item.status}
          </div>
        );
      },
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
      onRender: (item: IProject) => {
        return (
          <VisibilityOutlined
            style={{
              cursor: "pointer",
              marginRight: "5px",
              color: "#2264e6",
            }}
            onClick={() => {
              let _curObject: IMasterData = props.masterRecords.filter(
                (data: IMasterData) => data.ID == item.ID
              )[0];
              setModalObj({ ..._curObject });
              setIsModalOpen(true);
            }}
          />
        );
      },
    },
  ];

  const roleAcronyms = {
    PM: "Project Manager",
    TL: "Team Lead",
    Designer: "Designer",
    Tester: "Tester",
    Developer: "Developer",
  };

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
  const [modalObj, setModalObj] = useState<IMasterData>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const modalStyle: Partial<IModalStyles> = {
    main: {
      borderRadius: 10,
      padding: 10,
      width: "70%",
    },
  };

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

  const detailListNoDataStyle: Partial<IDetailsListStyles> = {
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
      display: "none",
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
        <div className="membersRightSection">
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
                  />
                </div>
                <div className="profileRight">
                  <div className="rightDiv">
                    <Label
                      className="profileLabel"
                      style={{ color: "#1d1d7c" }}
                    >
                      {userInfo.Displayname}
                    </Label>

                    <Label
                      className="profileLabel"
                      style={{ fontSize: 14, marginTop: 11, fontWeight: 500 }}
                    >
                      {roleAcronyms[userInfo.Position]}
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
                          value={userInfo.userDetails.projects.length.toString()}
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
                          value={userInfo.userDetails.totalAllocation.toString()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Label className="projectDetailsHeader">Projects Details</Label>
              <div style={{ width: "100%" }}>
                <DetailsList
                  items={userInfo.userDetails.projects}
                  columns={col}
                  selectionMode={SelectionMode.none}
                  styles={
                    userInfo.userDetails.projects.length
                      ? detailListStyle
                      : detailListNoDataStyle
                  }
                />
                {userInfo.userDetails.projects.length == 0 && (
                  <div className="gifAlign">
                    <img
                      src={`${noDataFoundDB}`}
                      alt=""
                      style={{
                        width: "40%",
                        height: "54vh",
                      }}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal box section */}
      {modalObj && (
        <Modal styles={modalStyle} isOpen={isModalOpen}>
          <div className="modalContainer">
            <Label>{modalObj.ProjectType}</Label>
            <Close
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
          </div>
          <div className="modalHeaderFlex">
            <Label style={{ fontSize: 20, fontWeight: 600 }}>
              {modalObj.ProjectName}
            </Label>
            <div className="textFlex">
              <div className="textFlex">
                <CheckCircleOutline style={{ marginRight: 10 }} />
                <Label className="modalHeadRightFlex">Status</Label>
              </div>
              <Label
                className="modalHeadStatusIndicator"
                style={{
                  background:
                    modalObj.Status.toLowerCase() == "active"
                      ? "#A9F37F"
                      : modalObj.Status.toLowerCase() == "inactive"
                      ? "#FF285C"
                      : modalObj.Status.toLowerCase() == "on hold"
                      ? "#F0BB00"
                      : "#0f0",
                }}
              >
                {modalObj.Status}
              </Label>
            </div>
          </div>
          <div className="modalProjectDescrip">
            <Label className="ProjectDescripLabel">Project Description</Label>
            <p className="modalDescription">{modalObj.ProjectDescription}</p>
          </div>
          <div className="modalProjectDescrip">
            <Label className="ProjectDescripLabel">Users</Label>
            <div
              style={{
                display: "flex",
                margin: "10px 0px",
                alignItems: "center",
              }}
            >
              <PermIdentity className="userIcon" />
              <Label className="userRole">Project Manager</Label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <Persona
                  styles={{
                    root: {
                      display: "unset",
                    },
                  }}
                  size={PersonaSize.size32}
                  imageUrl={
                    "/_layouts/15/userphoto.aspx?size=S&username=" +
                    modalObj.Members.filter((user) => user.Role == "PM")[0]
                      .Email
                  }
                />
                <Label>
                  {modalObj.Members.filter((user) => user.Role == "PM")[0].Name}
                </Label>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                margin: "10px 0px",
                alignItems: "center",
              }}
            >
              <PermIdentity className="userIcon" />
              <Label className="userRole">Team Lead</Label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <Persona
                  styles={{
                    root: {
                      display: "unset",
                    },
                  }}
                  size={PersonaSize.size32}
                  imageUrl={
                    "/_layouts/15/userphoto.aspx?size=S&username=" +
                    modalObj.Members.filter((user) => user.Role == "TL")[0].Name
                  }
                />
                <Label>
                  {modalObj.Members.filter((user) => user.Role == "TL")[0].Name}
                </Label>
              </div>
            </div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                // margin: "10px 0px",
              }}
            >
              <PermIdentity className="userIcon" />
              <Label className="userRole">Developers</Label>
              <div className="personWidth">
                {modalObj.Members.filter((user) => user.Role == "Developer")
                  .length &&
                  modalObj.Members.filter(
                    (user) => user.Role == "Developer"
                  ).map((user: any) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          width: "20%",
                          gap: "10%",
                          marginBottom: 10,
                          alignItems: "center",
                        }}
                      >
                        <Persona
                          styles={{
                            root: {
                              display: "unset",
                            },
                          }}
                          size={PersonaSize.size32}
                          imageUrl={
                            "/_layouts/15/userphoto.aspx?size=S&username=" +
                            user.Email
                          }
                        />
                        <Label className="designPersonLabel">{user.Name}</Label>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div
              style={{
                margin: "10px 0px",
                alignItems: "center",
                display: "flex",
              }}
            >
              <PermIdentity className="userIcon" />
              <Label className="userRole">Designer</Label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <Persona
                  styles={{
                    root: {
                      display: "unset",
                    },
                  }}
                  size={PersonaSize.size32}
                  imageUrl={
                    "/_layouts/15/userphoto.aspx?size=S&username=" +
                    modalObj.Members.filter(
                      (user) => user.Role == "Designer"
                    )[0].Email
                  }
                />
                <Label>
                  {
                    modalObj.Members.filter(
                      (user) => user.Role == "Designer"
                    )[0].Name
                  }
                </Label>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "10px 0px",
              }}
            >
              <PermIdentity className="userIcon" />
              <Label className="userRole">QA Tester</Label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <Persona
                  styles={{
                    root: {
                      display: "unset",
                    },
                  }}
                  size={PersonaSize.size32}
                  imageUrl={
                    "/_layouts/15/userphoto.aspx?size=S&username=" +
                    modalObj.Members.filter((user) => user.Role == "Tester")[0]
                      .Email
                  }
                />
                <Label>
                  {
                    modalObj.Members.filter((user) => user.Role == "Tester")[0]
                      .Name
                  }
                </Label>
              </div>
            </div>
          </div>
          <div
            style={{
              margin: " 10px 20px 20px 20px",
              // borderBottom: "2px solid #dee1e6",
            }}
          >
            <div style={{ display: "flex", margin: "5px 0px" }}>
              <Label className="projectCost">Project Cost</Label>
              <div className="projectCostValue">
                <TextField
                  styles={diableTextField}
                  disabled
                  value={modalObj.ProjectCost}
                />
              </div>
            </div>
            <div style={{ display: "flex", margin: "5px 0px" }}>
              <Label className="projectCost">Project Estimation</Label>
              <div className="projectCostValue">
                <TextField
                  styles={diableTextField}
                  disabled
                  value={modalObj.ProjectEstimate}
                />
              </div>
            </div>
            <div style={{ display: "flex", margin: "5px 0px" }}>
              <Label className="projectCost">Actual Cost</Label>
              <div className="projectCostValue">
                <TextField
                  styles={diableTextField}
                  disabled
                  value={modalObj.ActualCost}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Members;
