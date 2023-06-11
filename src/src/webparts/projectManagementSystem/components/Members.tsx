import * as React from "react";
import { useEffect, useState } from "react";
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
import { Position } from "office-ui-fabric-react";

const Users: any[] = require("../../../ExternalJSON/Users.json");

const Members = () => {
  let _masterMembers: any[] = [
    {
      PM: [],
      QA: [],
      TL: [],
      DEV: [],
      DES: [],
    },
  ];

  const [detail, setDeatail] = useState(null);
  const [datas, setDatas] = useState(_masterMembers);

  // setDatas({ ...datas });

  const [visibleSections, setVisibleSections] = useState({
    PM: 5,
    TL: 5,
    DEV: 5,
    DES: 5,
    QA: 5,
  });

  const handleViewAll = (section, number) => {
    setVisibleSections((prevState) => ({
      ...prevState,
      [section]: number,
    }));
  };

  const getPosition = () => {
    // let _masterArray: any[] = [];
    // _masterArray = Users.map((item, index) => {
    //   return item.Position;
    // });
    // setPosition([..._masterArray]);
    let PM = Users.filter((val) => val.Position == "Project Manager");
    let DEV = Users.filter((val) => val.Position == "Developer");
    let TL = Users.filter((val) => val.Position == "Team Lead");
    let QA = Users.filter((val) => val.Position == "Tester");
    let Designer = Users.filter((val) => val.Position == "Designer");

    datas[0].PM = PM.length ? PM : [];
    datas[0].TL = TL.length ? TL : [];
    datas[0].QA = QA.length ? QA : [];
    datas[0].DEV = DEV.length ? DEV : [];
    datas[0].DES = Designer.length ? Designer : [];
    setDatas([...datas]);
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
    <div style={{ width: "100%" }}>
      {/* Members Heading */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 20px",
          alignItems: "center",
        }}
      >
        <Label>Members</Label>
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
              <Label>devaraj.p@technorucs.com</Label>
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
              <Label>{`Project Manager  (${datas[0].PM.length})`}</Label>
              {datas[0].PM.length > 5 && (
                <Label onClick={() => handleViewAll("PM", datas[0].PM.length)}>
                  View All
                </Label>
              )}
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {datas[0].PM.slice(0, visibleSections.PM).map((val) => {
                return (
                  <div onClick={() => setDeatail(val)}>
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
              <Label>{`Team Leader      (${datas[0].TL.length})`}</Label>
              {datas[0].TL.length > 5 && (
                <Label onClick={() => handleViewAll("TL", datas[0].PM.length)}>
                  View All
                </Label>
              )}
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {datas[0].TL.slice(0, visibleSections.TL).map((val) => {
                return (
                  <div onClick={() => setDeatail(val)}>
                    <Persona
                      size={PersonaSize.size32}
                      imageUrl={
                        "/_layouts/15/userphoto.aspx?size=S&username=" +
                        val.Email
                      }
                      styles={styles}
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
              <Label>{`Developer      (${datas[0].DEV.length})`}</Label>
              {datas[0].DEV.length > 5 && (
                <Label onClick={() => handleViewAll("DEV", datas[0].PM.length)}>
                  View All
                </Label>
              )}
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {datas[0].DEV.slice(0, visibleSections.DEV).map((val) => {
                return (
                  <div onClick={() => setDeatail(val)}>
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
              <Label>{`Designer      (${datas[0].DES.length})`}</Label>
              {datas[0].DES.length > 5 && (
                <Label
                  onClick={() => handleViewAll("DES", datas[0].DES.length)}
                >
                  View All
                </Label>
              )}
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {datas[0].DES.slice(0, visibleSections.DES).map((val) => {
                return (
                  <div onClick={() => setDeatail(val)}>
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
              <Label>{`Tester      (${datas[0].QA.length})`}</Label>
              {datas[0].QA.length > 5 && (
                <Label onClick={() => handleViewAll("QA", datas[0].QA.length)}>
                  View All
                </Label>
              )}
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {datas[0].QA.slice(0, visibleSections.QA).map((val) => {
                return (
                  <div onClick={() => setDeatail(val)}>
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
            height: "500px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          {detail ? (
            <div style={{ padding: "20px" }}>
              <div>
                <Persona
                  size={PersonaSize.size120}
                  imageUrl={
                    "/_layouts/15/userphoto.aspx?size=S&username=" +
                    detail.Email
                  }
                  styles={personaStyle}
                  text={detail.Displayname}
                  secondaryText={detail.Position}
                />
              </div>
              <div style={{ marginTop: "30px" }}>
                <Label style={{ textAlign: "center" }}>
                  Total Projects{" "}
                  <span
                    style={{
                      marginLeft: "50px",
                      border: "1px solid #ddd",
                      padding: "8px 15px",
                      borderRadius: "4px",
                    }}
                  >
                    1
                  </span>
                </Label>
              </div>
              <div style={{ marginTop: "50px" }}>
                <Label style={{ textAlign: "center" }}>Team Count</Label>

                <div style={{ marginTop: "30px" }}>
                  <Label style={{ textAlign: "center" }}>
                    Total Projects{" "}
                    <span
                      style={{
                        marginLeft: "50px",
                        border: "1px solid #ddd",
                        padding: "8px 15px",
                        borderRadius: "4px",
                      }}
                    >
                      1
                    </span>
                  </Label>
                </div>

                <div style={{ marginTop: "30px" }}>
                  <Label style={{ textAlign: "center", color: "#4B4B4B" }}>
                    Total Projects{" "}
                    <span
                      style={{
                        marginLeft: "50px",
                        border: "1px solid #ddd",
                        padding: "8px 15px",
                        borderRadius: "4px",
                      }}
                    >
                      1
                    </span>
                  </Label>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Members;
