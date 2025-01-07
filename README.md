## About
This a repository for a fullstack learning project made using .NET 8 (API) and Angular 18 (client side).\
It's a simple dating app where members can connect through giving each other likes and messaging each other in real time.\
This project was created by following intructions present in the [Udemy course by Neil Cummings](https://www.udemy.com/course/build-an-app-with-aspnet-core-and-angular-from-scratch/). 

## Preview
Current version is currently deployed [here](https://aw-angularcourse.azurewebsites.net/) if anyone wants to play with it without downloading and deploying the app themselves.

## Features
- User registration and authentication.
- Role and policy based authorization.
- Photo upload to an external cloud service.
- Role assignment through dedicated admin panel.
- Photo review/approval - each photo uploaded by the users must be manually approved by moderators or administrators for it to be visible to other members.
- Users can edit their information after registration in the dedicated panel.
- Users can see if other members are currently online (presence) and message each other in real time.
- User can display a list of other members and filter/sort it.
- Users can view other member's profiles and their information.

## Technologies, packages, libraries:
- ASP.NET Core,
- ASP.NET Core Identity,
- Entity Framework Core,
- SignalR,
- JWT based authorization,
- Auto Mapper,
- SQLite (later migrated to MSSQL for deployment).

Additionaly front-end side uses various interceptors, guards, directives and resolvers to hide and show content appropriate for user's role as well data provided through queries.

## How it was deployed
Application is uses Github Actions as a CI/CD solution to build and deploy the application to Azure. 

Azure services used by this application:
- App Service / Web App,
- SQL Database (MSSQL).
