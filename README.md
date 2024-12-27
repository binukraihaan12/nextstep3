
# NextStep - Empowering Students and Teachers

NextStep is a comprehensive MERN stack-based web application designed to connect students and teachers on a single platform. It simplifies appointment bookings, teacher advertisements, and direct communication between users. The application features intuitive design and efficient functionality tailored to enhance the educational experience.

## **Features**

### **For Teachers**
- Advertise tuition classes to a large audience of students.
- Manage profiles, including subject expertise, experience, and descriptions.
- Increase visibility and expand teaching opportunities.

### **For Students**
- Search for teachers by subjects or categories.
- View detailed teacher profiles with information like expertise, experience, and description.
- Book appointments for live Q&A sessions or personal lessons.
- Connect with teachers via WhatsApp for free consultations.

### **For Admins**
- Manage teacher profiles.
- Monitor and oversee all student-teacher appointments.

---

## **Tech Stack**

### **Frontend**
- **React**: Dynamic UI for seamless user interaction.
- **Tailwind CSS**: Modern styling framework for responsive designs.
- **react-hot-toast**: For notifications.
- **react-icons**: Icons for a better UI experience.

### **Backend**
- **Node.js**: Server-side functionality.
- **Express.js**: Framework for routing and middleware.
- **bcrypt**: Password hashing for secure authentication.
- **jsonwebtoken**: Token-based authentication.
- **multer**: Handling file uploads.
- **nodemailer**: Sending emails.
- **validator**: Input validation.

### **Database**
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ORM for database schema management.

### **Other Integrations**
- **Cloudinary**: For image storage.
- **Axios**: HTTP client for API requests.
- **Skype**: Video conferencing with non-expiring invite links.
- **WhatsApp**: Pre-filled message integration for easy communication.

---



## **Installation and Setup**

### Prerequisites
- Node.js
- MongoDB
- Cloudinary account for image hosting

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nextstep.git
   cd nextstep
   ```

2. **Install dependencies**
   - For backend:
     ```bash
     cd backend
     npm install
     ```
   - For frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For Admin:
     ```bash
     cd admin
     npm install
     ```

3. **Set up environment variables**
   - Create a `.env` file in the `backend` folder and configure:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_URL=your_cloudinary_url
     ```

4. **Start the application**
   - Backend:
     ```bash
     npm start
     ```
   - Frontend:
     ```bash
     npm run dev
     ```
    - Admin:
     ```bash
     npm run dev
     ```
5. **Access the application**
   Open your browser and go to `http://localhost:5173`.
---
## **Contact**
For any queries or issues, feel free to reach out:
- **Email**: binukraihaan@outlook.com
- **GitHub**: [binukraihaan12](https://github.com/binukraihaan12)

Thank you for checking out **NextStep**! We hope it helps students and teachers connect effectively!
