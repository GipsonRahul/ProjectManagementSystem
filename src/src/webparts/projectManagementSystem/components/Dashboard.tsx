import * as React from "react";
import { useState, useEffect } from "react";
import {
  Label,
  DetailsList,
  Persona,
  PersonaSize,
  Modal,
  TextField,
  Spinner,
  ITextFieldStyles,
  IModalStyles,
} from "@fluentui/react";
import {
  Add,
  Apps,
  ViewHeadline,
  MoreVert,
  VisibilityOutlined,
  EditOutlined,
  DeleteOutline,
  Close,
  CheckCircleOutline,
  PermIdentity,
  Search,
} from "@material-ui/icons";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SelectionMode } from "office-ui-fabric-react";
import * as moment from "moment";
import { ProgressIndicator } from "@fluentui/react/lib/ProgressIndicator";
const successGif = require("../assets/animation_640_lhhiixk5 (1).gif");

// interface IDetails {
//   DisplayName: string;
//   Email: string;
// }

interface IDetails {
  Name: string;
  Email: string;
  Role: string;
  Alocation: number;
}

interface IMasterData {
  ID: number;
  ProjectName: string;
  ProjectType: string;
  ProjectDescription: string;
  Status: string;
  StartDate: any;
  EndDate?: any;
  Members: IDetails[];
  // ProjectManager: IDetails;
  // TeamLead: IDetails;
  // Developers: IDetails[];
  // DevelopersEmail: IDetails[];
  // Designers: IDetails;
  // Testers: IDetails;
  // Members: IDetails[];
  ProjectCost: string;
  ProjectEstimate: string;
  ActualCost: string;
  isSelect: boolean;
}

interface IFilterKeys {
  status: string;
  search: string;
}

