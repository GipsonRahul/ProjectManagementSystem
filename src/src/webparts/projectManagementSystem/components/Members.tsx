import * as React from "react";
import { useEffect, useState } from "react";
import { Label, Persona, PersonaSize } from "@fluentui/react";
import { sp } from "@pnp/sp/presets/all";

interface IMember {
  Displayname: string;
  Email: string;
  Position: string;
  Availablity: number;
  ID: number;
}
interface IProps {
  masterRecords: any[];
  _masterUsersDetails: {
    ProjectManagers: IMember[];
    Developers: IMember[];
    TeamLeads: IMember[];
    Testers: IMember[];
    Designers: IMember[];
  }[];
  sp: any;
  context: any;
}
interface IUserDetails {
  totalProjects: number;
  totalAllocation: number;
  projects: IProject[];
}
interface IProject {
  name: string;
  allocation: number;
  cost: number;
  status: string;
}

interface IUser {
  Displayname: string;
  Email: string;
  Position: string;
  Availablity: number;
  ID: number;
  userDetails: IUserDetails;
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

const userDetails: IUserDetails = {
  totalProjects: 5,
  totalAllocation: 80,
  projects: [
    {
      name: "Project 1",
      allocation: 10,
      cost: 100,
      status: "Pending",
    },
    {
      name: "Project 2",
      allocation: 20,
      cost: 100,
      status: "Pending",
    },
    {
      name: "Project 3",
      allocation: 20,
      cost: 100,
      status: "Pending",
    },
    {
      name: "Project 4",
      allocation: 10,
      cost: 100,
      status: "Pending",
    },
    {
      name: "Project 5",
      allocation: 20,
      cost: 100,
      status: "Pending",
    },
  ],
};

const Members = (props: IProps) => {
  let _masterMembers: IMemberCategory = {
    PM: [],
    QA: [],
    TL: [],
    DEV: [],
    DES: [],
  };

  const [userInfo, setDetail] = useState<IUser>(null);
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
      getPosition();
    });
  };

  const getPosition = () => {
    let allUsers: IMember[] = [
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

    allUsers.forEach((user: IMember, index: number) => {
      if (user.Position == "PM") {
        PM.push({ ...user, Availablity: 10, userDetails: userDetails });
      } else if (user.Position == "TL") {
        TL.push({ ...user, Availablity: 10, userDetails: userDetails });
      } else if (user.Position == "Developer") {
        Developer.push({ ...user, Availablity: 10, userDetails: userDetails });
      } else if (user.Position == "Designer") {
        Designer.push({ ...user, Availablity: 10, userDetails: userDetails });
      } else if (user.Position == "Tester") {
        Tester.push({ ...user, Availablity: 10, userDetails: userDetails });
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
        setDetail({ ..._data.PM[0] });
      }
    });
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
            width: "70%",
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
            <div style={{ display: "flex", gap: "20px" }}>
              {datas.PM.slice(0, visibleSections.PM).map((val) => {
                return (
                  <div onClick={() => setDetail(val)}>
                    <Persona
                      size={PersonaSize.size48}
                      imageUrl={
                        "/_layouts/15/userphoto.aspx?size=S&username=" +
                        val.Email
                      }
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
            <div style={{ display: "flex", gap: "20px" }}>
              {datas.TL.slice(0, visibleSections.TL).map((val) => {
                return (
                  <div onClick={() => setDetail(val)}>
                    <Persona
                      size={PersonaSize.size48}
                      imageUrl={
                        "/_layouts/15/userphoto.aspx?size=S&username=" +
                        val.Email
                      }
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
            <div style={{ display: "flex", gap: "20px" }}>
              {datas.DEV.slice(0, visibleSections.DEV).map((val) => {
                return (
                  <div onClick={() => setDetail(val)}>
                    <Persona
                      size={PersonaSize.size48}
                      imageUrl={
                        "/_layouts/15/userphoto.aspx?size=S&username=" +
                        val.Email
                      }
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
            <div style={{ display: "flex", gap: "20px" }}>
              {datas.DES.slice(0, visibleSections.DES).map((val) => {
                return (
                  <div onClick={() => setDetail(val)}>
                    <Persona
                      size={PersonaSize.size48}
                      imageUrl={
                        "/_layouts/15/userphoto.aspx?size=S&username=" +
                        val.Email
                      }
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
            <div style={{ display: "flex", gap: "20px" }}>
              {datas.QA.slice(0, visibleSections.QA).map((val) => {
                return (
                  <div onClick={() => setDetail(val)}>
                    <Persona
                      size={PersonaSize.size48}
                      imageUrl={
                        "/_layouts/15/userphoto.aspx?size=S&username=" +
                        val.Email
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* rightsection */}
        <div
          style={{
            width: "30%",
            height: "99vh",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff",
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          {userInfo ? (
            <>
              <div style={{ padding: 20 }}>
                <div>
                  <Persona
                    size={PersonaSize.size120}
                    imageUrl={
                      "/_layouts/15/userphoto.aspx?size=S&username=" +
                      userInfo.Email
                    }
                    styles={personaStyle}
                    text={userInfo.Displayname}
                    secondaryText={userInfo.Position}
                  />
                </div>
                <div style={{ marginTop: 30 }}>
                  <div className="projectsFlex">
                    <Label className="totalProjectsLabel">Total Projects</Label>
                    <Label className="totalsLabel">
                      {userDetails.totalProjects}
                    </Label>
                  </div>
                  <div className="projectsFlex">
                    <Label className="totalProjectsLabel">
                      Total Allocation
                    </Label>
                    <Label className="totalsLabel">
                      {userDetails.totalAllocation}%
                    </Label>
                  </div>
                </div>
              </div>
              <Label className="projectDetailsHeader">Projects Details</Label>
              <div className="projectScroll">
                {userDetails.projects.map((detail) => {
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
                        {/* <Label> Allocation : {detail.allocation}%</Label> */}
                        {/* <Label> Cost : {detail.cost}</Label> */}
                        {/* <Label> Status : {detail.status}</Label> */}
                      </div>
                    </div>
                  );
                })}
                {userDetails.projects.length > 4 && (
                  <div style={{ display: "flex" }}>
                    <Label onClick={() => {}}>See more ...</Label>
                  </div>
                )}
              </div>
              {/* </div> */}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Members;
