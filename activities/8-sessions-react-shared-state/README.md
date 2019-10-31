# Exercise 8 - Demo and Challenge

This application demonstrates using React's Custom Hooks for sharing state between components in a login / session driven setting.

To get started, install dependencies.

```
npm install
```

Then run the app. This will start both the backend express web server and the react local development server.
```
npm run start
```

Note that the `/dashboard` page does not show the content we want it to unless you are logged in.

We will walk through the frontend code that drives it to demonstrate React hooks and shared state. 

## Student Exercise

The overall goal is to change the app from using a hard coded email and password into using a database stored email and password.

Use MongoDB as it's easier to setup.

* Take the existing application and add a backend call to create
* Take the existing application and add a React page with a "Create new user" page. 
    * Create a new component in the `client/pages` folder. Make it just return quick and temporary HTML for now.
    * Add a route to this component in the `App.js` file. 
    * Then, add a link to this new page on the current "Login" form.
    * Once you have confirmed you can route to your new page, build the form in the React component.
    * When the form is submitted, it will create an ajax call to your new `/api/sessions/create_user` endpoint and redirect to the `/login` page when successful.