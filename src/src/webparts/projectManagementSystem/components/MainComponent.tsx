import * as React from "react";
import { useState, useEffect } from "react";
import SideNavebar from "./SideNavebar";
import Dashboard from "./Dashboard";
import Members from "./Members";
import ProjectForm from "./ProjectForm";

interface IUsers {
  Displayname: string;
  Firstname: string;
  Lastname: string;
  Email: string;
  Position: string;
  Availablity: number;
  ID: number;
}

interface INave {
  mainDashboard: string;
  formDashboard: string;
  membersDashboard: string;
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
let _count: number = 0;

const MainComponent = () => {
  // variable creation section
  let _defalutNave: INave = {
    mainDashboard: "dashboard",
    formDashboard: "detaillistdashboard",
    membersDashboard: "membersdashboard",
  };

  // State creation section start
  const [naveComponent, setNaveComponent] = useState<INave>(_defalutNave);
  const [masterRecords, setMasterRecords] = useState<IMasterData[]>([]);
  // State creation section end

  // Navigation section
  const getNavigation = (nave: any, item: number) => {
    _itemObj = item ? item : "";
    if (nave == "dashboard" || nave == "formdashboard") {
      _defalutNave.mainDashboard = "dashboard";
      _defalutNave.formDashboard = nave;
      _defalutNave.membersDashboard = "";
      setNaveComponent({ ..._defalutNave });
    } else {
      _defalutNave.mainDashboard = "";
      _defalutNave.formDashboard = "";
      _defalutNave.membersDashboard = "membersdashboard";
      setNaveComponent({ ..._defalutNave });
    }
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
    if (_masterListData.length) {
    } else {
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
    }
  };

  // master details array function
  const getMasterDatas = (action: string, value: any) => {
    if (action == "add") {
      _masterListData.unshift(value);
      _masterListData.length &&
        _masterListData.forEach((item: IMasterData) => (item.isSelect = false));
      setMasterRecords(_masterListData);
    } else {
      value.length &&
        value.forEach((item: IMasterData) => (item.isSelect = false));
      setMasterRecords([...value]);
    }
  };

  // life cycle function for onload
  useEffect(() => {
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
        <SideNavebar
          navigation={getNavigation}
          _selectNave={naveComponent.mainDashboard}
        />
      </div>
      <div style={{ width: "85%", background: "#fff", height: "100vh" }}>
        {naveComponent.mainDashboard == "dashboard" ? (
          naveComponent.formDashboard == "formdashboard" ? (
            _masterUsersDropDown.length && (
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
            )
          ) : (
            <Dashboard
              navigation={getNavigation}
              masterRecords={masterRecords}
              getMasterDatas={getMasterDatas}
            />
          )
        ) : (
          _masterUsersDetails.length && (
            <Members _masterUsersDetails={_masterUsersDetails} />
          )
        )}
      </div>
    </div>
  );
};

export default MainComponent;
