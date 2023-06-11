import * as React from "react";
import { useState, useEffect } from "react";
import { ArrowBackIos } from "@material-ui/icons";
import {
  Label,
  Persona,
  PersonaSize,
  Dropdown,
  TextField,
  DatePicker,
} from "@fluentui/react";
import { IDropDown } from "../CommonDropDown/DropDown";
import * as moment from "moment";

interface IDetails {
  DisplayName: string;
  Email: string;
}

interface IObjectData {
  ID: number;
  ProjectName: string;
  ProjectType: string;
  ProjectDescription: string;
  Status: string;
  StartDate: any;
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

const ProjectForm = (props: any) => {
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
    Members: [],
    ProjectCost: "",
    ProjectEstimate: "",
    ActualCost: "",
    isSelect: false,
  };

  // State section start
  const [viewFormText, setViewFormText] = useState<string>("add");
  const [itemDatas, setItemDatas] = useState<IObjectData>(_readyObj);
  // State section end

  // multiple dropdown onchange function
  const onchangeFunction = (text: any) => {
    if (
      !itemDatas.DevelopersEmail.some((e: string) => e == (text.key as string))
    ) {
      itemDatas.Developers.push({
        Email: text.key as string,
        DisplayName: text.text as string,
      });
      itemDatas.DevelopersEmail.push(text.key as string);
    } else {
      let _removeIndex: number = itemDatas.DevelopersEmail.indexOf(
        text.key as string
      );
      itemDatas.DevelopersEmail.splice(_removeIndex, 1);
      itemDatas.Developers.splice(_removeIndex, 1);
    }
    getMasterArray();
  };

  // master members array filter
  const getMasterArray = () => {
    itemDatas.Members = [];
    if (itemDatas.Developers.length) {
      for (let i = 0; itemDatas.Developers.length > i; i++) {
        if (i == 0) {
          itemDatas.Testers.Email && itemDatas.Members.push(itemDatas.Testers);
          itemDatas.Designers.Email &&
            itemDatas.Members.push(itemDatas.Designers);
          itemDatas.Members.push(itemDatas.Developers[i]);
        } else {
          itemDatas.Members.push(itemDatas.Developers[i]);
        }
      }
    } else {
      itemDatas.Testers.Email && itemDatas.Members.push(itemDatas.Testers);
      itemDatas.Designers.Email && itemDatas.Members.push(itemDatas.Designers);
    }
    setItemDatas({ ...itemDatas });
  };

  // current items get function
  const getCurrentItem = () => {
    let editFormText: string = props.item ? "edit" : "add";
    let _currentItem: IObjectData = _readyObj;
    if (editFormText == "edit") {
      _currentItem = props.item;
    }
    setItemDatas(_currentItem);
    setViewFormText(editFormText);
  };

