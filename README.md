# My Kanban App

A full-stack project management tool with a drag-and-drop Kanban board, built to demonstrate modern web development practices.

---

## Features

- **User Authentication**: Secure signup, login, and logout using JWT.
- **Projects**: Create, view, and manage projects.
- **Kanban Board**: Drag-and-drop tasks between "Todo," "In Progress," and "Done" columns.
- **Task Management**: Add, edit, and delete tasks with validation.
- **Dashboard**: A summary dashboard showing project and task statistics.
- **Responsive UI**: A modern, responsive user interface built with Tailwind CSS.

---

## Technologies Used

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication

**Frontend:**
- Next.js 15 (App Router)
- React
- Tailwind CSS
- React Hook Form & Zod for form validation
- Recharts for data visualization
- @hello-pangea/dnd for drag-and-drop

---

## Project Architecture & Design Choices


- **Modular Backend**: We used a modular approach with separate folders for `controllers`, `routes`, and `models`. This follows the **S.O.L.I.D.** principle, making the codebase clean and easy to maintain.
- **Reusable Frontend Components**: We built reusable components like `TaskFormModal` to follow the **D.R.Y.** principle.
- **Testing**: Backend ke liye unit test likha gaya hai, jo code ki reliability ko ensure karta hai.

---

## How to Run the Project

first of all go to the master branch.

**1. Clone the repository:**
```bash
git clone [https://github.com/your_username/your_repo_name.git](https://github.com/your_username/your_repo_name.git)
cd your_repo_name

cd backend
npm install
# .env file create karein with MONGODB_URL and JWT_SECRET
npm start

cd ../frontend /my-kanban-app
npm install
npm run dev
