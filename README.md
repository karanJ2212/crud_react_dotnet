


<div align="center">
  <br/>
  <h1><b> Product Management Application</b></h1>
  <h4>This Product Management Application is a full-stack application that allows users to perform CRUD (Create, Read, Update, Delete) operations on products. The backend is built with ASP.NET Core, providing RESTful APIs, and the frontend is developed using React with Redux for state management. This guide will walk you through the steps to set up both the frontend and backend parts of the application.
.
<a name="readme-top"></a>
</h4>

</div>





Prerequisites
Before you begin, ensure you have the following installed on your system:

.NET 6.0 SDK or later
Node.js (which includes npm)
Visual Studio Code or any preferred IDE for development
SQL Server (Optional, if you plan to use a different database, ensure you have it installed and configured)
Backend Setup
Clone the Repository
https://github.com/karanJ2212/crud-react-dotnet-backend.git

Start by cloning the repository containing the backend code to your local machine.

bash

git clone <https://github.com/karanJ2212/crud-react-dotnet-backend.git>
cd <crud-react-dotnet-backend>
Database Setup

Ensure SQL Server is running.
Update the connection string in appsettings.json to match your SQL Server configuration.
Restore Dependencies

Navigate to the backend project directory and restore the NuGet packages.

bash

dotnet restore
Run Migrations

Apply the Entity Framework migrations to create the database schema.

bash

dotnet ef database update
Start the Application

Run the backend application.

bash

dotnet run
The API will be hosted at https://localhost:7065/ by default.

Frontend Setup
Clone the Frontend Repository

If the frontend code is in a separate repository, clone it to your local machine. Otherwise, navigate to the frontend directory if it's part of a monorepo.

bash

git clone <https://github.com/karanJ2212/crud_react_dotnet.git>
cd <crud_react_dotnet>
Install Dependencies

Install the required npm packages.

bash

npm install
Configure API Endpoint

Ensure the API base URL in the frontend application matches the backend's URL. This is typically set in a configuration file or within the services that make API calls.

Run the Frontend Application

Start the React application.

bash
npm start
By default, the frontend will be available at http://localhost:3000/.

Usage
With both the frontend and backend running, you can navigate to http://localhost:3000/ in your web browser to use the application. From there, you can add, view, update, and delete products using the web interface.

Support
If you encounter any issues or have questions regarding the setup process, please refer to the respective documentation for each technology or framework used. You may also raise an issue in the repository for specific problems related to this application.
