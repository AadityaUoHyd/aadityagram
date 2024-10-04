# AADITYAGRAM
"AADITYAGRAM" is just alike Instagram social media app, tried to build few major functions of Instagram 
( like - follow/unfollow, post, likes, comment, save images, etc. ) using MERN stack.

# How to Run this AadityaGram project =>
Go to 'AadityaGram' project root folder.
- npm install
- npm run build
- npm run start

# During deployment, do changes in :
- backend: Change URL of socket.js and index.js, from localhost to PROD_DEPLOY_URL.
- frontend: Change URL at all files in component & hooks folder.  (say, from http://localhost:8000/api/v1/user/suggested to https://aadityagram.onrender.com/api/v1/user/suggested)
- provide key:values details of .env file in server configuration (e.g. PORT, API_SECRET, API_KEY, MONGO_URL, PROD_DEPLOY_URL, CLOUD_NAME, SECRET_KEY.)

# I deployed aadityagram app in Render successfully. The link of my running app :
https://aadityagram.onrender.com/login 
