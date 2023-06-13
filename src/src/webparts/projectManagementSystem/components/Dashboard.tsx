import * as React from "react";
import { useState, useEffect } from "react";
import {
  Label,
  DetailsList,
  Persona,
  PersonaSize,
  Dropdown,
  Modal,
  IDropdownStyles,
  TextField,
  Spinner,
  ITextFieldStyles,
  IModalStyles,
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
  CheckCircleOutline,
  PermIdentity,
} from "@material-ui/icons";
import { SelectionMode } from "office-ui-fabric-react";
import * as moment from "moment";
import { colors } from "@material-ui/core";

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
  EndDate?: any;
  ProjectManager: IDetails;
  TeamLead: IDetails;
  Developers: IDetails[];
  DevelopersEmail?: string[];
  Designers: IDetails;
  Testers: IDetails;
  Members: IDetails[];
  ProjectCost: string;
  ProjectEstimate: string;
  ActualCost: string;
  isSelect: boolean;
}

interface IDrop {
  key: string;
  text: string;
}

interface IMastDrop {
  Project: IDrop[];
  ProjType: IDrop[];
}

interface IFillValue {
  _filProject: string;
  _filProjType: string;
}

let _masterData: IMasterData[] = [];

const Dashboard = (props: any) => {
  // list column names
  const DetailListColumn: any[] = [
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
          <p style={{ display: "flex", margin: 0 }}>
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
          <p style={{ display: "flex", margin: 0 }}>
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
          <p style={{ display: "flex", margin: 0 }}>
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
              style={{
                cursor: "pointer",
                marginRight: "5px",
                color: "#4444ad",
              }}
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
              style={{ cursor: "pointer", color: "#ff3c3c" }}
              onClick={() => {
                setDeletePopup({
                  condition: true,
                  targetId: i,
                  onSubmit: false,
                });
                // masterFilData.splice(i, 1);
                // setMasterFilData([...masterFilData]);
              }}
            />
          </div>
        );
      },
    },
  ];

  let _listDropDown: IMastDrop = {
    Project: [{ key: "all", text: "All" }],
    ProjType: [{ key: "all", text: "All" }],
  };

  let _curFilterData: IFillValue = {
    _filProject: "all",
    _filProjType: "all",
  };

  // list Datas
  let sampleDatas: any[] = [
    {
      ProjectName: "Project Test 001",
      Status: "Active",
      StartDate: "06/09/2023",
      ProjectType: "SPFx",
      ProjectDescription: "Test",
      ProjectManager: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      TeamLead: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Testers: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Designers: {
        DisplayName: "Devaraj P",
        Email: "devaraj@chandrudemo.onmicrosoft.com",
      },
      Developers: [
        {
          DisplayName: "Devaraj P",
          Email: "devaraj@chandrudemo.onmicrosoft.com",
        },
        {
          DisplayName: "Devaraj P",
          Email: "devaraj@chandrudemo.onmicrosoft.com",
        },
        {
          DisplayName: "Devaraj P",
          Email: "devaraj@chandrudemo.onmicrosoft.com",
        },
        {
          DisplayName: "Devaraj P",
          Email: "devaraj@chandrudemo.onmicrosoft.com",
        },
        {
          DisplayName: "Devaraj P",
          Email: "devaraj@chandrudemo.onmicrosoft.com",
        },
      ],
      Members: [
        {
          DisplayName: "Devaraj P",
          Email: "devaraj@chandrudemo.onmicrosoft.com",
        },
      ],
      ProjectCost: "30",
      ProjectEstimate: "30",
      ActualCost: "30",
      ID: 1,
      isSelect: false,
    },
  ];
  // style variable
  const dropDownStyle: Partial<IDropdownStyles> = {
    root: {
      width: "80%",
    },
    title: {
      borderRadius: 5,
      border: "1px solid rgb(138, 138, 138) !important",
    },
    dropdown: {
      ":focus::after": {
        border: "1px solid rgb(138, 138, 138) !important",
        content: "none !important",
        postition: "unset !important",
      },
    },
  };
  const textFieldStyle: Partial<ITextFieldStyles> = {
    field: {
      border: "1px solid !important",
      textAlign: "center",
      color: "#666565",
    },
  };
  const modalStyle: Partial<IModalStyles> = {
    main: {
      borderRadius: 10,
      padding: 10,
      width: "70%",
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
  const deleteModalStyle: Partial<IModalStyles> = {
    main: {
      minWidth: "23% ",
      minHeight: "20%",
      borderRadius: 16,
      height: "auto",
      padding: 20,
      display: "flex",
      alignItems: "center",
    },
  };
  // State section start
  const [masterFilData, setMasterFilData] = useState<IMasterData[]>([]);
  const [finalFilData, setFinalFilData] = useState<IMasterData[]>([]);
  const [modalObj, setModalObj] = useState<IMasterData>();
  const [isListView, setIsListView] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filStatusBar, setFilStatusBar] = useState<string>("all");
  const [dropValue, setDropValue] = useState<IMastDrop>(_listDropDown);
  const [filterValue, setFilterValue] = useState<IFillValue>(_curFilterData);

  const [deletePopup, setDeletePopup] = useState({
    condition: false,
    targetId: null,
    onSubmit: false,
  });
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
          if (_masterRecord.length == i + 1) {
            filterValue._filProject = "all";
            filterValue._filProjType = "all";
            setFilterValue({ ...filterValue });
          }
        } else if (_masterRecord[i].Status.toLowerCase() == value) {
          _masterRecord[i].isSelect = false;
          _filterMasterDatas.push({ ..._masterRecord[i] });
        } else if (_masterRecord[i].ProjectName == value) {
          _masterRecord[i].isSelect = false;
          _filterMasterDatas.push({ ..._masterRecord[i] });
        } else if (_masterRecord[i].ProjectType == value) {
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
    getFilterValue(_masterRecord.length ? [..._filterMasterDatas] : []);
  };

  // filter dropdown function
  const getFilterValue = (masterDataArray: IMasterData[]) => {
    let _filDropValue: IMastDrop = _listDropDown;
    masterDataArray.length &&
      masterDataArray.forEach((drop: IMasterData) => {
        _filDropValue.Project.push({
          key: drop.ProjectName,
          text: drop.ProjectName,
        });
        _filDropValue.ProjType.push({
          key: drop.ProjectType,
          text: drop.ProjectType,
        });
      });
    setDropValue({ ..._filDropValue });
  };

  const deleteFunction = () => {
    // let _masterData = [...masterFilData];
    let _masterRecord: IMasterData[] = [...finalFilData];
    _masterRecord.splice(deletePopup.targetId, 1);
    setMasterFilData([..._masterRecord]);
    setFinalFilData([..._masterRecord]);
    getFilterValue([..._masterRecord]);
    props.getMasterDatas("new", _masterRecord);
    setDeletePopup({
      condition: false,
      targetId: null,
      onSubmit: false,
    });
  };

  // life cycle function for onload
  useEffect(() => {
    // _masterData = props.masterRecords ? props.masterRecords : [];
    _masterData = props.masterRecords ? sampleDatas : [];
    setFinalFilData([..._masterData]);
    setMasterFilData([..._masterData]);
    getFilterValue([..._masterData]);
  }, []);

  return (
    <div className="FormContainer">
      {/* Project Heading */}
      <div className="formHeaderFlex">
        <div className="arrowRightFlex">
          <Label>Projects</Label>
        </div>
        <div className="loginLeftFlex">
          <div className="nameandEmail">
            <div>
              <Label style={{ color: "#1d1d7c", fontSize: 16 }}>Deva Raj</Label>
            </div>
            <div>
              <Label style={{ fontSize: 14, fontWeight: "unset" }}>
                devaraj@chandrudemo.onmicrosoft.com
              </Label>
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
            className="addBtnStyle"
            onClick={() => {
              props.getMasterDatas("new", masterFilData);
              props.navigation("formdashboard");
            }}
          >
            <Add />
            <Label>New</Label>
          </button>
        </div>

        {/* Right navebar section */}
        <div className="rightNavbarContainer">
          {/* Status filter secction */}
          <div className="filterSection">
            {/* All datas */}
            <Label
              style={{
                margin: "5px 15px",
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
                margin: "5px 15px",
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
                margin: "5px 15px",
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
                margin: "5px 15px",
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
                margin: "5px 15px",
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
                className="listview"
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
                className="listview"
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
      <div className="detailListSection">
        {/* Status filter section */}
        <div className="ddFilterWidth">
          <div className="ddFilterFlex">
            <p style={{ width: "29%", fontWeight: 600 }}>Project</p>
            <Dropdown
              styles={dropDownStyle}
              placeholder="Select an project"
              options={dropValue.Project}
              selectedKey={filterValue._filProject}
              onChange={(e, text) => {
                filterValue._filProject = text.key as string;
                getFilter(text.key as string);
                setFilterValue({ ...filterValue });
              }}
            />
          </div>
        </div>

        {/* Project type filter section */}
        <div className="ddFilterWidth">
          <div className="ddFilterFlex">
            <p>Project Type</p>
            <Dropdown
              styles={dropDownStyle}
              placeholder="Select an project type"
              options={dropValue.ProjType}
              selectedKey={filterValue._filProjType}
              onChange={(e, text) => {
                filterValue._filProjType = text.key as string;
                getFilter(text.key as string);
                setFilterValue({ ...filterValue });
              }}
            />
          </div>
        </div>
      </div>

      {/* Details list section */}
      <div
        style={{
          margin: "10px 20px",
        }}
      >
        {isListView ? (
          <div className="scrollContainer">
            {masterFilData.length ? (
              <div className="projectcardSection">
                {masterFilData.map((e: any, i: number) => {
                  return (
                    <div style={{ width: "33%", position: "relative" }}>
                      <div className="cardDesign">
                        <div className="navHeader">
                          <Label style={{ color: "#1d1d7c", fontSize: 22 }}>
                            {e.ProjectName}
                          </Label>
                          <MoreVert
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              getOnClick(e.ID);
                            }}
                          />
                        </div>
                        <div style={{ display: "flex" }}>
                          <div className="cardSize">
                            <div className="spaceSection">
                              <Label style={{ color: "#4d9748", fontSize: 15 }}>
                                • {e.Status}
                              </Label>
                            </div>
                            <div className="spaceSection">
                              <Label
                                style={{
                                  fontSize: 14,
                                  fontWeight: 400,
                                  marginBottom: 3,
                                }}
                              >
                                Start Date
                              </Label>
                              <Label>
                                {moment(e.StartDate).format("MM/DD/YYYY")}
                              </Label>
                            </div>
                            <div className="spaceSection">
                              <Label
                                style={{
                                  fontSize: 14,
                                  fontWeight: 400,
                                  marginBottom: 3,
                                }}
                              >
                                Project Type
                              </Label>
                              <Label>{e.ProjectType}</Label>
                            </div>
                            <Label
                              style={{
                                fontSize: 14,
                                padding: 0,
                                marginBottom: 4,
                              }}
                            >
                              Members
                            </Label>
                            <div style={{ display: "flex" }}>
                              {e.Members.length
                                ? e.Members.map((user: string) => {
                                    return (
                                      <Persona
                                        styles={{
                                          root: {
                                            display: "unset",
                                            marginRight: 5,
                                          },
                                        }}
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
                            {/* <div style={{ textAlign: "right" }}>
                              <MoreVert
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                getOnClick(e.ID);
                              }}
                            />
                            </div> */}
                            <div className="spaceSection">
                              <Label
                                style={{
                                  fontSize: 14,
                                  // fontWeight: 400,
                                  textAlign: "center",
                                  marginBottom: 7,
                                }}
                              >
                                Project Manager
                              </Label>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
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
                                    e.ProjectManager.Email
                                  }
                                />
                              </div>
                            </div>
                            <div style={{ margin: "25px 0px" }}>
                              <Label
                                style={{
                                  fontSize: 14,
                                  textAlign: "center",
                                  marginBottom: 5,
                                  padding: 0,
                                }}
                              >
                                Team Lead
                              </Label>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
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
                                    e.TeamLead.Email
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {e.isSelect ? (
                        <div className="menuIconPlacement">
                          <div
                            className="menus"
                            onClick={() => {
                              getOnClick(0);
                              setModalObj({ ...e });
                              setIsModalOpen(true);
                            }}
                          >
                            <Label style={{ cursor: "pointer" }}>View</Label>
                            <Visibility style={{ color: "#4444ad" }} />
                          </div>
                          <div
                            className="menus"
                            onClick={() => {
                              props.getMasterDatas("edit", masterFilData);
                              props.navigation("formdashboard", e);
                            }}
                          >
                            <Label style={{ cursor: "pointer" }}>Edit</Label>
                            <Edit />
                          </div>
                          <div
                            className="menus"
                            style={{ marginBottom: 0 }}
                            onClick={() => {
                              setDeletePopup({
                                condition: true,
                                targetId: i,
                                onSubmit: false,
                              });
                              // masterFilData.splice(i, 1);
                              // setFinalFilData([...masterFilData]);
                            }}
                          >
                            <Label style={{ cursor: "pointer" }}>Delete</Label>
                            <Delete style={{ color: "#ff3c3c" }} />
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
        <Modal
          styles={modalStyle}
          isOpen={isModalOpen}
          // isOpen={true}
        >
          <div
            // style={{
            //   display: "flex",
            //   justifyContent: "space-between",
            //   width: "64vw",
            //   margin: "10px 20px",
            // }}
            className="modalContainer"
          >
            <Label>{modalObj.ProjectType}</Label>
            <Close
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
          </div>
          <div
            // style={{
            //   display: "flex",
            //   justifyContent: "space-between",
            //   margin: "10px 20px",
            // }}
            className="modalHeaderFlex"
          >
            <Label style={{ fontSize: 20, fontWeight: 600, color: "#000" }}>
              {modalObj.ProjectName}
            </Label>
            <div
              // style={{
              //   display: "flex",
              //   justifyContent: "space-between",
              // }}
              className="textFlex"
            >
              <div
                // style={{
                //   display: "flex",
                //   justifyContent: "space-between",
                // }}
                className="textFlex"
              >
                <CheckCircleOutline style={{ marginRight: 10, fontSize: 20 }} />
                <Label className="modalHeadRightFlex">Status</Label>
              </div>
              <Label className="modalHeadStatusIndicator">
                {modalObj.Status}
              </Label>
            </div>
          </div>
          <div
            // style={{
            //   margin: "10px 20px 0px 20px",
            //   paddingBottom: "10px",
            //   borderBottom: "2px solid",
            // }}
            className="modalProjectDescrip"
          >
            <Label className="ProjectDescripLabel">Project Description</Label>
            <p className="modalDescription">{modalObj.ProjectDescription}</p>
          </div>
          <div
            // style={{
            //   margin: "10px 20px 0px 20px",
            //   paddingBottom: "10px",
            //   borderBottom: "2px solid",
            // }}
            className="modalProjectDescrip"
          >
            <Label className="ProjectDescripLabel">Users</Label>
            <div
              style={{
                display: "flex",
                margin: "10px 0px",
                alignItems: "center",
              }}
            >
              <PermIdentity
                // style={{ width: "6%" }}
                className="userIcon"
              />
              <Label
                //  style={{ width: "14%" }}
                className="userRole"
              >
                Project Manager
              </Label>
              <div
                // style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
                className="singlePersona"
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
                    modalObj.ProjectManager.Email
                  }
                />
                <Label>{modalObj.ProjectManager.DisplayName}</Label>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                margin: "10px 0px",
                alignItems: "center",
              }}
            >
              <PermIdentity
                // style={{ width: "6%" }}
                className="userIcon"
              />
              <Label
                // style={{ width: "14%" }}
                className="userRole"
              >
                Team Lead
              </Label>
              <div
                // style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
                className="singlePersona"
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
                    modalObj.TeamLead.Email
                  }
                />
                <Label>{modalObj.TeamLead.DisplayName}</Label>
              </div>
            </div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                // margin: "10px 0px",
              }}
            >
              <PermIdentity
                // style={{ width: "6%" }}
                className="userIcon"
              />
              <Label
                // style={{ width: "14%" }}
                className="userRole"
              >
                Developers
              </Label>
              <div
                // style={{
                //   display: "flex",
                //   flexWrap: "wrap",
                //   gap: 10,
                //   width: "80%",
                // }}
                className="personWidth"
              >
                {modalObj.Developers.length &&
                  modalObj.Developers.map((user: any) => {
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
                        <Label className="designPersonLabel">
                          {user.DisplayName}
                        </Label>
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
              <PermIdentity
                // style={{ width: "6%" }}
                className="userIcon"
              />
              <Label
                // style={{ width: "14%" }}
                className="userRole"
              >
                Designer
              </Label>
              <div
                className="singlePersona"
                // style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
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
                    modalObj.Designers.Email
                  }
                />
                <Label>{modalObj.Designers.DisplayName}</Label>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "10px 0px",
              }}
            >
              <PermIdentity
                // style={{ width: "6%" }}
                className="userIcon"
              />
              <Label
                //  style={{ width: "14%" }}
                className="userRole"
              >
                QA Tester
              </Label>
              <div
                className="singlePersona"
                // style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
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
                    modalObj.Testers.Email
                  }
                />
                <Label>{modalObj.Testers.DisplayName}</Label>
              </div>
            </div>
          </div>
          <div
            style={{
              // margin: "10px 20px",
              margin: " 10px 20px 20px 20px",
              // borderBottom: "2px solid #dee1e6",
            }}
          >
            <div style={{ display: "flex", margin: "15px 9px" }}>
              <Label
                // style={{ width: "15%" }}
                className="projectCost"
              >
                Project Cost
              </Label>
              <div
                // style={{ width: "35%" }}
                className="projectCostValue"
              >
                <TextField
                  styles={diableTextField}
                  disabled
                  value={modalObj.ProjectCost}
                />
              </div>
            </div>
            <div style={{ display: "flex", margin: "15px 9px" }}>
              <Label
                // style={{ width: "15%" }}
                className="projectCost"
              >
                Project Estimation
              </Label>
              <div
                // style={{ width: "35%" }}
                className="projectCostValue"
              >
                <TextField
                  styles={diableTextField}
                  disabled
                  value={modalObj.ProjectEstimate}
                />
              </div>
            </div>
            <div style={{ display: "flex", margin: "15px 9px" }}>
              <Label
                // style={{ width: "15%" }}
                className="projectCost"
              >
                Actual Cost
              </Label>
              <div
                //  style={{ width: "35%" }}
                className="projectCostValue"
              >
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
      {deletePopup.condition && (
        <Modal isOpen={deletePopup.condition} styles={deleteModalStyle}>
          <div>
            {/* <div>
              <Label
                style={{
                  color: "#fff",
                  backgroundColor: "#f00",
                  textAlign: "center",
                  padding: 10,
                  fontSize: 16,
                }}
              >
                Delete Confirmation
              </Label>
            </div> */}
            <div
            // style={{ margin: "30px 0px" }}
            >
              <Label
                style={{ textAlign: "center", fontSize: 19, marginBottom: 30 }}
              >
                Are you sure you want to delete this project ?
              </Label>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                // justifyContent: "space-between",
                // margin: "10px 0px",
              }}
            >
              <button
                className="cancelBtn"
                onClick={() => {
                  setDeletePopup({
                    condition: false,
                    targetId: null,
                    onSubmit: false,
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="deleteBtn"
                onClick={() => {
                  if (!deletePopup.onSubmit) {
                    setDeletePopup((prevState) => ({
                      ...prevState,
                      onSubmit: true,
                    }));
                    deleteFunction();
                  }
                }}
              >
                {deletePopup.onSubmit ? <Spinner /> : "Delete"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