let _masterData: IMasterData[] = [];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: 8,
    backgroundColor: "#f1f2f7",
    "&:hover": {
      backgroundColor: "#f1f2f7",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "26px !important",
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const Dashboard = (props: any) => {
  const classes = useStyles();
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
      onRender: (item: IMasterData) => {
        let filteredPM: IDetails[] = item.Members.filter(
          (user: IDetails) => user.Role == "PM"
        );
        let PM: IDetails = filteredPM.length > 0 ? filteredPM[0] : null;
        return (
          PM && (
            <p style={{ display: "flex", margin: 0 }}>
              <Persona
                size={PersonaSize.size32}
                imageUrl={
                  "/_layouts/15/userphoto.aspx?size=S&username=" + PM.Email
                }
              />
              <Label>{PM.Name}</Label>
            </p>
          )
        );
      },
    },
    {
      key: "column5",
      name: "Team Lead",
      fieldName: "TeamLead",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: IMasterData) => {
        let filteredTL: IDetails[] = item.Members.filter(
          (user: IDetails) => user.Role == "TL"
        );
        let TL: IDetails = filteredTL.length > 0 ? filteredTL[0] : null;
        return (
          TL && (
            <p style={{ display: "flex", margin: 0 }}>
              <Persona
                size={PersonaSize.size32}
                imageUrl={
                  "/_layouts/15/userphoto.aspx?size=S&username=" + TL.Email
                }
              />
              <Label>{TL.Name}</Label>
            </p>
          )
        );
      },
    },
    {
      key: "column6",
      name: "Members",
      fieldName: "Members",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: IMasterData) => {
        let filteredMembers: IDetails[] = item.Members.filter(
          (user: IDetails) => user.Role == "PM" || user.Role == "TL"
        );
        return (
          <p style={{ display: "flex", margin: 0 }}>
            {filteredMembers.length
              ? filteredMembers.map((e: IDetails) => {
                  return (
                    <div title={e.Name}>
                      <Persona
                        size={PersonaSize.size32}
                        imageUrl={
                          "/_layouts/15/userphoto.aspx?size=S&username=" +
                          e.Email
                        }
                      />
                    </div>
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
            <VisibilityOutlined
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
            <EditOutlined
              style={{ cursor: "pointer", marginRight: "5px" }}
              onClick={() => {
                props.navigation("Form", item);
              }}
            />
            <DeleteOutline
              style={{ cursor: "pointer", color: "#FF285C" }}
              onClick={() => {
                setDeletePopup({
                  condition: true,
                  targetId: i,
                  onSubmit: false,
                });
              }}
            />
          </div>
        );
      },
    },
  ];

  let _filterKeys: IFilterKeys = {
    status: "all",
    search: "",
  };
  // style variable
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
  const [modalObj, setModalObj] = useState<IMasterData>(null);
  const [isListView, setIsListView] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [filterKeys, setFilterKeys] = useState<IFilterKeys>({ ..._filterKeys });

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

  const filterOnChangeHandler = (key: string, value: string): void => {
    let tempFitlerKeys: IFilterKeys = { ...filterKeys };
    tempFitlerKeys[key] = value;
    setFilterKeys({ ...tempFitlerKeys });
    filterFunction(tempFitlerKeys);
  };

  const filterFunction = (filterKeys: IFilterKeys) => {
    let _data: IMasterData[] = [...finalFilData];
    _data.forEach((item: IMasterData) => (item.isSelect = false));

    if (filterKeys.status.toLowerCase() != "all") {
      _data = _data.filter(
        (item) => item.Status.toLowerCase() == filterKeys.status.toLowerCase()
      );
    }
    if (filterKeys.search) {
      _data = _data.filter(
        (item) =>
          item.Status.toLowerCase().includes(filterKeys.search.toLowerCase()) ||
          item.ProjectName.toLowerCase().includes(
            filterKeys.search.toLowerCase()
          ) ||
          item.ProjectType.toLowerCase().includes(
            filterKeys.search.toLowerCase()
          ) ||
          item.Members.some((_item) =>
            _item.Name.toLowerCase().includes(filterKeys.search.toLowerCase())
          )
      );
    }

    setMasterFilData([..._data]);
  };

  const deleteFunction = () => {
    let _masterRecord: IMasterData[] = [...finalFilData];
    _masterRecord.splice(deletePopup.targetId, 1);
    setMasterFilData([..._masterRecord]);
    setFinalFilData([..._masterRecord]);
    props.getMasterDatas("new", _masterRecord);
    setDeletePopup({
      condition: false,
      targetId: null,
      onSubmit: false,
    });
  };

  // life cycle function for onload
  useEffect(() => {
    _masterData = props.masterRecords.length ? props.masterRecords : [];
    setFinalFilData([..._masterData]);
    setMasterFilData([..._masterData]);
  }, []);

  return (
    <div className="FormContainer">
      {/* Project Heading */}
      <div className="formHeaderFlex">
        <div className="arrowRightFlex">
          <Label>Projects</Label>
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            placeholder="Search"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            value={filterKeys.search}
            onChange={(e) => {
              filterOnChangeHandler("search", e.target.value);
            }}
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
              props.getMasterDatas("new", masterFilData),
                props.navigation("Form");
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
                userSelect: "none",
                color: filterKeys.status == "all" && "#25364F",
                borderBottom: filterKeys.status == "all" && "2px solid #25364F",
              }}
              onClick={() => {
                filterOnChangeHandler("status", "all");
              }}
            >
              All
            </Label>

            {/* Active datas */}
            <Label
              style={{
                margin: "5px 15px",
                cursor: "pointer",
                userSelect: "none",
                color: filterKeys.status == "active" && "#A9F37F",
                borderBottom:
                  filterKeys.status == "active" && "2px solid #A9F37F",
              }}
              onClick={() => {
                filterOnChangeHandler("status", "active");
              }}
            >
              Active
            </Label>

            {/* Inactive datas */}
            <Label
              style={{
                margin: "5px 15px",
                cursor: "pointer",
                userSelect: "none",
                color: filterKeys.status == "inactive" && "#FF285C",
                borderBottom:
                  filterKeys.status == "inactive" && "2px solid #FF285C",
              }}
              onClick={() => {
                filterOnChangeHandler("status", "inactive");
              }}
            >
              Inactive
            </Label>

            {/* On hold datas */}
            <Label
              style={{
                margin: "5px 15px",
                cursor: "pointer",
                userSelect: "none",
                color: filterKeys.status == "on hold" && "#F0BB00",
                borderBottom:
                  filterKeys.status == "on hold" && "2px solid #F0BB00",
              }}
              onClick={() => {
                filterOnChangeHandler("status", "on hold");
              }}
            >
              On hold
            </Label>

            {/* Completed datas */}
            <Label
              style={{
                margin: "5px 15px",
                cursor: "pointer",
                userSelect: "none",
                color: filterKeys.status == "completed" && "#0f0",
                borderBottom:
                  filterKeys.status == "completed" && "2px solid #0f0",
              }}
              onClick={() => {
                filterOnChangeHandler("status", "completed");
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
            {isListView == false ? (
              <div title="Grid view">
                <Apps
                  className="listview"
                  onClick={() => {
                    masterFilData.length &&
                      masterFilData.forEach(
                        (item: IMasterData) => (item.isSelect = false)
                      );
                    setIsListView(true);
                  }}
                />
              </div>
            ) : (
              <div title="List view">
                <ViewHeadline
                  className="listview"
                  onClick={() => {
                    masterFilData.length &&
                      masterFilData.forEach(
                        (item: IMasterData) => (item.isSelect = false)
                      );
                    setIsListView(false);
                  }}
                />
              </div>
            )}
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
                {masterFilData.map((e: IMasterData, i: number) => {
                  return (
                    <div style={{ width: "33%", position: "relative" }}>
                      <div className="cardDesign">
                        <div className="navHeader">
                          <Label style={{ color: "#1d1d7c", fontSize: 20 }}>
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
                            <div style={{ margin: "0px 0px 20px 0px" }}>
                              <p
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  margin: 0,
                                }}
                              >
                                <span
                                  style={{
                                    color: "#4d9748",
                                    fontSize: 29,
                                    marginRight: 6,
                                  }}
                                >
                                  •
                                </span>
                                <Label
                                  style={{ color: "#4d9748", fontSize: 14 }}
                                >
                                  {" "}
                                  {e.Status}
                                </Label>
                              </p>
                            </div>
                            {/* <div className="spaceSection">
                              <Label style={{ color: "#4d9748", fontSize: 15 }}>
                                • {e.Status}
                              </Label>
                            </div> */}

                            <div
                              className="spaceSection"
                              style={{ margin: "10px 0px 30px 0px" }}
                            >
                              <Label
                                style={{
                                  fontSize: 13,
                                  fontWeight: 400,
                                  marginBottom: 6,
                                }}
                              >
                                Start Date
                              </Label>
                              <Label>
                                {moment(e.StartDate).format("MM/DD/YYYY")}
                              </Label>
                            </div>
                            {/* <div className="spaceSection">
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
                            </div> */}

                            <Label
                              style={{
                                fontSize: 14,
                                padding: 0,
                                marginBottom: 10,
                              }}
                            >
                              Members
                            </Label>
                            <div style={{ display: "flex" }}>
                              {e.Members.filter((user) => user.Role != "PM")
                                .length
                                ? e.Members.filter(
                                    (user) => user.Role != "PM"
                                  ).map((user: IDetails) => {
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
                                          user.Email
                                        }
                                      />
                                    );
                                  })
                                : ""}
                            </div>
                          </div>

                          <div style={{ width: "30%" }}>
                            <div style={{ textAlign: "right" }}>
                              {/* <MoreVert
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  getOnClick(e.ID);
                                }}
                              /> */}
                            </div>
                            <div
                              // className="spaceSection"
                              style={{ margin: "4px 0px 24px 0px" }}
                            >
                              <Label
                                style={{
                                  fontSize: 13,
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
                                    e.Members.filter(
                                      (user) => user.Role == "PM"
                                    )[0].Email
                                  }
                                />
                              </div>
                            </div>
                            {/* <div style={{ margin: "25px 0px" }}>
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
                                    e.Members.filter(
                                      (user) => user.Role == "TL"
                                    )[0].Email
                                  }
                                />
                              </div>
                            </div> */}
                          </div>
                        </div>
                        <div style={{ marginTop: 20 }}>
                          <ProgressIndicator
                            label="Progress"
                            styles={{
                              root: {
                                ".ms-ProgressIndicator-progressBar": {
                                  height: 10,
                                  borderRadius: 10,
                                  background:
                                    "linear-gradient(270deg, #4BA665 3.98%, #4BA665 25.24%, #A9F37F 43.85%, #A9F37F 69.22%, #A9F37F 94.43%)",
                                  width: "40% !important",
                                },
                                ".ms-ProgressIndicator-progressTrack": {
                                  height: 10,
                                  borderRadius: 10,
                                },
                              },
                            }}
                            // percentComplete={10}
                          />
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
                            <VisibilityOutlined style={{ color: "#4444ad" }} />
                          </div>

                          <div
                            className="menus"
                            onClick={() => {
                              props.getMasterDatas("edit", masterFilData);
                              props.navigation("Form", e);
                            }}
                          >
                            <Label style={{ cursor: "pointer" }}>Edit</Label>
                            <EditOutlined />
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
                            }}
                          >
                            <Label style={{ cursor: "pointer" }}>Delete</Label>
                            <DeleteOutline style={{ color: "#ff3c3c" }} />
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
              <Label className="modalHeadStatusIndicator">
                {modalObj.Status}
              </Label>
            </div>
          </div>
          <div className="modalProjectDescrip">
            <Label className="ProjectDescripLabel">Project Description</Label>
            <p className="modalDescription">{modalObj.ProjectDescription}</p>
          </div>
          <div className="modalProjectDescrip">
            <Label>Users</Label>
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
      {/* <Modal
        isOpen={true}
        styles={{
          main: {
            padding: 20,
            borderRadius: 8,
          },
        }}
      >
        <div className="gifAlign">
          <img src={`${successGif}`} alt="" className="saveGif" />
        </div>
      </Modal> */}
    </div>
  );
};

export default Dashboard;
