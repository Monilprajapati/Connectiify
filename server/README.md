# Authentication API Endpoints

### General Description

This section of the API handles user registration, login, logout, password reset, email verification, and retrieving user profiles.

###### Base URL

All authentication endpoints are prefixed with localhost:3030/api/v1/auth

Authentication

Some endpoints require an Authorization header with a valid Bearer token (see the login endpoint for obtaining a token).
## Endpoints

1. Register (/register)

- Method: POST
- Description: Creates a new user account.

- Request Body: 
```base
{
  "email": "user@example.com",
  "password": "your_strong_password"
}
```
- Headers: None
- Success Response (201):