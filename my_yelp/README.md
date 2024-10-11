## Task
The task involves deploying a Yelp application built with ReactJS to the cloud using AWS services such as Amplify and Lambda. The challenge is to ensure that the application is properly hosted with authentication and GraphQL integration. The objective is to make it fully functional in a production environment while taking advantage of AWS's free tier for hosting.

## Description
This project involved deploying a pre-built ReactJS application of the Yelp App on AWS Amplify, integrating user authentication, and configuring a GraphQL API. The original code required modifications, especially in the areas of authentication and GraphQL queries/mutations, to ensure seamless integration with Amplify’s services

The configuration of AWS Amplify, deploying the app was done, and i note that all necessary resources, including the authentication service (Cognito) and API (GraphQL), were properly set up. AWS Amplify also offers hosting and S3 storage, which were utilized for the web application deployment.
## Installation

1. Clone the repository:
    "git clone /then the repo address"
 
2. Install all dependencies by running this command:
    "npm install"

3. Setting up the AWS Amplify by initializing the project:
    "amplify init"

4. Adding hosting, API and authentication:
    "amplify add auth"
    "amplify add api"
    "amplify add hosting"


5. To Deploy to AWS:
    "amplify push"


 


## Usage
Once the project is set up and deployed, users can create accounts, sign in, and engage with the Yelp-like app by adding and viewing restaurant reviews. The authentication feature guarantees that only authorized users can submit new reviews, ensuring a secure system.
 * To run the app locally:
    "npm start"

A user is able to create an account, Sign in to the account, Create and delete a Restaurant, Sign out.

The link to the hosted version of the app:
https://d1d7kqgr6s5q88.cloudfront.net

### The Core Team


<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>
