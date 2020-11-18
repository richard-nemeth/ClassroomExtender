# ClassroomExtenderNodeJS
* Make sure that You have Node.js installed at least version **12.16.1**
* Any Any Git version might be sufficient.
* Check out the project.
* Enter it's base folder from your command line tool.
* Enter: **npm install**
* Install any MongoDB managers, like MongoDB compass.
* Create a Database.
* Create 2 collections in it:
  * Students
  * Users
* Register the applicatin in Your Google Developer Console for auth tokens.
 ** All steps are described in the thesis.
* Place a .env file into the project's folder.

  ```
  SERVER_PORT = 3000
  LOGGER_TIMESTAMP_PATTERN = "YYYY-MM-DD HH:mm:ss"
  LOGGER_DESTINATION = "drive:/your/path/to/keep/logs/application-%DATE%.log"
  LOGGER_DATEPATTERN = "YYYY-MM-DD"
  LOGGER_FILE_STORED_DAYS = "90d"

  ALLOWED_ORIGIN = "*"

  GOOGLE_OAUTH2_CLIENT_ID = "your client id"
  GOOGLE_OAUTH2_CLIENT_SECRET = "your secret"
  GOOGLE_OAUTH2_CLIENT_REDIRECT_URL = "http://localhost:4200/authentication_result"

  MONGODB_PATH = "mongodb://127.0.0.1:27017"
  MONGODB_NAME = "MEClassroomExtender"
  ```
 * Now the application can operate, starting with: **npm run start**  
