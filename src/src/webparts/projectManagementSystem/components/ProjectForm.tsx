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
import { ArrowBackIos, EditOutlined } from "@material-ui/icons";
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

interface IUserDetails {
  Name: string;
  Email: string;
  Role: string;
  Allocation: number;
}

interface IObjectData {
  ID: number;
  ProjectName: string;
  ProjectType: string;
  ProjectDescription: string;
  Status: string;
  StartDate: any;
  EndDate: any;
  Progress: number;
  Members: IUserDetails[];
  Allocation: {
    PM: number;
    TL: number;
    Designer: number;
    Tester: number;
    Developer: number;
  };
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

interface ISelectedUsers {
  Displayname: string;
  Email: string;
  Position: string;
  Availablity: number;
  ID: number;
  isSelected: boolean;
}

const Users: IUsers[] = require("../../../ExternalJSON/Users.json");

const ProjectForm = (props: IProps) => {
  // variable creation section

  const roleAcronyms = {
    PM: "Project Manager",
    TL: "Team Lead",
    Designer: "Designer",
    Tester: "Tester",
    Developer: "Developer",
  };
  let _readyObj: IObjectData = {
    ID: null,
    ProjectName: "",
    ProjectType: "",
    ProjectDescription: "",
    Status: "",
    StartDate: null,
    EndDate: null,
    Progress: null,
    Members: [],
    Allocation: {
      PM: null,
      TL: null,
      Designer: null,
      Tester: null,
      Developer: null,
    },
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
  const [masterUsers, setMasterUsers] = useState<IUsers[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<ISelectedUsers[]>([]);
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

  const [userListDetails, setUserListDetails] = useState({
    category: "",
    allocation: null,
  });

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
    if (_data.Members.length == 0) {
      _isValid = false;
    } else {
      if (
        _data.Members.filter((user: IUserDetails) => user.Role == "PM")
          .length == 0
      ) {
        _isValid = false;
      }
      if (
        _data.Members.filter((user: IUserDetails) => user.Role == "TL")
          .length == 0
      ) {
        _isValid = false;
      }
      if (
        _data.Members.filter((user: IUserDetails) => user.Role == "Tester")
          .length == 0
      ) {
        _isValid = false;
      }
      if (
        _data.Members.filter((user: IUserDetails) => user.Role == "Designer")
          .length == 0
      ) {
        _isValid = false;
      }
      if (
        _data.Members.filter((user: IUserDetails) => user.Role == "Developer")
          .length == 0
      ) {
        _isValid = false;
      }
    }
    if (_data.Progress == null) {
      _isValid = false;
    }
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

    let resObj: IMasterData = objectFormatter({ ...itemDatas });
    _masterList.unshift({ ...resObj });

    props.getMasterDatas("edit", [..._masterList]),
      props.navigation("Dashboard");
  };

  // check id function
  const checkId = (value: IMasterData) => value.ID == props.item.ID;

  // current items get function
  const getCurrentItem = () => {
    let editFormText: string = props.item ? "edit" : "add";
    setViewFormText(editFormText);

    let _currentItem: IObjectData = { ..._readyObj };

    let _userListDetails = {
      category: "PM",
      allocation: null,
    };
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

      let modifiedObj: IObjectData = {
        ID: editObj.ID,
        ProjectName: editObj.ProjectName,
        ProjectType: editObj.ProjectType,
        ProjectDescription: editObj.ProjectDescription,
        Status: editObj.Status,
        StartDate: editObj.StartDate,
        EndDate: null,
        Progress: editObj.Progress,
        Members: [...editObj.Members],
        Allocation: {
          PM: filteredPM.length > 0 ? filteredPM[0].Allocation : null,
          TL: filteredTL.length > 0 ? filteredTL[0].Allocation : null,
          Designer: filteredDes.length > 0 ? filteredDes[0].Allocation : null,
          Tester:
            filteredTester.length > 0 ? filteredTester[0].Allocation : null,
          Developer: filteredDev.length > 0 ? filteredDev[0].Allocation : null,
        },
        ProjectCost: editObj.ProjectCost,
        ProjectEstimate: editObj.ProjectEstimate,
        ActualCost: editObj.ActualCost,
        isSelect: false,
      };
      _currentItem = { ...modifiedObj };

      _userListDetails = {
        category: "PM",
        allocation: _currentItem.Allocation.PM,
      };

      getUserList(
        _userListDetails.category,
        _userListDetails.allocation,
        _currentItem,
        _currentItem.Members
      );
    } else {
      setUserListDetails({ ..._userListDetails });
      setItemDatas({ ..._currentItem });
    }
  };
  const getUserAvailability = () => {
    let _masterUsers: IUsers[] = [...Users];
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
                if (filterProject.Status != "Completed") {
                  _allocation += fil_members.Allocation;
                }
              }

              if (i == filterProject.Members.length - 1) {
                _masterUsers[index].Availablity = 100 - _allocation;
              }
            }
          );
        });
      } else {
        _masterUsers[index].Availablity = 100 - _allocation;
      }

      if (index == _masterUsers.length - 1) {
        console.log(_masterUsers);
        setMasterUsers([..._masterUsers]);
        // getDropDownOptions(_masterUsers);
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
  const objectFormatter = (obj: IObjectData): IMasterData => {
    let res: IMasterData = {
      ID: obj.ID,
      ProjectName: obj.ProjectName,
      ProjectType: obj.ProjectType,
      ProjectDescription: obj.ProjectDescription,
      Status: obj.Status,
      StartDate: obj.StartDate,
      EndDate: null,
      Progress: obj.Progress,
      Members: [...obj.Members],
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

      let resObj: IMasterData = objectFormatter(_item);
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

  const getUserList = (
    category: string,
    allocation: number,
    obj: IObjectData,
    selectedUsers: IUserDetails[]
  ): void => {
    let _data: IObjectData = { ...obj };
    let _masterUsers: IUsers[] = [...masterUsers];

    let filteredUsers: IUsers[] = _masterUsers.filter(
      (user: IUsers) =>
        user.Position == category && user.Availablity >= allocation
    );

    let resUsers: ISelectedUsers[] = [];

    filteredUsers.forEach((user: IUsers) => {
      if (selectedUsers.length > 0) {
        let filterUser: IUserDetails[] = selectedUsers.filter(
          (_user: IUserDetails) => _user.Email.trim() == user.Email.trim()
        );

        if (filterUser.length > 0) {
          resUsers.push({ ...user, isSelected: true });
        } else {
          resUsers.push({ ...user, isSelected: false });
        }
      } else {
        resUsers.push({ ...user, isSelected: false });
        _data.Members = _data.Members.filter(
          (user: IUserDetails) => user.Role != category
        );
        _data.Allocation[category] = allocation;
      }
    });

    setErrorMsg("");
    setUserListDetails({
      category: category,
      allocation: allocation,
    });

    setItemDatas({ ..._data });
    setFilteredUsers([...resUsers]);
  };

  const membersOnChangeHandler = (
    category: string,
    allocation: number,
    users: ISelectedUsers
  ) => {
    let _data: IObjectData = { ...itemDatas };

    if (users.isSelected) {
      if (category != "Developer") {
        _data.Members = _data.Members.filter((user) => user.Role != category);
      }
      _data.Members.push({
        Name: users.Displayname,
        Email: users.Email,
        Role: category,
        Allocation: allocation,
      });
    } else {
      _data.Members = _data.Members.filter((user) => user.Email != users.Email);
    }

    getUserList(category, allocation, _data, _data.Members);

    setItemDatas({ ..._data });
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
              value={itemDatas.StartDate ? new Date(itemDatas.StartDate) : null}
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
                  selectedKey={
                    itemDatas.Allocation.PM
                      ? itemDatas.Allocation.PM.toString()
                      : ""
                  }
                  onChange={(e, value) => {
                    getUserList(
                      "PM",
                      parseInt(value.key as string),
                      itemDatas,
                      []
                    );
                  }}
                />
              </div>

              <div
                style={{
                  width: "58%",
                  margin: "0px 34px",
                }}
              >
                <TextField
                  styles={disableTextField}
                  disabled
                  value={itemDatas.Members.filter(
                    (user: IUserDetails) => user.Role == "PM"
                  )
                    .map((_user: IUserDetails) => _user.Name)
                    .join(", ")}
                />
              </div>

              <EditOutlined
                style={
                  itemDatas.Members.filter(
                    (user: IUserDetails) => user.Role == "PM"
                  ).length > 0
                    ? {
                        color: "#1d1d7c",
                        cursor: "pointer",
                      }
                    : {
                        color: "#ababab",
                        cursor: "not-allowed",
                      }
                }
                onClick={(e) => {
                  if (
                    itemDatas.Members.filter(
                      (user: IUserDetails) => user.Role == "PM"
                    ).length > 0
                  ) {
                    getUserList(
                      "PM",
                      itemDatas.Allocation.PM,
                      itemDatas,
                      itemDatas.Members
                    );
                  }
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
                  selectedKey={
                    itemDatas.Allocation.TL
                      ? itemDatas.Allocation.TL.toString()
                      : ""
                  }
                  onChange={(e, value) => {
                    getUserList(
                      "TL",
                      parseInt(value.key as string),
                      itemDatas,
                      []
                    );
                  }}
                />
              </div>

              <div
                style={{
                  width: "58%",
                  margin: "0px 34px",
                }}
              >
                <TextField
                  styles={disableTextField}
                  disabled
                  value={itemDatas.Members.filter(
                    (user: IUserDetails) => user.Role == "TL"
                  )
                    .map((_user: IUserDetails) => _user.Name)
                    .join(", ")}
                />
              </div>

              <EditOutlined
                style={
                  itemDatas.Members.filter(
                    (user: IUserDetails) => user.Role == "TL"
                  ).length > 0
                    ? {
                        color: "#1d1d7c",
                        cursor: "pointer",
                      }
                    : {
                        color: "#ababab",
                        cursor: "not-allowed",
                      }
                }
                onClick={(e) => {
                  if (
                    itemDatas.Members.filter(
                      (user: IUserDetails) => user.Role == "TL"
                    ).length > 0
                  ) {
                    getUserList(
                      "TL",
                      itemDatas.Allocation.TL,
                      itemDatas,
                      itemDatas.Members
                    );
                  }
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
                  selectedKey={
                    itemDatas.Allocation.Designer
                      ? itemDatas.Allocation.Designer.toString()
                      : ""
                  }
                  onChange={(e, value) => {
                    getUserList(
                      "Designer",
                      parseInt(value.key as string),
                      itemDatas,
                      []
                    );
                  }}
                />
              </div>

              <div
                style={{
                  width: "58%",
                  margin: "0px 34px",
                }}
              >
                <TextField
                  styles={disableTextField}
                  disabled
                  value={itemDatas.Members.filter(
                    (user: IUserDetails) => user.Role == "Designer"
                  )
                    .map((_user: IUserDetails) => _user.Name)
                    .join(", ")}
                />
              </div>

              <EditOutlined
                style={
                  itemDatas.Members.filter(
                    (user: IUserDetails) => user.Role == "Designer"
                  ).length > 0
                    ? {
                        color: "#1d1d7c",
                        cursor: "pointer",
                      }
                    : {
                        color: "#ababab",
                        cursor: "not-allowed",
                      }
                }
                onClick={(e) => {
                  if (
                    itemDatas.Members.filter(
                      (user: IUserDetails) => user.Role == "Designer"
                    ).length > 0
                  ) {
                    getUserList(
                      "Designer",
                      itemDatas.Allocation.Designer,
                      itemDatas,
                      itemDatas.Members
                    );
                  }
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
                  selectedKey={
                    itemDatas.Allocation.Tester
                      ? itemDatas.Allocation.Tester.toString()
                      : ""
                  }
                  onChange={(e, value) => {
                    getUserList(
                      "Tester",
                      parseInt(value.key as string),
                      itemDatas,
                      []
                    );
                  }}
                />
              </div>

              <div
                style={{
                  width: "58%",
                  margin: "0px 34px",
                }}
              >
                <TextField
                  styles={disableTextField}
                  disabled
                  value={itemDatas.Members.filter(
                    (user: IUserDetails) => user.Role == "Tester"
                  )
                    .map((_user: IUserDetails) => _user.Name)
                    .join(", ")}
                />
              </div>

              <EditOutlined
                style={
                  itemDatas.Members.filter(
                    (user: IUserDetails) => user.Role == "Tester"
                  ).length > 0
                    ? {
                        color: "#1d1d7c",
                        cursor: "pointer",
                      }
                    : {
                        color: "#ababab",
                        cursor: "not-allowed",
                      }
                }
                onClick={(e) => {
                  if (
                    itemDatas.Members.filter(
                      (user: IUserDetails) => user.Role == "Tester"
                    ).length > 0
                  ) {
                    getUserList(
                      "Tester",
                      itemDatas.Allocation.Tester,
                      itemDatas,
                      itemDatas.Members
                    );
                  }
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
                  selectedKey={
                    itemDatas.Allocation.Developer
                      ? itemDatas.Allocation.Developer.toString()
                      : ""
                  }
                  onChange={(e, value) => {
                    getUserList(
                      "Developer",
                      parseInt(value.key as string),
                      itemDatas,
                      []
                    );
                  }}
                />
              </div>

              <div
                style={{
                  width: "58%",
                  margin: "0px 34px",
                }}
              >
                <TextField
                  styles={disableTextField}
                  multiline
                  disabled
                  value={itemDatas.Members.filter(
                    (user: IUserDetails) => user.Role == "Developer"
                  )
                    .map((_user: IUserDetails) => _user.Name)
                    .join(", ")}
                />
              </div>

              <EditOutlined
                style={
                  itemDatas.Members.filter(
                    (user: IUserDetails) => user.Role == "Developer"
                  ).length > 0
                    ? {
                        color: "#1d1d7c",
                        cursor: "pointer",
                      }
                    : {
                        color: "#ababab",
                        cursor: "not-allowed",
                      }
                }
                onClick={(e) => {
                  if (
                    itemDatas.Members.filter(
                      (user: IUserDetails) => user.Role == "Developer"
                    ).length > 0
                  ) {
                    getUserList(
                      "Developer",
                      itemDatas.Allocation.Developer,
                      itemDatas,
                      itemDatas.Members
                    );
                  }
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
                {userListDetails.category &&
                  roleAcronyms[userListDetails.category]}
              </h3>
              <div className="rightboxScroll">
                {filteredUsers.length > 0 &&
                  filteredUsers.map((user: ISelectedUsers) => {
                    return (
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
                          checked={user.isSelected}
                          onClick={() => {
                            membersOnChangeHandler(
                              userListDetails.category,
                              userListDetails.allocation,
                              {
                                ...user,
                                isSelected: !user.isSelected,
                              }
                            );
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
                                user.Email
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
                              <div
                                style={{ fontWeight: "600", fontSize: "14px" }}
                              >
                                {user.Displayname}
                              </div>
                              <div
                                style={{ fontWeight: "600", fontSize: "14px" }}
                              >
                                {user.Availablity}%
                              </div>
                            </div>
                          </p>
                        </div>
                      </div>
                    );
                  })}
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
