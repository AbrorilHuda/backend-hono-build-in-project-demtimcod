# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "example",
  "password": "example",
  "name": "example name"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "example",
    "name": "example name"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username must not be empty"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "example",
  "password": "example"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "example",
    "name": "example name",
    "token": "token"
  }
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

- Authorization : token

Response Body (Success) :

```json
{
  "data": {
    "username": "example",
    "name": "example name"
  }
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- Authorization : token

Request Body :

```json
{
  "name": "update example",
  "password": "update pw axample"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "example",
    "name": "example name"
  }
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- Authorization : token

Response Body (Success) :

```json
{
  "data": {
    "logout": true,
    "message": "logout success"
  }
}
```
