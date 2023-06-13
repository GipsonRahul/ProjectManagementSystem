import * as React from "react";
import styles from "./ProjectManagementSystem.module.scss";
import { IProjectManagementSystemProps } from "./IProjectManagementSystemProps";
import { escape } from "@microsoft/sp-lodash-subset";
import MainComponent from "./MainComponent";
import "../../../ExternalRef/CSS/style.css";
import { sp } from "@pnp/sp/presets/all";

export default class ProjectManagementSystem extends React.Component<
  IProjectManagementSystemProps,
  {}
> {
  constructor(prop: IProjectManagementSystemProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }

  public render(): React.ReactElement<IProjectManagementSystemProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <MainComponent sp={sp} context={this.context} />;
  }
}
