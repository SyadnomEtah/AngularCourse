This a repository for a fullstack learning project made using .NET 8 (API) and Angular 18 (client side).

It's a simple dating app where members can connect through giving each other likes and messaging each other in real time.

The project features these functionalities:
- User registration and authentication.
- Role and policy based authorization.
- Photo upload to an external cloud service.
- Role assignment through dedicated admin panel.
- Photo review/approval - each photo uploaded by the users must be manually approved by moderators or administrators for it to be visible to other members.
- Users can edit their information after registration in the dedicated panel.
- Users can see if other members are currently online (presence) and message each other in real time.
- User can display a list of other members and filter/sort it.
- Users can view other member's profiles and their information.

The technologies and libraries that were used to achieve the final result include:
- ASP.NET Core,
- ASP.NET Core Identity,
- Entity Framework Core,
- SignalR,
- JWT based authorization,
- Auto Mapper,
- SQLite.

Additionaly front end side uses various interceptors, guards, directives and resolvers to hide and show content appropriate for user's role as well data provided through queries.

This project was created by following intructions present in the [Udemy course by Neil Cummings](https://www.udemy.com/course/build-an-app-with-aspnet-core-and-angular-from-scratch/). 
