# QA Portfolio Web App

Welcome to my **Quality Assurance Engineer Portfolio**, built to showcase real-world experience, consultancy projects, and QA contributions in a responsive and user-friendly format. Whether you're a recruiter, client, or fellow QA Engineer, this app offers a clear snapshot of my QA journey.

## 🔍 About

This portfolio presents:
- 💼 **Work Experience**: Roles and responsibilities in QA.
- 🧭 **Consultancy Jobs**: Short-term projects with measurable impact.
- ✅ **Completed Projects**: Finished QA implementations across domains.
- 🚧 **Ongoing Projects**: Active work to show current techniques and tools.

Built using:
- 🖼️ **React (Vite)** for a fast and modular frontend
- ⚙️ **Node.js + Express** for backend API handling
- 🗄️ **MongoDB** for data persistence
- 🎨 **Tailwind CSS + AOS Animations** for beautiful, responsive UI

---

## 🧱 Structure

qa-portfolio/ ├─ client/ # React frontend ├─ server/ # Express backend with MongoDB ├─ .env # Environment config

## How to Run
1. Clone this repo  
   ```bash
   git clone https://github.com/FelisterPaul/qa-portfolio.git

2. Install dependencies
   cd client && pnpm install
   cd ../server && pnpm install

3. Create a .env file based on .env.example in /server
4. Seed sample data (optional)
   node src/utils/seed.js
5. Start both servers
   pnpm dev # Vite frontend  
   pnpm start # Express backend

