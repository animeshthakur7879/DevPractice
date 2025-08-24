
# DevPractice

A self-hosted code playground built with the MERN stack that lets developers practice, save, and share code snippets. Designed for productivity, collaboration, and a smooth developer experience.


## Features

📝 Code Editor with Live Preview – Write and instantly preview your code.

💾 Snippet Management (CRUD) – Create, update, delete, and organize your code snippets.

🔗 Shareable Public URLs – Share your snippets with others easily.

🎨 Prettier Integration – Format your code automatically for clean output.

🖥 JavaScript Console – Test and debug directly inside the playground.

👥 User Profiles – Track and manage your saved snippets.

🔐 Google OAuth Authentication – Secure and simple login.

🤝 Optional Real-Time Collaboration – Pair program with friends or teammates.

📱 Responsive UI – Works seamlessly on desktop and mobile.


## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB

**Authentication:** Google OAuth + JWT


**Code Execution & Preview:** Browser-based sandbox environment
## Installation

1️⃣ Clone the repo

```bash
git clone https://github.com/animeshthakur7879/devpractice.git
cd devpractice
```

2️⃣ Install dependencies

 ```bash
 cd server
 npm install

 # Install client deps
 cd ../client
 npm install
 ```
 3️⃣ Environment setup
  ```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
 ```

 4️⃣ Run the project
  ```bash
  cd server
  npm run dev

  # Start client
  cd ../client
  npm run dev
 ```
## Demo

Check out live here : https://dev-practice-v1.onrender.com/


## Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a PR.


## 🚀 About Me
I'm a final year student at Medi-caps university & a passionate full-stack web developer


