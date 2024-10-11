# Welcome to My Instagram
***

## Task
This project is a clone of Instagram built using ReactJS and Firebase. It replicates key features of Instagram, allowing users to create accounts, post images, follow others, and interact with posts through likes and comments.


## Description
This Instagram clone aims to replicate key features of the popular social media platform, INSTAGRAM. The main features for this project include:

 - Features
        User Authentication: Secure login and signup via Firebase.
        Post Creation: Share text, images (with filters), and videos.
        Follow/Unfollow: Manage user relationships and view content from followed users.
        Likes, Comments, and Shares: Engage with posts.
        Profile Customization: Edit profile details like bio, avatar, and social links.
        Explore Page: Discover trending posts, hashtags, and new users.


- Firebase Configuration  
To integrate Firebase into your app:

Create a Firebase project on the Firebase Console.
Add a web app to your project and obtain the Firebase configuration object.
Enable Email/Password Authentication in Firebase Console.
Set up the Firestore Database for storing user and post data.
Configure Firebase Storage to handle image and media uploads.
Update your project’s firebase.js file with your Firebase configuration:


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { firestore, auth, storage };


## Installation

-  Clone the repository:
        "cd my_instagram"  
- Installation of dependencies:
        "npm install"
- Start the development server:
        "npm run dev" or "npm run dev -- --port 3000" or any port you decide.
- Build the Project:
        "npm run build"

## Usage
Login/Signup: Create an account or log in.
Create Posts: Share posts with text and media.
Engage with Posts: Like, comment, and share.
Follow Users: Follow users to see their posts in your feed.
Profile Customization: Update your profile with new bio or avatar.
Toggle between modes; "Light Mode" and "Dark Mode"


- Live Demo
Check out the live demo of this Instagram clone app here:
https://amazing-valkyrie-1f99e3.netlify.app/

- Issues Encountered
Throughout the development process, several challenges were faced:

1. Firebase Authentication Setup: Incorrect API key initially caused authentication issues.
        Solution: Verified project setup and regenerated API keys.
2. Vite Bundle Size Warning: Large chunks of over 500 kB triggered warnings.
        Solution: Implemented dynamic imports to optimize the bundle size.
3. Image Uploads: Managing file size and formats for Firebase Storage was problematic.
        Solution: Added validation checks for file size and format before uploading.
4. React Re-Rendering: Unnecessary re-renders on the profile page and post list slowed performance.
        Solution: Used React.memo() and optimized state management.
5. Chakra UI Customization: Learning curve in adapting Chakra UI components for a custom design.
        Solution: Spent time familiarizing with the documentation to better customize components.

### The Core Team


<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>
