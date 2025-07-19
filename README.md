# MYFora-a-discussion-app

A secure discussion panel application where messages are stored in MongoDB. Access is controlled through admin verification and user management.

---
## Features

### User Flow
- Unregistered users can register through the app.
- After registration, the admin verifies and approves the user.
- An auto-generated password is sent to the user's registered email.
- Verified users can log in using their username and password to post messages.

### Admin Capabilities
Admins have extended control and management options:
- Approve registered users
- View all users
- Register new admins
- View existing admins
- Delete messages, users, and admins

### Database
- Utilizes MongoDB Atlas for efficient and secure cloud-based data storage.

---

## Project Setup

### Backend (Server)
```
cd server
npm run dev
```

### Frontend (Client)
```
cd client
npm start
```

The images are placed in a screenshots/ directory at the project root .


### Technology Stack

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: Admin verification with auto-email password system

### Access Control
Role	Permissions
User	Register, log in, post messages (after admin approval)
Admin	Approve users, register/view/delete admins, view/delete users and messages

###Email Notification
Once approved, users receive a system-generated password via email to access the application securely.

### Folder Structure
```
/App
│
├── /client        # React frontend
├── /server        # Node/Express backend
├── /screenshots   # Screenshot images for documentation
└── README.md
```

### Future Enhancements

JWT-based authentication

Timestamp support for messages

Threaded replies or conversation grouping

Improved UI responsiveness across devices

### Contribution
Contributions are welcome. Feel free to fork the repository and submit pull requests to improve the features or fix issues.

