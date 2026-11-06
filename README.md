# **Zephyr**

# Contact
Minh Michael Hoang (597483)

# Description:

## General purpose
Zephyr is a web application for discovering and managing cycling routes.
Users can add locations (bike paths), enrich them with information such as
length, surface and condition, and view them through a simple, interactive
interface. Authenticated users can create, read, update and delete routes,
while access to certain actions is restricted by role (admin / non-admin).
The app highlights the environmental benefit of cycling, for example by
showing the CO2 saved compared to driving a car, and uses dynamic animations
(an animated bike travelling along a self-drawing route) to make the data
come alive.

## Category of sustainability locations
This project explores **cycling routes** as a category of sustainable mobility.
By making bike paths easy to find and compare, the app encourages car-free
travel and raises awareness of its positive impact on the environment.

# Installation:

**Requirements:** Node.js (with npm) and a MongoDB database (local or MongoDB Atlas).

```bash
git clone <repo-url>
cd FED_MMH/backend
npm install
```

Create a file `backend/.env` with the following variables:

```
MONGODB_URI=<your MongoDB connection string>
JWT_SECRET=<any long random string>
PORT=3000
```

`PORT` is optional (default: 3000). Then start the back-end:

```bash
npm start
```

The server runs on `http://localhost:3000`.
On the first start, empty collections are seeded automatically from
`backend/data/locations.json` (3 locations) and `backend/data/users.json`
(2 users, passwords are stored as bcrypt hashes). Existing data is never overwritten.

# Usage:

## Authentication

All requests to `/api/locations` need a JSON Web Token in the header:
`Authorization: Bearer <token>`. The token is valid for 1 hour.

| Username  | Password    | Role      | Allowed                        |
|-----------|-------------|-----------|--------------------------------|
| `admina`  | `admin1234` | admin     | read, create, update, delete   |
| `normalo` | `guest1234` | non-admin | read only                      |

**Request**

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admina","password":"admin1234"}'
```

**Response `200 OK`**

```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

**Response `401 Unauthorized`** (wrong username or password)

```json
{ "message": "Ungültige Zugangsdaten" }
```

## Locations

| Method | Path                  | Role      | Success                  | Errors             |
|--------|-----------------------|-----------|--------------------------|--------------------|
| GET    | `/api/locations`      | logged in | 200 array of locations   | 401                |
| GET    | `/api/locations/:id`  | logged in | 200 the location         | 401, 404           |
| POST   | `/api/locations`      | admin     | 201 the created location | 400, 401, 403      |
| PUT    | `/api/locations/:id`  | admin     | 200 the updated location | 400, 401, 403, 404 |
| DELETE | `/api/locations/:id`  | admin     | 204 (no body)            | 401, 403, 404      |

**Status codes:** 400 = missing required field, wrong type or invalid value ·
401 = missing or invalid token · 403 = valid token, but role not allowed ·
404 = unknown id

**Location fields**

| Field            | Type   | Required | Notes                                    |
|------------------|--------|----------|------------------------------------------|
| `id`             | number | –        | assigned by the server                   |
| `title`          | string | yes      |                                          |
| `description`    | string | yes      |                                          |
| `latitude`       | number | yes      | 52.3 – 52.7 (Berlin)                     |
| `longitude`      | number | yes      | 13.0 – 13.8 (Berlin)                     |
| `street`         | string | no       |                                          |
| `city`           | string | no       |                                          |
| `zip`            | string | no       |                                          |
| `pos_neg_impact` | string | yes      | `"positive"` or `"negative"`             |
| `likes`          | number | no*      | default `0` on POST; *required on PUT    |
| `image`          | string | no       |                                          |

### Read all locations

```bash
curl http://localhost:3000/api/locations \
  -H "Authorization: Bearer <token>"
```

`200 OK` → array of all locations.

### Read one location

```bash
curl http://localhost:3000/api/locations/1 \
  -H "Authorization: Bearer <token>"
```

`200 OK` → the location · `404 Not Found` → unknown id

### Create a location (admin)

```bash
curl -X POST http://localhost:3000/api/locations \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test-Radweg","description":"Nur zum Testen","latitude":52.52,"longitude":13.40,"pos_neg_impact":"positive"}'
```

`201 Created` → the created location incl. the new `id` and `likes: 0`,
plus the header `Location: /api/locations/<id>`.

### Update a location (admin)

PUT replaces the whole location; the `id` stays the same.

```bash
curl -X PUT http://localhost:3000/api/locations/4 \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test geändert","description":"Per PUT","latitude":52.52,"longitude":13.40,"pos_neg_impact":"negative","likes":0}'
```

`200 OK` → the updated location.

### Delete a location (admin)

```bash
curl -X DELETE http://localhost:3000/api/locations/4 \
  -H "Authorization: Bearer <admin-token>"
```

`204 No Content` → deleted, no response body.

**NOTE**: This README.md was written with the help of an AI. 