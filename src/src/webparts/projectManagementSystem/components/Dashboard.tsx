import * as React from "react";
import { useState, useEffect } from "react";
import {
  Label,
  DetailsList,
  Persona,
  PersonaSize,
  Dropdown,
  Modal,
} from "@fluentui/react";
import {
  Add,
  Apps,
  List,
  MoreVert,
  Visibility,
  Edit,
  Delete,
  Close,
} from "@material-ui/icons";
import { SelectionMode } from "office-ui-fabric-react";
import * as moment from "moment";

interface IDetails {
  DisplayName: string;
  Email: string;
}

interface IMasterData {
  ID: number;
  ProjectName: string;
  ProjectType: string;
  ProjectDescription: string;
  Status: string;
  StartDate: any;
  EndDate: any;
  ProjectManager: IDetails;
  TeamLead: IDetails;
  Developers: IDetails[];
  DevelopersEmail: string[];
  Designers: IDetails;
  Testers: IDetails;
  Members: IDetails[];
  ProjectCost: string;
  ProjectEstimate: string;
  ActualCost: string;
  isSelect: boolean;
}

let _masterData: IMasterData[] = [];

const Dashboard = (props: any) => {
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
      minWidth: 80,
      maxWidth: 100,
    },
    {
      key: "column3",
      name: "Start date",
      fieldName: "StartDate",
      minWidth: 100,
      maxWidth: 120,
      onRender: (item: any) => moment(item.StartDate).format("MM/DD/YYYY"),
    },
    {
      key: "column4",
      name: "Project Type",
      fieldName: "ProjectType",
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
      name: "Members",
      fieldName: "Members",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: any) => {
        return (
          <p style={{ display: "flex" }}>
            {item.Members.length
              ? item.Members.map((e: any) => {
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
      minWidth: 80,
      maxWidth: 100,
      onRender: (item: any, i: number) => {
        return (
          <div style={{ display: "flex", gap: "1%" }}>
            <Visibility
              style={{ cursor: "pointer", marginRight: "5px" }}
              onClick={() => {
                getOnClick(0);
                setModalObj({ ...item });
                setIsModalOpen(true);
              }}
            />
            <Edit
              style={{ cursor: "pointer", marginRight: "5px" }}
              onClick={() => {
                props.navigation("formdashboard", item);
              }}
            />
            <Delete
              style={{ cursor: "pointer" }}
              onClick={() => {
                masterFilData.splice(i, 1);
                setMasterFilData([...masterFilData]);
              }}
            />
          </div>
        );
      },
    },
  ];

  // list Datas
  let sampleDatas: any[] = [
    {
      ProjectName: "Project Test 001",
      Status: "Active",
      StartDate: "06/09/2023",
      ProjectType: "SPFx",
      ProjectManager: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      TeamLead: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Members: [
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
      ],
      ID: 1,
      isSelect: false,
    },
    {
      ProjectName: "Project Test 002",
      Status: "Inactive",
      StartDate: "06/10/2023",
      ProjectType: "PowerApps",
      ProjectManager: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      TeamLead: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Members: [
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
      ],
      ID: 2,
      isSelect: false,
    },
    {
      ProjectName: "Project Test 003",
      Status: "On hold",
      StartDate: "06/11/2023",
      ProjectType: "PowerAutoMate",
      ProjectManager: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      TeamLead: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Members: [
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
      ],
      ID: 3,
      isSelect: false,
    },
    {
      ProjectName: "Project Test 004",
      Status: "Active",
      StartDate: "06/12/2023",
      ProjectType: "Full Stack",
      ProjectManager: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      TeamLead: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Members: [
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
      ],
      ID: 4,
      isSelect: false,
    },
    {
      ProjectName: "Project Test 005",
      Status: "Completed",
      StartDate: "06/13/2023",
      ProjectType: "Sales Force",
      ProjectManager: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      TeamLead: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Members: [
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
      ],
      ID: 5,
      isSelect: false,
    },
    {
      ProjectName: "Project Test 006",
      Status: "Active",
      StartDate: "06/14/2023",
      ProjectType: "SPFx",
      ProjectManager: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      TeamLead: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Members: [
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
        "devaraj@chandrudemo.onmicrosoft.com",
      ],
      ID: 6,
      isSelect: false,
    },
  ];

  // State section start
  const [masterFilData, setMasterFilData] = useState<IMasterData[]>([]);
  const [finalFilData, setFinalFilData] = useState<IMasterData[]>([]);
  const [modalObj, setModalObj] = useState<IMasterData>();
  const [isListView, setIsListView] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filStatusBar, setFilStatusBar] = useState<string>("all");
  // State section end

  // onClick change function
  const getOnClick = (Id: number) => {
    let _masterPopupArray: IMasterData[] = [];
    masterFilData.forEach((e: IMasterData) => {
      if (e.ID == Id) {
        e.isSelect = e.isSelect ? false : true;
        _masterPopupArray.push({ ...e });
      } else {
        e.isSelect = false;
        _masterPopupArray.push({ ...e });
      }
    });
    setMasterFilData([..._masterPopupArray]);
  };

  // Filter function section
  const getFilter = (value: string) => {
    setFilStatusBar(value);
    let _masterRecord: IMasterData[] = [...finalFilData];
    let _filterMasterDatas: IMasterData[] = [];
    if (_masterRecord.length) {
      for (let i = 0; _masterRecord.length > i; i++) {
        if (value == "all") {
          _masterRecord[i].isSelect = false;
          _filterMasterDatas.push({ ..._masterRecord[i] });
        } else if (_masterRecord[i].Status.toLowerCase() == value) {
          _masterRecord[i].isSelect = false;
          _filterMasterDatas.push({ ..._masterRecord[i] });
        }
        if (_masterRecord.length == i + 1) {
          setMasterFilData([..._filterMasterDatas]);
        }
      }
    } else {
      setMasterFilData([]);
    }
  };

  // life cycle function for onload
  useEffect(() => {
    _masterData = props.masterRecords ? props.masterRecords : [];
    setFinalFilData([..._masterData]);
    setMasterFilData([..._masterData]);
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
          alignItems: "center",
        }}
      >
        {/* New btn section */}
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
            onClick={() => {
              props.getMasterDatas("new", masterFilData);
              props.navigation("formdashboard");
            }}
          >
            <Add />
            <Label style={{ cursor: "pointer", color: "#000" }}>New</Label>
          </button>
        </div>

        {/* Right navebar section */}
        <div
          style={{
            border: "1px solid #dfdfdf",
            display: "flex",
            justifyContent: "space-between",
            width: "85%",
            alignItems: "center",
            height: "40px",
            padding: "4px",
          }}
        >
          {/* Status filter secction */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* All datas */}
            <Label
              style={{
                margin: "5px 10px",
                cursor: "pointer",
                color: filStatusBar == "all" && "#5cff00",
                borderBottom: filStatusBar == "all" && "2px solid #5cff00",
              }}
              onClick={() => {
                getFilter("all");
              }}
            >
              All
            </Label>

            {/* Active datas */}
            <Label
              style={{
                margin: "5px 10px",
                cursor: "pointer",
                color: filStatusBar == "active" && "#5cff00",
                borderBottom: filStatusBar == "active" && "2px solid #5cff00",
              }}
              onClick={() => {
                getFilter("active");
              }}
            >
              Active
            </Label>

            {/* Inactive datas */}
            <Label
              style={{
                margin: "5px 10px",
                cursor: "pointer",
                color: filStatusBar == "inactive" && "#5cff00",
                borderBottom: filStatusBar == "inactive" && "2px solid #5cff00",
              }}
              onClick={() => {
                getFilter("inactive");
              }}
            >
              Inactive
            </Label>

            {/* On hold datas */}
            <Label
              style={{
                margin: "5px 10px",
                cursor: "pointer",
                color: filStatusBar == "on hold" && "#5cff00",
                borderBottom: filStatusBar == "on hold" && "2px solid #5cff00",
              }}
              onClick={() => {
                getFilter("on hold");
              }}
            >
              On hold
            </Label>

            {/* Completed datas */}
            <Label
              style={{
                margin: "5px 10px",
                cursor: "pointer",
                color: filStatusBar == "completed" && "#5cff00",
                borderBottom:
                  filStatusBar == "completed" && "2px solid #5cff00",
              }}
              onClick={() => {
                getFilter("completed");
              }}
            >
              Completed
            </Label>
          </div>

          {/* List and Cards navigation section */}
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
                  masterFilData.length &&
                    masterFilData.forEach(
                      (item: IMasterData) => (item.isSelect = false)
                    );
                  setIsListView(false);
                }}
              />
            ) : (
              <List
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  masterFilData.length &&
                    masterFilData.forEach(
                      (item: IMasterData) => (item.isSelect = false)
                    );
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
        {/* Status filter section */}
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

        {/* Project type filter section */}
        <div style={{ width: "26%" }}>
          <Dropdown
            placeholder="Select an project type"
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
            {masterFilData.length ? (
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
                {masterFilData.map((e: any, i: number) => {
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
                          <Label>
                            {moment(e.StartDate).format("MM/DD/YYYY")}
                          </Label>
                          <Label>Members</Label>
                          <div style={{ display: "flex" }}>
                            {e.Members.length
                              ? e.Members.map((user: string) => {
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
                                getOnClick(e.ID);
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
                      {e.isSelect ? (
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
                            onClick={() => {
                              getOnClick(0);
                              setModalObj({ ...e });
                              setIsModalOpen(true);
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
                            onClick={() => {
                              props.getMasterDatas("edit", masterFilData);
                              props.navigation("formdashboard", e);
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
                            onClick={() => {
                              masterFilData.splice(i, 1);
                              setFinalFilData([...masterFilData]);
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
              items={[...masterFilData]}
              columns={DetailListColumn}
              selectionMode={SelectionMode.none}
            />
            {masterFilData.length == 0 && (
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

      {/* Modal box section */}
      {modalObj && (
        <Modal isOpen={isModalOpen}>
          <Close
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsModalOpen(false);
            }}
          />
          <Label>{modalObj.ProjectName}</Label>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
