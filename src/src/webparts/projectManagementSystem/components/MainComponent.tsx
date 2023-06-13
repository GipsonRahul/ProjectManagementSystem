import * as React from "react";
import { useState, useEffect } from "react";
import SideNavebar from "./SideNavebar";
import Dashboard from "./Dashboard";
import Members from "./Members";
import ProjectForm from "./ProjectForm";

interface IUsers {
  Displayname: string;
  Email: string;
  Position: string;
  Availablity: number;
  ID: number;
}

interface IDrop {
  key: string;
  text: string;
}

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

const Users: IUsers[] = require("../../../ExternalJSON/Users.json");

let _itemObj: any = "";
let _ProjectManagers: IUsers[] = [];
let _TeamLeads: IUsers[] = [];
let _Developers: IUsers[] = [];
let _Designers: IUsers[] = [];
let _Testers: IUsers[] = [];
let _manaDropdown: IDrop[] = [];
let _TLDropdown: IDrop[] = [];
let _DevDropdown: IDrop[] = [];
let _DesDropdown: IDrop[] = [];
let _TesterDropdown: IDrop[] = [];
let _masterUsersDetails: any[] = [];
let _masterUsersDropDown: any[] = [];
let _masterListData: IMasterData[] = [];

let sampleData: IMasterData[] = [
  {
    ID: 1,
    ProjectName: "Project 001",
    ProjectType: "SPFx",
    ProjectDescription: "Project 001 Description",
    Status: "Active",
    StartDate: "01/02/2023",
    EndDate: "10/02/2023",
    ProjectManager: {
      DisplayName: "Chandru",
      Email: "chandru@technorucs.com",
    },
    TeamLead: { DisplayName: "Kali A", Email: "kali@technorucs.com" },
    Developers: [
      { DisplayName: "Gipson Rahul", Email: "gipsonrahul.j@technorucs.com" },
      { DisplayName: "Devaraj P", Email: "devaraj.p@technorucs.com" },
    ],
    DevelopersEmail: [
      "gipsonrahul.j@technorucs.com",
      "devaraj.p@technorucs.com",
    ],
    Designers: { DisplayName: "Leo Wilson", Email: "leowilson@technorucs.com" },
    Testers: {
      DisplayName: "Srinivasan Ramanan",
      Email: "srinivasan@technorucs.com",
    },
    Members: [
      { DisplayName: "Gipson Rahul", Email: "gipsonrahul.j@technorucs.com" },
      { DisplayName: "Devaraj P", Email: "devaraj.p@technorucs.com" },
      { DisplayName: "Leo Wilson", Email: "leowilson@technorucs.com" },
      { DisplayName: "Srinivasan Ramanan", Email: "srinivasan@technorucs.com" },
    ],
    ProjectCost: "100",
    ProjectEstimate: "200",
    ActualCost: "300",
    isSelect: false,
  },
];

const MainComponent = () => {
  // variable creation section
  // State creation section start
  const [masterRecords, setMasterRecords] = useState<IMasterData[]>([
    ...sampleData,
  ]);
  const [currentPage, setCurrentPage] = useState<string>("Dashboard");
  // State creation section end

  // Navigation section
  const getNavigation = (nav: string, item: any) => {
    _itemObj = item ? item : null;
    setCurrentPage(nav);
  };

  // users filter section
  const getUsersFilter = () => {
    _ProjectManagers = Users.filter(
      (mana: IUsers) => mana.Position.toLowerCase() == "project manager"
    );
    _TeamLeads = Users.filter(
      (mana: IUsers) => mana.Position.toLowerCase() == "team lead"
    );
    _Developers = Users.filter(
      (mana: IUsers) => mana.Position.toLowerCase() == "developer"
    );
    _Designers = Users.filter(
      (mana: IUsers) => mana.Position.toLowerCase() == "designer"
    );
    _Testers = Users.filter(
      (mana: IUsers) => mana.Position.toLowerCase() == "tester"
    );
    _masterUsersDetails = [
      {
        ProjectManagers: _ProjectManagers,
        TeamLeads: _TeamLeads,
        Developers: _Developers,
        Designers: _Designers,
        Testers: _Testers,
      },
    ];
    getUserDropFilter();
  };

  // filter user dropdown values function
  const getUserDropFilter = () => {
    _ProjectManagers.forEach((e: IUsers) => {
      _manaDropdown.push({ key: e.Email, text: e.Displayname });
    });
    _TeamLeads.forEach((e: IUsers) => {
      _TLDropdown.push({ key: e.Email, text: e.Displayname });
    });
    _Developers.forEach((e: IUsers) => {
      _DevDropdown.push({ key: e.Email, text: e.Displayname });
    });
    _Designers.forEach((e: IUsers) => {
      _DesDropdown.push({ key: e.Email, text: e.Displayname });
    });
    _Testers.forEach((e: IUsers) => {
      _TesterDropdown.push({ key: e.Email, text: e.Displayname });
    });
    _masterUsersDropDown = [
      {
        manaDropdown: _manaDropdown,
        TLDropdown: _TLDropdown,
        DevDropdown: _DevDropdown,
        DesDropdown: _DesDropdown,
        TesterDropdown: _TesterDropdown,
      },
    ];
  };

  // master details array function
  const getMasterDatas = (action: string, value: any) => {
    if (action == "add") {
      _masterListData.unshift(value);
      _masterListData.length &&
        _masterListData.forEach((item: IMasterData) => (item.isSelect = false));
      setMasterRecords(_masterListData);
    } else {
      _masterListData = [...value];
      value.length &&
        value.forEach((item: IMasterData) => (item.isSelect = false));
      setMasterRecords([...value]);
    }
  };

  // life cycle function for onload
  useEffect(() => {
    setMasterRecords([...sampleData]);
    _masterListData = [...sampleData];
    _itemObj = "";
    getUsersFilter();
  }, []);

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div
        style={{
          background: "#fff",
          width: "15%",
          height: "100vh",
          borderRight: "1px solid #dfdfdf",
        }}
      >
        <SideNavebar navigation={getNavigation} _selectNave={currentPage} />
      </div>
      <div style={{ width: "85%", background: "#fff", height: "100vh" }}>
        {currentPage == "Dashboard" ? (
          <Dashboard
            navigation={getNavigation}
            masterRecords={masterRecords}
            getMasterDatas={getMasterDatas}
          />
        ) : currentPage == "Members" ? (
          <Members _masterUsersDetails={_masterUsersDetails} />
        ) : (
          <ProjectForm
            navigation={getNavigation}
            item={_itemObj}
            _masterUsersDropDown={_masterUsersDropDown}
            masterRecords={masterRecords}
            getMasterDatas={getMasterDatas}
            _count={
              masterRecords.length == 0
                ? 0
                : masterRecords[masterRecords.length - 1].ID
            }
          />
        )}
      </div>
    </div>
  );
};

export default MainComponent;
