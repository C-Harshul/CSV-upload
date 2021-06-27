<h1 align="center"> CSV -upload  </h1>
<h2> POSTMAN COLLECTION TO TEST THE API </h2>

-> https://www.getpostman.com/collections/4b5ef018695679d72a6b

<h2> Route endpoints </h2>
<h4> Host URL -> https://csv-upload-crud.herokuapp.com </h4>

- `{{url}}/user/new`        :  Post request to sign up new user.

- `{{url}}/user/login`      :  Post request to login user into a session.

- `{{url}}/user/logout`     :  Get request to logout user from all sessions. 

- `{{url}}/csv/upload`      :  Post request to upload  1 or 2 CSV files to MongoDB Database.

- `{{url}}/crud/create`     :  Post request to add company details to DB.

- `{{url}}/crud/read`       : Get request to get company details.

- `{{url}}/crud/update/:id` : Patch request to update comapny revenue.

- `{{url}}/crud/delete/:id` : Delete request to delete company with its company ID



<h2>Important dependencies used</h2>

- <strong>Express</strong> : Used to create backend server and API.

- <strong>multer</strong> : To take multipart files and store them locally on server.

- <strong>csvtojson</strong> : NPM package to convert raw CSV file into JSON format.

- <strong>mongoose</strong> : ODM (Object Data Modelling) for MongoDB

- <strong>bcryptjs</strong> : Used to encrypt and decrypt passwords using hashing algorithms

- <strong>jsonwebtoken</strong> : Used in authentication middleware in required routes.

- <strong>csvtojson</strong> : NPM package to convert raw CSV file into JSON format.

<h2>Dev dependencies used</h2>

- <strong>nodemon</strong> : To restart server automatically after any changes are made.

- <strong>env-cmd</strong> : To inject environments into the process while running specific scripts.

- <strong>jest</strong> : Used to develop the test suites.

<h3>How to run the server locally</h3>

- Run `git clone https://github.com/C-Harshul/CSV-upload.git` on your terminal

- Create a folder "config" in the root directory.

- Create a file `test.env` and add `JWT_Secret = x` where x (`allow` for example) is any token key of your choice.

- Add `MONGODB_URL = x` where x is the url to your local MongoDB database (`mongodb://127.0.0.1:27017/csv-db` for example)

- Go to the terminal and run `npm run dev`

The server should be online on port 3000

<h3>How to run test suites</h3>

- Inside the `config` folder create a file `test.env` 

- Copy the contents of `dev.env` and change the value for `MONGODB_URL` to y (`mongodb://127.0.0.1:27017/csv-db-test` for example)

- Go to the terminal and run `npm run test`

The 2 test suites - CRUD and User should run 

<h2> Deployement </h2>
The server is deployed on heroku and the database is on MongoDB Atlas so that it can be accessed from anywhere 
It can be tested from https://csv-upload-crud.herokuapp.com 
