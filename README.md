# Bookworm Server

A Node.js backend server for a book management application with MongoDB integration. This server provides APIs for managing books, user authentication, and book borrowing functionality.

## Features

- **User Authentication**: Register, login, logout, password reset, and email verification
- **Book Management**: Add, view, and delete books
- **Borrowing System**: Borrow and return books with due date tracking
- **Automated Processes**: Email notifications and cleanup of unverified accounts
- **Role-based Access Control**: Different permissions for users and admins

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: bcrypt
- **Email Service**: nodemailer
- **File Upload**: express-fileupload with Cloudinary integration
- **Scheduling**: node-cron for automated tasks

## Project Structure

```
├── app/                  # Application setup
│   ├── error.js          # Error handling
│   ├── index.js          # Main app configuration
│   ├── middleware.js     # Global middleware setup
│   └── route.js          # Base routes
├── automation/           # Scheduled tasks
│   ├── notifyUsers.js    # Email notifications
│   └── removeUnverifiedAccount.js # Cleanup unverified accounts
├── controllers/          # Request handlers
│   ├── auth.js           # Authentication controllers
│   ├── book.js           # Book management controllers
│   ├── borrow.js         # Book borrowing controllers
│   └── user.js           # User management controllers
├── database/             # Database connection
│   └── index.js          # MongoDB connection setup
├── middlewares/          # Custom middleware
│   ├── asyncHandler.js   # Async error handling
│   └── authenticate.js   # Authentication middleware
├── models/               # Database schemas
│   ├── Book.js           # Book model
│   ├── Borrow.js         # Borrow record model
│   └── User.js           # User model
├── routes/               # API routes
│   ├── auth.js           # Authentication routes
│   ├── book.js           # Book management routes
│   ├── borrow.js         # Book borrowing routes
│   ├── index.js          # Route aggregator
│   └── user.js           # User management routes
├── services/             # Business logic
│   ├── auth.js           # Authentication services
│   ├── book.js           # Book management services
│   ├── borrow.js         # Book borrowing services
│   └── user.js           # User management services
├── utils/                # Utility functions
│   ├── bcrypt.js         # Password hashing
│   ├── calculateFine.js  # Late return fine calculation
│   ├── emailTemplates.js # Email templates
│   ├── error.js          # Error creation utility
│   ├── jwt.js            # JWT token handling
│   ├── sendCode.js       # Verification code sending
│   └── sendEmail.js      # Email sending utility
├── .env                  # Environment variables (not in repo)
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── server.js             # Server entry point
└── yarn.lock             # Yarn lock file
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/verify/:email` - Verify user email
- `POST /api/v1/auth/forgot` - Request password reset
- `POST /api/v1/auth/reset/:token` - Reset password
- `POST /api/v1/auth/password/change` - Change password (authenticated)

### Books

- `GET /api/v1/books/all` - Get all books (authenticated)
- `GET /api/v1/books/:id` - Get a specific book (authenticated)
- `POST /api/v1/books/add` - Add a new book (admin only)
- `DELETE /api/v1/books/delete/:id` - Delete a book (admin only)

### Borrowing

- `POST /api/v1/borrow/record-borrow-book/:id` - Borrow a book (authenticated)
- `PUT /api/v1/borrow/return-borrow-book/:id` - Return a borrowed book (authenticated)
- `GET /api/v1/borrow/my-borrowed-books` - Get all borrowed books (authenticated)
- `GET /api/v1/borrow/borrowed-by-users` - Get all borrowed books (admin only)

### User

- `GET /api/v1/auth/profile` - Get user profile (authenticated)
- `GET /api/v1/user/all` - Get all users profile (admin only)
- `POST /api/v1/user/add/admin` - Add user (admin only)

### System

- `GET /` - Server status check
- `GET /health` - Server and database health check

## Installation

1. Clone the repository
2. Install dependencies:

   ```
   yarn install

   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=4000
   DB_URL=mongodb://localhost:27017/bookwormDB
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLIENT_NAME=your_cloudinary_name
   CLOUDINARY_CLIENT_API=your_cloudinary_api_key
   CLOUDINARY_CLIENT_SECRET=your_cloudinary_secret
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```

## Running the Server

### Development Mode

```
yarn dev
```

### Production Mode

```
yarn start
```

## Database Models

### Book Model

- `title` (String, required): Title of the book
- `author` (String, required): Author of the book
- `description` (String, required): Description of the book
- `price` (Number, required): Price of the book
- `quantity` (Number, required): Available quantity
- `available` (Boolean, default: true): Availability status

### Borrow Model

- `user` (Object, required): User who borrowed the book
  - `id` (ObjectId, ref: 'User'): User ID
  - `name` (String): User name
  - `email` (String): User email
- `book` (ObjectId, ref: 'Book', required): Book being borrowed
- `price` (Number, required): Price of the book
- `borrowDate` (Date, default: current date): Date when book was borrowed
- `dueDate` (Date, required): Date when book should be returned
- `returnDate` (Date, default: null): Date when book was returned
- `status` (String, enum, default: 'borrowed'): Status of the borrow record
- `fine` (Number, default: 0): Fine for late return

## License

MIT
