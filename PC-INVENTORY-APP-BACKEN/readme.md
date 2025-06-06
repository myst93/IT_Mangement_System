# 🖥️ IT Management Platform

A backend API built with **Express.js**, **MongoDB**, and **JWT Authentication** to manage an organization's IT infrastructure. It enables:

✅ **User Management**  
✅ **PC Inventory Management**  
✅ **Role-Based Access Control**  
✅ **Request/Approval Workflow for PC Changes**

---

## 📦 Project Features

### 🔐 Authentication & Roles

- **IT_Admin**:  
  - Can create IT_Admin and IT_Personnel accounts.
  - Can directly add, update, or delete PCs.
  - Can approve or reject PC-related requests from IT_Personnel.

- **IT_Personnel**:
  - Can submit requests to add, update, or delete PCs.
  - Cannot approve requests.

---

## 💾 MongoDB Schemas

### User Model (`User.js`)

| Field         | Type     | Required | Description                        |
|---------------|----------|----------|------------------------------------|
| username      | String   | ✅       | Unique login username             |
| password      | String   | ✅       | Hashed password                    |
| role          | String   | ✅       | `IT_Admin` or `IT_Personnel`       |
| fullName      | String   | ✅       | Full name of the user              |
| designation   | String   | ✅       | User's job designation             |

### PC Model (`Pc.js`)

| Field          | Type      | Required | Description                                 |
|----------------|-----------|----------|---------------------------------------------|
| pc_id          | Number    | ✅       | Unique PC ID                                |
| registerDate   | Date      | ✅       | Date of registration                        |
| networkType    | String    | ✅       | `DRONA`, `CIAG`, `STANDALONE`, `NKN`        |
| deptName       | String    | ✅       | Department name                             |
| username       | String    | ✅       | Username of the PC user                      |
| deviceName     | String    | ✅       | PC's device name                             |
| macAddress     | String    | ✅       | MAC Address                                  |
| ipAddress      | String    | ✅       | IP Address                                   |
| osVersion      | String    | ✅       | Operating System version                     |
| cpuSerialNo    | String    | ✅       | CPU Serial Number                            |
| pcModel        | String    | ✅       | PC Model                                     |
| pcSerialNo     | String    | ✅       | PC Serial Number                             |
| antivirusStatus| String    | ✅       | `Yes` or `No`                                |
| firewallEnabled| Boolean   | ✅       | Is firewall enabled                          |
| wsusImplemented| Boolean   | ✅       | Is WSUS implemented                          |
| ntpStatus      | Boolean   | ✅       | Is NTP status synced                         |
| actionStatus   | String    | ✅       | `Approved`, `Pending`, or `Rejected`         |
| requestedBy    | ObjectId  | ❌       | Who made the request (User)                  |
| approvedBy     | ObjectId  | ❌       | Who approved/rejected the request (Admin)    |
| isDeleteRequest| Boolean   | ❌       | If true, this is a delete request            |

---

## 🧪 API Test Cases

### 🛂 User Authentication

#### Register User (`POST /api/users`)

**Required Headers:**
```
Authorization: Bearer <Admin Token>
```

**Request Body:**
| Field       | Type     | Required  | Example                     |
|-------------|----------|-----------|-----------------------------|
| username    | String   | ✅        | `john123`                   |
| password    | String   | ✅        | `strongpass`                |
| role        | String   | ✅        | `IT_Admin` or `IT_Personnel`|
| fullName    | String   | ✅        | `John Doe`                  |
| designation | String   | ✅        | `Network Engineer`          |

#### Login (`POST /api/users/login`)

**Request:**
```json
{
  "username": "john123",
  "password": "strongpass"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "<JWT Token>",
  "user": {
    "username": "john123",
    "role": "IT_Admin",
    "fullName": "John Doe",
    "designation": "Network Engineer"
  }
}
```

---

### 💻 PC Management

#### Add PC (`POST /api/pcs`)

**Behavior:**
- **IT_Admin**: Direct add  
- **IT_Personnel**: Request submission

**Headers:**
```
Authorization: Bearer <User Token>
```

**Request Body Example:**
```json
{
  "pc_id": 101,
  "registerDate": "2025-05-15",
  "networkType": "NKN",
  "deptName": "IT Support",
  "username": "alice",
  "deviceName": "Alice-PC",
  "macAddress": "AA:BB:CC:11:22:33",
  "ipAddress": "10.0.0.16",
  "osVersion": "Ubuntu 24.04",
  "cpuSerialNo": "CPU123XYZ",
  "pcModel": "HP Elite",
  "pcSerialNo": "SN200XYZ",
  "antivirusStatus": "Yes",
  "firewallEnabled": true,
  "wsusImplemented": false,
  "ntpStatus": true
}
```

#### Update PC (`PUT /api/pcs/:id`)

**Behavior:**
- **IT_Admin**: Direct update  
- **IT_Personnel**: Request submission  

**Headers:**
```
Authorization: Bearer <User Token>
```

#### Delete PC (`DELETE /api/pcs/:id`)

**Behavior:**
- **IT_Admin**: Direct delete  
- **IT_Personnel**: Request submission  

**Headers:**
```
Authorization: Bearer <User Token>
```

#### Approve PC Request (`PATCH /api/pcs/:id/approve`)

**Access:** Admin-only route

**Headers:**
```
Authorization: Bearer <Admin Token>
```

#### Reject PC Request (`PATCH /api/pcs/:id/reject`)

**Access:** Admin-only route

**Headers:**
```
Authorization: Bearer <Admin Token>
```

#### Get All PCs (`GET /api/pcs`)

**Headers:**
```
Authorization: Bearer <User Token>
```

**Response Example:**
```json
[
  {
    "_id": "abc123",
    "pc_id": 101,
    "deptName": "IT Support",
    "username": "alice",
    "deviceName": "Alice-PC",
    "networkType": "NKN",
    "actionStatus": "Approved",
    "registerDate": "2025-05-15T00:00:00.000Z"
  }
]
```

---

## 🔒 Authentication

All routes except `/api/users/login` require authentication:

```
Authorization: Bearer <JWT Token>
```

---

## 📋 Summary

✅ Users can login and get JWT tokens  
✅ Admins can create users  
✅ IT_Admin and IT_Personnel can add/update/delete PC entries  
✅ IT_Personnel's actions require Admin approval  
✅ Admins can approve or reject requests  
✅ Full request/approval workflow implemented

---

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up MongoDB connection
4. Configure JWT secret in environment variables
5. Run the server: `npm start`

---

## 📁 Project Structure

```
├── models/
│   ├── User.js
│   └── Pc.js
├── routes/
│   ├── users.js
│   └── pcs.js
├── middleware/
│   └── auth.js
└── server.js
```
