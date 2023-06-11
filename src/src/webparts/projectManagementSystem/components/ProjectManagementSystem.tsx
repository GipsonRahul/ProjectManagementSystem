import * as React from "react";
// import styles from "./ProjectManagementSystem.module.scss";
import { IProjectManagementSystemProps } from "./IProjectManagementSystemProps";
import { escape } from "@microsoft/sp-lodash-subset";
import MainComponent from "./MainComponent";
import "../../../ExternalRef/CSS/style.css";

export default class ProjectManagementSystem extends React.Component<
  IProjectManagementSystemProps,
  {}
> {
  public render(): React.ReactElement<IProjectManagementSystemProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <MainComponent />;
  }
}
