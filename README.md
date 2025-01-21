# Passport Authentication API using MySQL and Node.js

This repository provides a Node.js-based API for user authentication using Passport.js and MySQL. It uses Express.js as the web framework and integrates Passport.js with the Local strategy for user authentication. 

## Features
- User registration and login
- Password hashing with `bcryptjs`
- Session management with `express-session`
- Database interaction using `mysql2`
- Environment configuration with `dotenv`

## Prerequisites
Before using this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or later recommended)
- [MySQL](https://www.mysql.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Faruuuqqq/passport-authentication-api-using-mysql.git
   cd passport-authentication-api-using-mysql
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     DB_HOST=your_mysql_host
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     DB_NAME=your_database_name
     SESSION_SECRET=your_session_secret
     ```

4. Set up the database:
   - Create a MySQL database and configure the `.env` file accordingly.
   - Import the SQL file (`schema.sql` or similar if available) to set up the required tables.

5. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

## Endpoints

### Authentication Routes
- **POST /register**: Registers a new user. 
  - Request Body: `{ "username": "your_username", "password": "your_password" }`
  - Hashes the password before storing it in the database.

- **POST /login**: Authenticates an existing user using Passport.js.
  - Request Body: `{ "username": "your_username", "password": "your_password" }`
  - Manages session creation on successful login.

- **GET /logout**: Logs the user out by destroying the session.

## Dependencies
The project uses the following packages:

- **`bcryptjs`**: For password hashing.
- **`dotenv`**: For managing environment variables.
- **`express`**: Web framework.
- **`express-session`**: For session management.
- **`mysql`** and **`mysql2`**: For database interaction.
- **`nodemon`**: For development server reloading.
- **`passport`**: Authentication middleware.
- **`passport-local`**: Local strategy for Passport.js.

## Development
For development purposes, you can use `nodemon` to automatically restart the server when changes are detected:
```bash
npm run dev
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or fixes.

## Acknowledgments
- [Passport.js Documentation](http://www.passportjs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
