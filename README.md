# Notorite - Global Note Sharing Application 🌍📚

**Notorite** is a MERN stack-based note-sharing platform where students can upload, share, and access notes globally. It functions as a digital library for students, making study materials accessible to all. This project is open for contributions as part of Hacktoberfest! 🚀

---

## File Structure 📁

- **client/** - The frontend built using **Vite** and **React**.
- **server/** - The backend API built using **Node.js** and **Express**.

---

## Features ✨

- 📘 Share notes globally with ease.
- 🔍 Search notes based on subjects and categories.
- 🗃 Organize and manage personal note collections.
- 📈 User-friendly interface for quick and easy note uploads.

---

## Tech Stack 🛠

- **MongoDB**: Database for storing notes and user data.
- **Express**: Backend framework.
- **React (Vite)**: Frontend for an interactive user interface.
- **Node.js**: Server environment.
- **Cloudinary**: Image hosting for note attachments.

---

## Getting Started 🚀

### Prerequisites

- **Node.js** and **npm** should be installed on your machine.
- **MongoDB Atlas** account or local MongoDB setup.
- **Cloudinary** account for storing note-related images.

---

### Installation

1. **Fork** this repository to your GitHub account.
2. **Clone** the forked repository to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Notorite.git
   ```
3. Navigate to the root of the project directory:
   ```bash
   cd Notorite
   ```

---

### Backend Setup (server)

1. Navigate to the **server** directory:
   ```bash
   cd server
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the **server** directory and add **your own credentials** for MongoDB, Cloudinary, and other environment variables. Here's an example:
   ```bash
   MONGODB_URI = your-mongodb-connection-string
   CLOUDINARY_NAME = your-cloudinary-name
   CLOUDINARY_API_KEY = your-cloudinary-api-key
   CLOUDINARY_API_SECRET = your-cloudinary-api-secret
   CLOUDINARY_URL = cloudinary://your-cloudinary-url
   FRONTEND_URL = http://localhost:5173
   PORT = 8000
   ```
   > **Note**: Replace the above credentials with your own MongoDB Atlas and Cloudinary account details.

4. Start the backend server:
   ```bash
   npm index.js
   ```
   or
   
   ```bash
   nodemon dev
   ```

---

### Frontend Setup (client)

1. Navigate to the **client** directory:
   ```bash
   cd ../client
   ```
2. Install client dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the **client** directory and add the following environment variable:
   ```bash
   VITE_BACKEND_URL = http://localhost:8000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view the application.

---

## How to Contribute 🤝

1. **Fork the Repository**: Click the fork button at the top right of this page.
2. **Clone your Fork**: Clone your forked repository to your local machine using `git clone`.
3. **Create a Branch**: Create a new branch for your contribution.
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make Your Changes**: Commit your changes with clear messages.
   ```bash
   git commit -m "Add feature: description"
   ```
5. **Push to Your Fork**: Push your changes to your GitHub fork.
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**: Go to the original repository and make a pull request with a clear description of what you’ve done.

---

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Thank you for contributing to Notorite! 🌟 Together, let’s build a valuable resource for students worldwide!

---
