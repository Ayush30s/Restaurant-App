# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Namsate food App

Header
   -logo
   -Nav Item
Body
   -Search 
   -ResturantConatiner
   -ResturantCard
      -img
      -Name of Resturant 
      -star rating
      -cuisines
      -time for delivery
Footer
   -Copyrigth
   -Links
   -Address
   -Contact

# React Hooks
   -Normal JS utitlity function
   -use state - used to genearte superpowerfull state variable
   -use effect - 
, are two most important hooks


# Virtuual DOM 
-  is object repersentation of actual DOM

# Ract use Reconciliation algorithm (also known as React fiber) (Came in React 16) --->

# if i have a res container and in the res container i have 7 res card , know on clicking a button my ui changes from filtering 7 cards to 3 cards
# Behind the scene : first react creat a virtual DOM (Normal js object) (Virtual DOM is a representation of actual DOM) of the 7 res card

# Diff algo -> it finds the difference between original and updated Virtual DOM , so as in above case the number of res card changes from 7 to 3 so the difference is of 4 which is finally get updated on the UI on every render cycle

# Monolyth Architecture ->  


# RTK (Redux Toolkit)

- install reduxjs/toolkit react-redux
- Bilud or store
- Connect the store to our App
- create a Cart slice to add item to cart
- Dispatch and Action
- Read the data using selcetor