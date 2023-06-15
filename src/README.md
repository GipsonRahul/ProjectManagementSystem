# ProjectEase

## Summary

This is a project management application that helps us in managing project details, team members, and allocation of resources. It consists of three main components: Dashboard, Add/Edit Form, and Members Details.

## Dashboard

The Dashboard component provides a visually appealing interface to view project details and team member information. It displays essential information about the projects, such as project status, progress, and project cost details. Additionally, it shows the list of team members associated with each project.

![Dashboard Screenshot](https://technorucs365-my.sharepoint.com/:i:/g/personal/gipsonrahul_j_technorucs_com/ETibtciNzm5Djq1aaX34tUYBJ1dJFTok8OkrsCbidtSDAQ?e=DB7VgS)

## Add / Edit Form

The Add/Edit Form module allows users to add and edit project details. It provides a user-friendly interface to input project-specific information, such as project name, start date, project description, resource allocation and project cost details. This module ensures that all necessary project details are captured accurately.

![Add/Edit Form Screenshot](placeholder_image_url)

## Members Details

The Members Management module facilitates the allocation of managers, team lead, developers, designers, and testers to projects based on their availability. It helps in efficiently assigning team members to projects by considering their free allocation time within the company. This module simplifies the process of adding and managing members within a project.

![Members Management Screenshot](placeholder_image_url)

## Data Storage

Instead of using a real-time backend server, this project utilizes a JSON file for data storage. The JSON file serves as a database for storing project details and team member information. When you add or edit project details or allocate members, the JSON file is updated accordingly. This approach provides a simple and lightweight solution for data storage.

Please note that we use JSON as backend because it is for demonstration .But we can use `Sharepoint` or `Azure SQL` as backend for real-time usage

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

> - [Node.js](https://nodejs.org/), supported versions: 14 ,16
> - [Set up SharePoint Framework development environment](https://aka.ms/teamsfx-spfx-dev-environment-setup)
> - An Microsoft 365 account. Get your own free Microsoft 365 tenant from [Microsoft 365 developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program)
> - [Teams Toolkit Visual Studio Code Extension](https://aka.ms/teams-toolkit) version 5.0.0 and higher or [TeamsFx CLI](https://aka.ms/teamsfx-cli)

## Debug

Start debugging the project by hitting the `F5` key in Visual Studio Code. Alternatively use the `Run and Debug Activity Panel` in Visual Studio Code and click the `Start Debugging` green arrow button.

- `Teams workbench` is the default debug configuration. Using this configuration, you can install the SPFx app within Teams context as a Teams app.
- `Hosted workbench`. You need to navigate to [launch.json](../.vscode/launch.json), replace `enter-your-SharePoint-site` with your SharePoint site, eg. `https://{your-tenant-name}.sharepoint.com/sites/{your-team-name}/_layouts/workbench.aspx`. You can also use root site if you haven't created one, eg. `https://{your-tenant-name}.sharepoint.com/_layouts/workbench.aspx`.

## Minimal Path to Awesome

1. Open the project with VSCode, click `Provision` in LIFECYCLE panel of Teams Toolkit extension.

    Or you can use TeamsFx CLI with running this cmd under your project path:
    `teamsfx provision`

    It will provision an app in Teams App Studio. You may need to login with your Microsoft 365 tenant admin account.

2. Build and Deploy your SharePoint Package.
    - Click `Deploy` in LIFECYCLE panel of Teams Toolkit extension, or run `Teams: Deploy` from command palette. This will generate a SharePoint package (*.sppkg) under sharepoint/solution folder.
  
    Or you can use TeamsFx CLI with running this cmd under your project path:
        `teamsfx deploy`

    - After building the *.sppkg, the Teams Toolkit extension will upload and deploy it to your tenant App Catalog. Only tenant App Catalog site admin has permission to do it. You can create your test tenant following [Setup your Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant).
3. Go back to Teams Toolkit extension, click `Teams: Publish` in LIFECYCLE panel.

    Or you can use TeamsFx CLI with running this cmd under your project path:
        `teamsfx publish`

    You will find your app in [Microsoft Teams admin center](https://admin.teams.microsoft.com/policies/manage-apps). Enter your app name in the search box. Click the item and select `Publish` in the Publishing status.

4. You may need to wait for a few minutes after publishing your teams app. And then login to Teams, and you will find your app in the `Apps - Built for {your-tenant-name}` category.

5. Click "Add" to use the app as a personal tab. Click "Add to a team" to use the app as a group tab.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