  // life cycle for onload
  useEffect(() => {
    getCurrentItem();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {/* Add and Edit header section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 20px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <ArrowBackIos
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.navigation("dashboard");
            }}
          />
          <Label>
            {viewFormText == "add" ? "Add Project" : "Edit Project"}
          </Label>
        </div>
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

      {/* Form section start */}
      {/* Project details section */}
      <div style={{ display: "flex", margin: "10px 20px" }}>
        {/* Left section */}
        <div style={{ width: "50%" }}>
          {/* Project Name section */}
          <div style={{ width: "50%" }}>
            <Label>Project Name *</Label>
            <TextField
              value={itemDatas.ProjectName ? itemDatas.ProjectName : ""}
              onChange={(e: any) => {
                itemDatas.ProjectName = e.target.value;
                setItemDatas({ ...itemDatas });
              }}
            />
          </div>

          {/* Project Type section */}
          <div style={{ width: "50%" }}>
            <Label>Project Type *</Label>
            <Dropdown
              placeholder="Please select project type"
              options={IDropDown.ProjectType}
              selectedKey={itemDatas.ProjectType ? itemDatas.ProjectType : ""}
              onChange={(e, text) => {
                itemDatas.ProjectType = text.key as string;
                setItemDatas({ ...itemDatas });
              }}
            />
          </div>

          {/* Status section */}
          <div style={{ width: "50%" }}>
            <Label>Status *</Label>
            <Dropdown
              placeholder="Please select status"
              options={IDropDown.Status}
              selectedKey={itemDatas.Status ? itemDatas.Status : ""}
              onChange={(e, text) => {
                itemDatas.Status = text.key as string;
                setItemDatas({ ...itemDatas });
              }}
            />
          </div>

          {/* start date section */}
          <div style={{ width: "50%" }}>
            <Label>Start Date *</Label>
            <DatePicker
              placeholder="MM/DD/YYYY"
              value={itemDatas.StartDate ? new Date(itemDatas.StartDate) : null}
              formatDate={(date) => moment(date).format("MM/DD/YYYY")}
              onSelectDate={(data) => {
                itemDatas.StartDate = moment(data).format();
                setItemDatas({ ...itemDatas });
              }}
            />
          </div>

          {/* Project Description section */}
          <div style={{ width: "50%" }}>
            <Label>Project Description</Label>
            <TextField
              multiple
              value={
                itemDatas.ProjectDescription ? itemDatas.ProjectDescription : ""
              }
              onChange={(e: any) => {
                itemDatas.ProjectDescription = e.target.value;
                setItemDatas({ ...itemDatas });
              }}
            />
          </div>
        </div>

        {/* Right section */}
        <div style={{ width: "50%" }}>
          {/* Project manager section */}
          <div style={{ width: "50%" }}>
            <Label>Project Manager *</Label>
            <Dropdown
              placeholder="Please select project manager"
              options={props._masterUsersDropDown[0].manaDropdown}
              selectedKey={
                itemDatas.ProjectManager.Email
                  ? itemDatas.ProjectManager.Email
                  : ""
              }
              onChange={(e, text) => {
                itemDatas.ProjectManager.Email = text.key as string;
                itemDatas.ProjectManager.DisplayName = text.text as string;
                setItemDatas({ ...itemDatas });
              }}
            />
          </div>

          {/* Team Lead section */}
          <div style={{ width: "50%" }}>
            <Label>Team Lead *</Label>
            <Dropdown
              placeholder="Please select team lead"
              options={props._masterUsersDropDown[0].TLDropdown}
              selectedKey={
                itemDatas.TeamLead.Email ? itemDatas.TeamLead.Email : ""
              }
              onChange={(e, text) => {
                itemDatas.TeamLead.Email = text.key as string;
                itemDatas.TeamLead.DisplayName = text.text as string;
                setItemDatas({ ...itemDatas });
              }}
            />
          </div>

          {/* Tester section */}
          <div style={{ width: "50%" }}>
            <Label>Tester *</Label>
            <Dropdown
              placeholder="Please select tester"
              options={props._masterUsersDropDown[0].TesterDropdown}
              selectedKey={
                itemDatas.Testers.Email ? itemDatas.Testers.Email : ""
              }
              onChange={(e, text) => {
                itemDatas.Testers.Email = text.key as string;
                itemDatas.Testers.DisplayName = text.text as string;
                setItemDatas({ ...itemDatas });
                getMasterArray();
              }}
            />
          </div>

          {/* Designer section */}
          <div style={{ width: "50%" }}>
            <Label>Designer *</Label>
            <Dropdown
              placeholder="Please select designer"
              options={props._masterUsersDropDown[0].DesDropdown}
              selectedKey={
                itemDatas.Designers.Email ? itemDatas.Designers.Email : ""
              }
              onChange={(e, text) => {
                itemDatas.Designers.Email = text.key as string;
                itemDatas.Designers.DisplayName = text.text as string;
                setItemDatas({ ...itemDatas });
                getMasterArray();
              }}
            />
          </div>

          {/* Developers section */}
          <div style={{ width: "50%" }}>
            <Label>Developers *</Label>
            <Dropdown
              placeholder="Please select developers"
              multiSelect
              options={props._masterUsersDropDown[0].DevDropdown}
              selectedKeys={
                itemDatas.DevelopersEmail.length
                  ? [...itemDatas.DevelopersEmail]
                  : []
              }
              onChange={(e, text) => {
                onchangeFunction(text);
              }}
            />
          </div>
        </div>
      </div>

      {/* Project cost details section */}
      <div style={{ display: "flex", margin: "10px 20px" }}>
        {/* Left section */}
        <div style={{ width: "50%" }}>
          {/* Project Cost section */}
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Label>Project Cost</Label>
            <TextField
              value={itemDatas.ProjectCost ? itemDatas.ProjectCost : ""}
              onChange={(e: any) => {
                itemDatas.ProjectCost = e.target.value;
                setItemDatas({ ...itemDatas });
              }}
            />
          </div>

          {/* Project Estimate section */}
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Label>Project Estimate</Label>
            <TextField
              value={itemDatas.ProjectEstimate ? itemDatas.ProjectEstimate : ""}
              onChange={(e: any) => {
                itemDatas.ProjectEstimate = e.target.value;
                setItemDatas({ ...itemDatas });
              }}
            />
          </div>

          {/* Actual Cost section */}
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Label>Actual Cost</Label>
            <TextField
              value={itemDatas.ActualCost ? itemDatas.ActualCost : ""}
              onChange={(e: any) => {
                itemDatas.ActualCost = e.target.value;
                setItemDatas({ ...itemDatas });
              }}
            />
          </div>
        </div>

        {/* Right section */}
        <div style={{ width: "50%" }}>
          {/* Project Manager section */}
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Label>Project Manager</Label>
            <TextField
              disabled={true}
              value={itemDatas.ProjectManager.Email ? "1" : "0"}
            />
          </div>

          {/* QA Tester section */}
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Label>Team Lead</Label>
            <TextField
              disabled={true}
              value={itemDatas.TeamLead.Email ? "1" : "0"}
            />
          </div>

          {/* Developer section */}
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Label>Members</Label>
            <TextField
              disabled={true}
              value={itemDatas.Members.length.toString()}
            />
          </div>
        </div>
      </div>
      {/* Form section end */}

      {/* Button section */}
      <div
        style={{
          display: "flex",
          margin: "10px 20px",
          justifyContent: "end",
        }}
      >
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
              height: "28px",
              border: "1px solid #A9F37F",
              borderRadius: "8px",
              background: "#fff",
            }}
            onClick={() => {
              props.navigation("dashboard");
            }}
          >
            Cancel
          </button>
          <button
            style={{
              cursor: "pointer",
              width: "80px",
              height: "28px",
              border: "1px solid #A9F37F",
              borderRadius: "8px",
              background: "#A9F37F",
            }}
            onClick={() => {
              viewFormText == "add" &&
                ((itemDatas.ID = props._count + 1),
                setItemDatas({ ...itemDatas }));
              props.getMasterDatas(itemDatas);
              props.navigation("dashboard");
            }}
          >
            {viewFormText == "add" ? "Save" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
