# Polls UI

# Introduction
This is the UI project for the polls written on Node JS and uses React.

# Clone the repository
git clone this respository 

`cd poll-ui`

# Prerequisites
- We need to have Node version >= 20.x.x This can be installed from [here](https://nodejs.org/en/download)
- Also the `poll-api` must be up and running. You can refer the instructions for poll-api [here](https://github.com/gosu-polls/poll-api/blob/main/README.md)

# Install the dependencies
The dependencies are in package-lock.json. You can install these dependencies using the following command.

`npm install`

# Run the React App
The UI code expects the `poll-api` to be running at `localhost:3003`. If the `poll-api` is running on a different port, ensure that the code is changed accordingly in all the places it is referred at.

`npm run start`

This will start the app in the port `3000` by default. If this port is busy, you can choose a different port using the command

`npm run start --port <port number>`

If this is done, we have to do some more changes to the Google OAuth project. So, try to stick to the port `3000`

# Test the Code
Once the app is up, you can check the same by browing `http://localhost:3000`
