import * as React from "react";
import { useState, useEffect } from "react";
import {
  Label,
  Dropdown,
  TextField,
  DatePicker,
  ITextFieldStyles,
  IDropdownStyles,
  Persona,
  PersonaSize,
} from "@fluentui/react";
import { Add, ArrowBackIos, Email, EditOutlined } from "@material-ui/icons";
import { Checkbox } from "@material-ui/core";
import { IDropDown } from "../CommonDropDown/DropDown";
import * as moment from "moment";

interface IProps {
  navigation: any;
  item: IMasterData;
  masterRecords: IMasterData[];
  getMasterDatas: any;
  _count: number;
}

interface IDetails {
  DisplayName: string;
  Email: string;
}

interface IUserDetails {
  Name: string;
  Email: string;
  Role: string;
  Allocation: number;
}

// interface IObjectData {
//   ID: number;
//   ProjectName: string;
//   ProjectType: string;
//   ProjectDescription: string;
//   Status: string;
//   StartDate: any;
//   Progress: number;
//   Members: IUserDetails[];
//   ProjectCost: string;
//   ProjectEstimate: string;
//   ActualCost: string;
//   isSelect: boolean;
// }

interface IObjectData {
  ID: number;
  ProjectName: string;
  ProjectType: string;
  ProjectDescription: string;
  Status: string;
  StartDate: any;
  ProjectManager: IDetails;
  Progress: number;
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

interface IMasterData {
  ID: number;
  ProjectName: string;
  ProjectType: string;
  ProjectDescription: string;
  Status: string;
  StartDate: any;
  EndDate: any;
  Progress: number;
  Members: IUserDetails[];
  ProjectCost: string;
  ProjectEstimate: string;
  ActualCost: string;
  isSelect: boolean;
}

interface IUsers {
  Displayname: string;
  Email: string;
  Position: string;
  Availablity: number;
  ID: number;
}

const Users: IUsers[] = require("../../../ExternalJSON/Users.json");

const ProjectForm = (props: IProps) => {
  // variable creation section
  let _readyObj: IObjectData = {
    ID: null,
    ProjectName: "",
    ProjectType: "",
    ProjectDescription: "",
    Status: "",
    StartDate: null,
    ProjectManager: {
      DisplayName: "",
      Email: "",
    },
    TeamLead: {
      DisplayName: "",
      Email: "",
    },
    Developers: [],
    DevelopersEmail: [],
    Designers: {
      DisplayName: "",
      Email: "",
    },
    Testers: {
      DisplayName: "",
      Email: "",
    },
    Progress: null,
    Members: [],
    ProjectCost: "",
    ProjectEstimate: "",
    ActualCost: "",
    isSelect: false,
  };

  // style variables
  const textFieldStyle: Partial<ITextFieldStyles> = {
    fieldGroup: {
      borderRadius: 5,
      border: "1px solid rgb(138, 138, 138) !important",
      "::after": {
        border: "1px solid rgb(138, 138, 138) !important",
        content: "none !important",
        postition: "unset !important",
      },
    },
  };
  const disableTextField: Partial<ITextFieldStyles> = {
    field: {
      border: "1px solid rgb(138, 138, 138) !important",
      // textAlign: "center",
      color: "#181818",
      background: "none !important",
      borderRadius: 6,
    },
    fieldGroup: {
      background: "none !important",
      height: 34,
      textarea: {
        resize: "none",
      },
    },
  };
  const dropDownStyle: Partial<IDropdownStyles> = {
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
  const datePickerStyle: Partial<ITextFieldStyles> = {
    root: {
      ".ms-TextField-fieldGroup": {
        borderRadius: 5,
        border: "1px solid rgb(138, 138, 138) !important",
        "::after": {
          border: "1px solid rgb(138, 138, 138) !important",
          content: "none !important",
          postition: "unset !important",
        },
      },
    },
  };
  const multilineTextFieldStyle: Partial<ITextFieldStyles> = {
    fieldGroup: {
      height: 100,
      borderRadius: 5,
      border: "1px solid rgb(138, 138, 138) !important",
      alignItems: "flex-start",
      "::after": {
        border: "1px solid rgb(138, 138, 138) !important",
        content: "none !important",
        postition: "unset !important",
      },
    },
    field: {
      padding: "5px 8px !important",
      height: "100% !important",
      resize: "none",
    },
  };

  // State section start
  const [viewFormText, setViewFormText] = useState<string>("add");
  const [itemDatas, setItemDatas] = useState<IObjectData>(_readyObj);

  const [dropDownOptions, setDropDownOptions] = useState({
    PL: [],
    TL: [],
    Dev: [],
    Des: [],
    Tester: [],
  });

  const [errorMsg, setErrorMsg] = useState<string>("");
  // State section end

  // multiple dropdown onchange function
  const onchangeFunction = (text: any) => {
    // if (
    //   !itemDatas.DevelopersEmail.some((e: string) => e == (text.key as string))
    // ) {
    //   itemDatas.Developers.push({
    //     Email: text.key as string,
    //     DisplayName: text.text as string,
    //   });
    //   itemDatas.DevelopersEmail.push(text.key as string);
    // } else {
    //   let _removeIndex: number = itemDatas.DevelopersEmail.indexOf(
    //     text.key as string
    //   );
    //   itemDatas.DevelopersEmail.splice(_removeIndex, 1);
    //   itemDatas.Developers.splice(_removeIndex, 1);
    // }
    // getMasterArray();
  };

  // master members array filter
  const getMasterArray = () => {
    // itemDatas.Members = [];
    // if (itemDatas.Developers.length) {
    //   for (let i = 0; itemDatas.Developers.length > i; i++) {
    //     if (i == 0) {
    //       itemDatas.Testers.Email && itemDatas.Members.push(itemDatas.Testers);
    //       itemDatas.Designers.Email &&
    //         itemDatas.Members.push(itemDatas.Designers);
    //       itemDatas.Members.push(itemDatas.Developers[i]);
    //     } else {
    //       itemDatas.Members.push(itemDatas.Developers[i]);
    //     }
    //   }
    // } else {
    //   itemDatas.Testers.Email && itemDatas.Members.push(itemDatas.Testers);
    //   itemDatas.Designers.Email && itemDatas.Members.push(itemDatas.Designers);
    // }
    // setItemDatas({ ...itemDatas });
  };

  // validation function

  const getValidation = (): void => {
    let _isValid: boolean = true;

    let _data: IObjectData = { ...itemDatas };

    if (!_data.ProjectName) {
      _isValid = false;
    }

    if (!_data.ProjectType) {
      _isValid = false;
    }

    if (!_data.Status) {
      _isValid = false;
    }

    if (!_data.StartDate) {
      _isValid = false;
    }

    // if (!_data.ProjectManager) {
    //   _isValid = false;
    // }

    // if (!_data.TeamLead) {
    //   _isValid = false;
    // }

    // if (!_data.Testers) {
    //   _isValid = false;
    // }

    // if (!_data.Designers) {
    //   _isValid = false;
    // }

    // if (!_data.DevelopersEmail.length) {
    //   _isValid = false;
    // }

    if (!_data.ProjectCost) {
      _isValid = false;
    }

    if (!_data.ProjectEstimate) {
      _isValid = false;
    }

    if (!_data.ActualCost) {
      _isValid = false;
    }

    if (!_isValid) {
      let _errMsg: string = "All fileds are mandatory";

      setErrorMsg(_errMsg);
    }

    if (_isValid) {
      setErrorMsg("");

      onSubmitFunction();
    }
  };

  // update function section
  const getUpdate = () => {
    itemDatas.isSelect = false;
    let _masterList: IMasterData[] = [...props.masterRecords];
    let _masterIndex: any = props.masterRecords.findIndex(checkId);
    _masterList.splice(_masterIndex, 1);

    // let resObj: IMasterData = objectFormatter({ ...itemDatas });
    // _masterList.unshift({ ...resObj });

    props.getMasterDatas("edit", [..._masterList]),
      props.navigation("Dashboard");
  };

  // check id function
  const checkId = (value: IMasterData) => {
    return value.ID == props.item.ID;
  };

  // current items get function
  const getCurrentItem = () => {
    let editFormText: string = props.item ? "edit" : "add";
    let _currentItem: IObjectData = { ..._readyObj };
    if (editFormText == "edit") {
      let editObj: IMasterData = props.item;

      let filteredPM: IUserDetails[] = editObj.Members.filter(
        (user) => user.Role.toLowerCase() == "pm"
      );
      let filteredTL: IUserDetails[] = editObj.Members.filter(
        (user) => user.Role.toLowerCase() == "tl"
      );
      let filteredDes: IUserDetails[] = editObj.Members.filter(
        (user) => user.Role.toLowerCase() == "designer"
      );
      let filteredTester: IUserDetails[] = editObj.Members.filter(
        (user) => user.Role.toLowerCase() == "tester"
      );
      let filteredDev: IUserDetails[] = editObj.Members.filter(
        (user) => user.Role.toLowerCase() == "developer"
      );

      let projectmanager: IDetails =
        filteredPM.length > 0
          ? filteredPM.map((user: IUserDetails) => {
              return {
                DisplayName: user.Name,
                Email: user.Email,
              };
            })[0]
          : null;
      let teamLead: IDetails =
        filteredTL.length > 0
          ? filteredTL.map((user: IUserDetails) => {
              return {
                DisplayName: user.Name,
                Email: user.Email,
              };
            })[0]
          : null;
      let designer: IDetails =
        filteredDes.length > 0
          ? filteredDes.map((user: IUserDetails) => {
              return {
                DisplayName: user.Name,
                Email: user.Email,
              };
            })[0]
          : null;
      let tester: IDetails =
        filteredTester.length > 0
          ? filteredTester.map((user: IUserDetails) => {
              return {
                DisplayName: user.Name,
                Email: user.Email,
              };
            })[0]
          : null;
      let developer: IDetails[] =
        filteredDev.length > 0
          ? filteredDev.map((user: IUserDetails) => {
              return {
                DisplayName: user.Name,
                Email: user.Email,
              };
            })
          : [];

      let modifiedObj: IObjectData = {
        ID: editObj.ID,
        ProjectName: editObj.ProjectName,
        ProjectType: editObj.ProjectType,
        ProjectDescription: editObj.ProjectDescription,
        Status: editObj.Status,
        StartDate: editObj.StartDate,
        Progress: editObj.Progress,
        // Members: [...editObj.Members],
        ProjectManager: { ...projectmanager },
        TeamLead: { ...teamLead },
        Developers: [...developer],
        DevelopersEmail: [...developer.map((user: IDetails) => user.Email)],
        Designers: { ...designer },
        Testers: { ...tester },
        Members: [
          { ...teamLead },
          { ...designer },
          { ...tester },
          ...developer,
        ],
        ProjectCost: editObj.ProjectCost,
        ProjectEstimate: editObj.ProjectEstimate,
        ActualCost: editObj.ActualCost,
        isSelect: false,
      };
      _currentItem = { ...modifiedObj };
    }
    setItemDatas({ ..._currentItem });
    setViewFormText(editFormText);
  };
  const getUserAvailability = () => {
    let _masterUsers = [...Users];
    _masterUsers.forEach((user: IUsers, index: number) => {
      let _allocation: number = 0;
      let filteredArr: IMasterData[] = props.masterRecords.filter(
        (project: IMasterData) =>
          project.Members.some((member) => member.Email == user.Email)
      );

      if (filteredArr.length > 0) {
        filteredArr.forEach((filterProject: IMasterData) => {
          filterProject.Members.forEach(
            (fil_members: IUserDetails, i: number) => {
              if (fil_members.Email == user.Email) {
                _allocation += fil_members.Allocation;
              }

              if (i == filterProject.Members.length - 1) {
                _masterUsers[index].Availablity = _allocation;
              }
            }
          );
        });
      }

      if (index == _masterUsers.length - 1) {
        getDropDownOptions(_masterUsers);
      }
    });
  };

  const getDropDownOptions = (masterUsers: IUsers[]) => {
    let _dropDownOptions = { ...dropDownOptions };
    masterUsers.forEach((user: IUsers, index: number) => {
      if (user.Position.toLowerCase() == "pm") {
        _dropDownOptions.PL.push({ key: user.Email, text: user.Displayname });
      } else if (user.Position.toLowerCase() == "tl") {
        _dropDownOptions.TL.push({ key: user.Email, text: user.Displayname });
      } else if (user.Position.toLowerCase() == "developer") {
        _dropDownOptions.Dev.push({ key: user.Email, text: user.Displayname });
      } else if (user.Position.toLowerCase() == "designer") {
        _dropDownOptions.Des.push({ key: user.Email, text: user.Displayname });
      } else if (user.Position.toLowerCase() == "tester") {
        _dropDownOptions.Tester.push({
          key: user.Email,
          text: user.Displayname,
        });
      }

      if (index == masterUsers.length - 1) {
        setDropDownOptions({ ..._dropDownOptions });
      }
    });
  };

  const objectFormatter = (obj: IObjectData) => {
    let _members: IUserDetails[] = [];
    if (obj.ProjectManager) {
      _members.push({
        Name: obj.ProjectManager.DisplayName,
        Email: obj.ProjectManager.Email,
        Role: "PM",
        Allocation: 10,
      });
    }
    if (obj.TeamLead) {
      _members.push({
        Name: obj.TeamLead.DisplayName,
        Email: obj.TeamLead.Email,
        Role: "TL",
        Allocation: 10,
      });
    }
    if (obj.Testers) {
      _members.push({
        Name: obj.Testers.DisplayName,
        Email: obj.Testers.Email,
        Role: "Tester",
        Allocation: 10,
      });
    }
    if (obj.Designers) {
      _members.push({
        Name: obj.Designers.DisplayName,
        Email: obj.Designers.Email,
        Role: "Designer",
        Allocation: 10,
      });
    }
    if (obj.Developers.length > 0) {
      _members = [
        ..._members,
        ...obj.Developers.map((user: IDetails) => {
          return {
            Name: user.DisplayName,
            Email: user.Email,
            Role: "Developer",
            Allocation: 10,
          };
        }),
      ];
    }
    let res = {
      ID: obj.ID,
      ProjectName: obj.ProjectName,
      ProjectType: obj.ProjectType,
      ProjectDescription: obj.ProjectDescription,
      Status: obj.Status,
      StartDate: obj.StartDate,
      EndDate: null,
      Members: [..._members],
      ProjectCost: obj.ProjectCost,
      ProjectEstimate: obj.ProjectEstimate,
      ActualCost: obj.ActualCost,
      isSelect: false,
    };

    return res;
  };

  const onSubmitFunction = () => {
    let _item: IObjectData = { ...itemDatas };
    if (viewFormText == "add") {
      _item.ID = props._count + 1;
      _item.isSelect = false;
      setItemDatas({ ..._item });

      let resObj = objectFormatter(_item);
      props.getMasterDatas("add", resObj), props.navigation("Dashboard");
    } else {
      getUpdate();
    }
  };

  const onchangeHandler = (key: string, value: any): void => {
    let _data = { ...itemDatas };
    _data[key] = value;
    setItemDatas({ ..._data });
    setErrorMsg("");
  };

  // life cycle for onload
  useEffect(() => {
    getUserAvailability(), getCurrentItem();
  }, []);

  return (
    <div className="FormContainer">
      {/* Add and Edit header section */}
      <div className="formHeaderFlex">
        <div className="arrowRightFlex">
          <ArrowBackIos
            style={{ cursor: "pointer", color: "#A9F37F" }}
            onClick={() => {
              props.navigation("Dashboard");
            }}
          />
          <Label>
            {viewFormText == "add" ? "Add Project" : "Edit Project"}
          </Label>
        </div>
      </div>

      {/* Form section start */}
      {/* Project details section */}
      <div className="formSection">
        {/* Left section */}
        <div
          className="rightSection "
          style={{
            width: "30%",
          }}
        >
          <h3>Project Details</h3>
          {/* Project Name section */}
          <div
            className="rightSection"
            style={{
              width: "80%",
            }}
          >
            <Label>
              Project Name <span className="required">*</span>
            </Label>
            <TextField
              styles={textFieldStyle}
              placeholder="Select project name"
              value={itemDatas.ProjectName ? itemDatas.ProjectName : ""}
              onChange={(e: any, value) => {
                onchangeHandler("ProjectName", value);
              }}
            />
          </div>

          {/* Project Type section */}
          <div
            className="rightSection"
            style={{
              width: "80%",
            }}
          >
            <Label>
              Project Type <span className="required">*</span>
            </Label>
            <Dropdown
              styles={dropDownStyle}
              placeholder="Select project type"
              options={IDropDown.ProjectType}
              selectedKey={itemDatas.ProjectType ? itemDatas.ProjectType : ""}
              onChange={(e, text) => {
                onchangeHandler("ProjectType", text.key);
              }}
            />
          </div>

          {/* Status and Progress section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <div className="rightSection" style={{ width: "50%" }}>
              <Label>
                Status <span className="required">*</span>
              </Label>
              <Dropdown
                styles={dropDownStyle}
                placeholder="Select status"
                options={IDropDown.Status}
                selectedKey={itemDatas.Status ? itemDatas.Status : ""}
                onChange={(e, text) => {
                  onchangeHandler("Status", text.key);
                }}
              />
            </div>

            <div
              className="rightSection"
              style={{ width: "40%", display: "flex", justifyContent: "end" }}
            >
              <div>
                <Label>
                  Progress <span className="required">*</span>
                </Label>
                <TextField
                  styles={textFieldStyle}
                  placeholder="Enter progress"
                  value={
                    itemDatas.Progress ? itemDatas.Progress.toString() : ""
                  }
                  onChange={(e: any, value) => {
                    if (/^[0-9]+$|^$/.test(value)) {
                      if (parseInt(value) < 0) {
                        onchangeHandler("Progress", "");
                      } else if (parseInt(value) > 100) {
                        onchangeHandler("Progress", "100");
                      } else {
                        onchangeHandler("Progress", value);
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* start date section */}
          <div
            className="rightSection"
            style={{
              width: "80%",
            }}
          >
            <Label>
              Start Date <span className="required">*</span>
            </Label>
            <DatePicker
              styles={datePickerStyle}
              placeholder="DD MMM YYYY"
              value={itemDatas.StartDate}
              formatDate={(date) => moment(date).format("DD MMM YYYY")}
              onSelectDate={(data) => {
                onchangeHandler("StartDate", data);
              }}
            />
          </div>

          {/* Project Description section */}
          <div
            className="rightSection"
            style={{
              width: "80%",
            }}
          >
            <Label>Project Description</Label>
            <TextField
              multiline
              styles={multilineTextFieldStyle}
              value={
                itemDatas.ProjectDescription ? itemDatas.ProjectDescription : ""
              }
              onChange={(e: any, text) => {
                onchangeHandler("ProjectDescription", text);
              }}
            />
          </div>

          <h3>Financials Details</h3>
          {/* Project Cost section */}
          <div
            className="costs"
            style={{ display: "flex", alignItems: "center", marginTop: 15 }}
          >
            <Label style={{ width: "40%" }}>
              Project Cost <span className="required">*</span>
            </Label>
            <TextField
              styles={textFieldStyle}
              value={itemDatas.ProjectCost ? itemDatas.ProjectCost : ""}
              onChange={(e: any, value) => {
                if (/^[0-9]+$|^$/.test(value)) {
                  onchangeHandler("ProjectCost", value);
                }
              }}
            />
          </div>

          {/* Project Estimate section */}
          <div
            className="costs"
            style={{ display: "flex", alignItems: "center", marginTop: 15 }}
          >
            <Label style={{ width: "40%" }}>
              Project Estimate <span className="required">*</span>
            </Label>
            <TextField
              styles={textFieldStyle}
              value={itemDatas.ProjectEstimate ? itemDatas.ProjectEstimate : ""}
              onChange={(e: any, value) => {
                if (/^[0-9]+$|^$/.test(value)) {
                  onchangeHandler("ProjectEstimate", value);
                }
              }}
            />
          </div>

          {/* Actual Cost section */}
          <div
            className="costs"
            style={{ display: "flex", alignItems: "center", marginTop: 15 }}
          >
            <Label style={{ width: "40%" }}>
              Actual Cost <span className="required">*</span>
            </Label>
            <TextField
              styles={textFieldStyle}
              value={itemDatas.ActualCost ? itemDatas.ActualCost : ""}
              onChange={(e: any, value) => {
                if (/^[0-9]+$|^$/.test(value)) {
                  onchangeHandler("ActualCost", value);
                }
              }}
            />
          </div>
        </div>

        {/* center section */}
        <div
          className="rightSection"
          style={{
            width: "40%",
          }}
        >
          {/* Project Manager section */}
          <div style={{ marginTop: 60 }}>
            <Label>
              Project Manager <span className="required">*</span>
            </Label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "24%",
                }}
              >
                <Dropdown
                  styles={dropDownStyle}
                  placeholder="Select Allocation"
                  options={IDropDown.Allocation}
                />
              </div>

              <div
                style={{
                  width: "58%",
                  margin: "0px 34px",
                }}
              >
                <TextField styles={disableTextField} disabled />
              </div>

              <EditOutlined
                style={{
                  color: "#1d1d7c",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          {/* Team Lead section */}
          <div className="rightSection">
            <Label>
              Team Lead <span className="required">*</span>
            </Label>
            <div
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "24%",
                }}
              >
                <Dropdown
                  styles={dropDownStyle}
                  placeholder="Select Allocation"
                  options={IDropDown.Allocation}
                />
              </div>

              <div
                style={{
                  width: "58%",
                  margin: "0px 34px",
                }}
              >
                <TextField styles={disableTextField} disabled />
              </div>

              <EditOutlined
                style={{
                  color: "#1d1d7c",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          {/* Designer section */}
          <div className="rightSection">
            <Label>
              Designer <span className="required">*</span>
            </Label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "24%",
                }}
              >
                <Dropdown
                  styles={dropDownStyle}
                  placeholder="Select Allocation"
                  options={IDropDown.Allocation}
                />
              </div>

              <div
                style={{
                  width: "58%",
                  margin: "0px 34px",
                }}
              >
                <TextField styles={disableTextField} disabled />
              </div>

              <EditOutlined
                style={{
                  color: "#1d1d7c",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          {/* QA Tester section */}
          <div className="rightSection">
            <Label>
              QA Tester <span className="required">*</span>
            </Label>
            <div
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "24%",
                }}
              >
                <Dropdown
                  styles={dropDownStyle}
                  placeholder="Select Allocation"
                  options={IDropDown.Allocation}
                />
              </div>

              <div
                style={{
                  width: "58%",
                  margin: "0px 34px",
                }}
              >
                <TextField styles={disableTextField} disabled />
              </div>

              <EditOutlined
                style={{
                  color: "#1d1d7c",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          {/* Developers section */}
          <div className="rightSection">
            <Label>
              Developers <span className="required">*</span>
            </Label>
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "24%",
                }}
              >
                <Dropdown
                  styles={dropDownStyle}
                  placeholder="Select Allocation"
                  options={IDropDown.Allocation}
                />
              </div>

              <div
                style={{
                  width: "58%",
                  margin: "0px 34px",
                }}
              >
                <TextField styles={disableTextField} multiline disabled />
              </div>

              <EditOutlined
                style={{
                  color: "#1d1d7c",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div
          className="rightSection"
          style={{
            width: "30%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <div
              style={{
                width: "80%",
                border: "2px solid #d5d5d5",
                borderRadius: "8px",
                padding: "10px",
                height: "76vh",
              }}
            >
              <h3
                style={{
                  paddingBottom: "10px",
                  borderBottom: "2px solid #d5d5d5",
                  textAlign: "center",
                  color: "#1d1d7c",
                  margin: 0,
                }}
              >
                Project Managers
              </h3>
              <div
                style={{
                  paddingTop: "10px",
                  height: "70vh",
                  overflow: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 0px",
                    borderBottom: "1px solid #ababab",
                  }}
                >
                  <Checkbox
                    style={{
                      width: "5%",
                    }}
                  />
                  <div
                    style={{
                      width: "80%",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        margin: "0px 0px 0px 10px",
                        alignItems: "center",
                      }}
                    >
                      <Persona
                        size={PersonaSize.size32}
                        imageUrl={
                          "/_layouts/15/userphoto.aspx?size=S&username=" +
                          "gipsonrahul.j@technorucs.com"
                        }
                      />
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                        }}
                      >
                        <div style={{ fontWeight: "600", fontSize: "14px" }}>
                          {"Gipson Rahul J M"}
                        </div>
                        <div style={{ fontWeight: "600", fontSize: "14px" }}>
                          {"100%"}
                        </div>
                      </div>
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 0px",
                    borderBottom: "1px solid #ababab",
                  }}
                >
                  <Checkbox
                    style={{
                      width: "5%",
                    }}
                  />
                  <div
                    style={{
                      width: "80%",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        margin: "0px 0px 0px 10px",
                        alignItems: "center",
                      }}
                    >
                      <Persona
                        size={PersonaSize.size32}
                        imageUrl={
                          "/_layouts/15/userphoto.aspx?size=S&username=" +
                          "gipsonrahul.j@technorucs.com"
                        }
                      />
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                        }}
                      >
                        <div style={{ fontWeight: "600", fontSize: "14px" }}>
                          {"Gipson Rahul J M"}
                        </div>
                        <div style={{ fontWeight: "600", fontSize: "14px" }}>
                          {"100%"}
                        </div>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Button section */}
          <div
            style={{
              display: "flex",
              margin: "10px 20px",
              justifyContent: "end",
              position: "fixed",
              alignItems: "center",
              right: "10px",
              bottom: "10px",
            }}
          >
            {errorMsg && (
              <Label style={{ color: "red", marginRight: "20px" }}>
                * {errorMsg}
              </Label>
            )}
            <div
              style={{
                display: "flex",
              }}
            >
              <button
                style={{
                  marginRight: "20px",
                  cursor: "pointer",
                  width: "80px",
                  height: "40px",
                  fontWeight: 600,
                  border: "1px solid #A9F37F",
                  borderRadius: "8px",
                  background: "#fff",
                  fontSize: 15,
                }}
                onClick={() => {
                  props.navigation("Dashboard");
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  cursor: "pointer",
                  width: "80px",
                  height: "40px",
                  fontWeight: 600,
                  border: "1px solid #A9F37F",
                  borderRadius: "8px",
                  background: "#A9F37F",
                  fontSize: 15,
                }}
                onClick={() => {
                  getValidation();
                }}
              >
                {viewFormText == "add" ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Form section end */}
    </div>
  );
};

export default ProjectForm;
