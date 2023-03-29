
# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Installation steps:
1- You should have node.js and postgresql installed on your local machine or use the docker version.

2- Clone this repository with git using the command ```git clone <branch url>``` or run the docker pull the docker image from docker hub using the command```docker pull <registry url>```

3- Replace the envionment variables with your credential such as the database url which contains the hostname, username and password for your database server and make sure that your database server is running.

4- Navigate to the root directory of the cloned repository on you local machine and run the command ``` npm run install``` in your terminal or using docker  run the command ```docker run -d -p 5000:5000 --name <registry name>``` in the location in your terminal. 

5- Finally,  if you are runnig the app in your local machine wihtout docker you will need to run the command ```npm run dev``` in your teminal in the root of the repository's directory to run the app.
