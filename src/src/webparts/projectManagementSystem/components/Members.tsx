import * as React from "react";
import { useEffect, useState } from "react";
import { Label, Persona, PersonaSize, Modal } from "@fluentui/react";
import { Close, Visibility } from "@material-ui/icons";

interface IMember {
  Displayname: string;
  Firstname: string;
  Lastname: string;
  Email: string;
  Position: string;
  ID: number;
  userDetails: any;
}
interface IMemberCategory {
  PM: IMember[];
  QA: IMember[];
  TL: IMember[];
  DEV: IMember[];
  DES: IMember[];
  setModal: any;
}
interface IViewAllStatus {
  PM: boolean;
  TL: boolean;
  DEV: boolean;
  DES: boolean;
  QA: boolean;
}

const userDetails = {
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

const Members = (props: any) => {
  let _masterMembers: IMemberCategory = {
    PM: [],
    QA: [],
    TL: [],
    DEV: [],
    DES: [],
    setModal: {},
  };

  const [userInfo, setDetail] = useState<IMember>({
    Displayname: "Devaraj P",
    Firstname: "Devaraj",
    Lastname: "P",
    Email: "devaraj@gmail.com",
    Position: "Developer",
    ID: 1,
    userDetails: userDetails,
  });
  const [datas, setDatas] = useState<IMemberCategory>({ ..._masterMembers });

  const [viewAllStatus, setViewAllStatus] = useState<IViewAllStatus>({
    PM: false,
    TL: false,
    DEV: false,
    DES: false,
    QA: false,
  });

  const [visibleSections, setVisibleSections] = useState({
    PM: 3,
    TL: 3,
    DEV: 3,
    DES: 3,
    QA: 3,
  });

  const handleViewFunction = (key: string) => {
    let _viewAllStatus = { ...viewAllStatus };
    let _visibleSection = { ...visibleSections };

    _viewAllStatus[key] = !_viewAllStatus[key];

    _visibleSection[key] =
      datas[key].length < 3 || _viewAllStatus[key] ? datas[key].length : 3;

    setViewAllStatus({ ..._viewAllStatus });
    setVisibleSections({ ..._visibleSection });
  };

  const getPosition = () => {
    let PM = props._masterUsersDetails[0].ProjectManagers;
    let DEV = props._masterUsersDetails[0].Developers;
    let TL = props._masterUsersDetails[0].TeamLeads;

    let QA = props._masterUsersDetails[0].Testers;

    let Designer = props._masterUsersDetails[0].Designers;

    datas.PM = PM.length ? PM : [];
    datas.TL = TL.length ? TL : [];
    datas.QA = QA.length ? QA : [];
    datas.DEV = DEV.length ? DEV : [];
    datas.DES = Designer.length ? Designer : [];
    setDatas({ ...datas });
  };

  const styles = {
    root: {
      display: "flex", // Apply display: flex to the root container
      alignItems: "center", // Optional: Align items vertically
      gap: "10px", // Optional: Set gap between child elements
    },
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
    getPosition();
  }, []);

  return (
    <div
      // style={{ width: "100%" }}
      className="FormContainer"
    >
      {/* Members Heading */}
      <div
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   margin: "10px 20px",
        //   alignItems: "center",
        // }}
        className="formHeaderFlex"
      >
        <div className="arrowRightFlex">
          <Label>Members</Label>
        </div>
        <div
          // style={{
          //   display: "flex",
          //   alignItems: "center",
          // }}
          className="loginLeftFlex"
        >
          <div
            // style={{
            //   marginRight: "20px",
            // }}
            className="nameandEmail"
          >
            <div>
              <Label style={{ color: "#1d1d7c", fontSize: 16 }}>Deva Raj</Label>
            </div>
            <div>
              <Label style={{ fontSize: 14, fontWeight: "unset" }}>
                devaraj.p@technorucs.com
              </Label>
            </div>
          </div>
          <Persona
            size={PersonaSize.size32}
            imageUrl={
              "/_layouts/15/userphoto.aspx?size=S&username=" +
              "devaraj.p@technorucs.com"
            }
          />
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
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Label>{`Project Manager  (${datas.PM.length})`}</Label>
              {datas.PM.length > 5 && (
                <Label
                  // style={{ cursor: "pointer" }}
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
                      size={PersonaSize.size32}
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

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Label>{`Team Leader      (${datas.TL.length})`}</Label>
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
                      size={PersonaSize.size32}
                      imageUrl={
                        "/_layouts/15/userphoto.aspx?size=S&username=" +
                        val.Email
                      }
                      // styles={styles}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* DEVection */}

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Label>{`Developer      (${datas.DEV.length})`}</Label>
              {datas.DEV.length > 5 && (
                <Label
                  // style={{ cursor: "pointer" }}
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
                      size={PersonaSize.size32}
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

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Label>{`Designer      (${datas.DES.length})`}</Label>
              {datas.DES.length > 5 && (
                <Label
                  // style={{ cursor: "pointer" }}
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
                      size={PersonaSize.size32}
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

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Label>{`Tester      (${datas.QA.length})`}</Label>
              {datas.QA.length > 5 && (
                <Label
                  // style={{ cursor: "pointer" }}
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
                      size={PersonaSize.size32}
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
            height: "90vh",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff",
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
                  {/* <Label className="membersProjectName">Projects</Label> */}
                  <div
                    // style={{ display: "flex" }}
                    className="projectsFlex"
                  >
                    <Label className="totalProjectsLabel">Total Projects</Label>
                    <Label className="totalsLabel">
                      {userDetails.totalProjects}
                    </Label>
                  </div>
                  <div
                    // style={{ display: "flex" }}
                    className="projectsFlex"
                  >
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
              <div
                // style={{ marginTop: 30 }}
                className="projectScroll"
              >
                {userDetails.projects.map((detail) => {
                  return (
                    <div>
                      <div className="singleProjectsBox">
                        <div className="singleProjects">
                          {" "}
                          {/* <p>Project Name </p>{" "}
                          <span style={{ width: 5 }}>:</span>{" "} */}
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
