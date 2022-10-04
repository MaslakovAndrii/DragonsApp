 **Technologies used in the development:**
 - ReactJS
 - Redux toolkit
 - React-router-dom
 - React-hooks-form
 - Axios
 - Firebase
 
 **Description:**
 > The application is designed to show data of dragons spaceX capsules. You can access the data after registration and authentication. Also it is possible to add to favorites and then return to them and delete. User has the ability to edit their profile data.
 
 ## To set up a development environment:
 - Clone this repository
 - Сreate .env file by example (for this you will need to register in Firebase)
 - Enter in terminal `npm i`
 - The following commands will be available after installation: 
    + `npm start`
    Runs the app in the development mode.
    Open `http://localhost:3000` to view it in your browser.
    The page will reload when you make changes.
    You may also see any lint errors in the console. 
    
    + `npm run build`
    Builds the app for production to the `build` folder. 
    It correctly bundles React in production mode and optimizes the build for the best performance.
    The build is minified and the filenames include the hashes.
    Your app is ready to be deployed!
    See the section about deployment for more information.
    
## To deploy the project you need:
- In the `package.json` file, change the link in the `"homepage"` field to the one that your github pages
- Next use the command `npm run deploy` to auto-deploy the app
