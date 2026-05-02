# MongoDB Database Structure

## Database Name: `coursehub`

---

## Collections

### 1. **users**

Stores all registered users from Firebase Authentication.

**Fields:**

```json
{
  "_id": ObjectId,
  "uid": "string (Firebase UID)",
  "email": "string",
  "displayName": "string (optional)",
  "photoURL": "string (optional)",
  "provider": "email | google",
  "role": "user | admin",
  "createdAt": "ISO 8601 date string",
  "lastLogin": "ISO 8601 date string"
}
```

**Example:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "uid": "XDDtcPRDdbbPme0GhzokSRNIZ6H2",
  "email": "user@example.com",
  "displayName": "John Doe",
  "photoURL": "",
  "provider": "email",
  "role": "user",
  "createdAt": "2026-05-02T19:30:00.000Z",
  "lastLogin": "2026-05-02T20:15:00.000Z"
}
```

**To Make a User Admin:**

1. Find the user in MongoDB Compass
2. Edit the document
3. Change `"role": "user"` to `"role": "admin"`
4. Save and the user must log out and log back in

---

### 2. **courses**

Stores all course listings.

**Fields:**

```json
{
  "_id": ObjectId,
  "id": "string (unique identifier)",
  "title": "string",
  "shortDescription": "string",
  "description": "string",
  "category": "string",
  "level": "Beginner | Intermediate | Advanced",
  "price": number,
  "instructor": "string",
  "image": "string (URL)",
  "duration": number (hours),
  "rating": number (0-5),
  "students": number,
  "whatYouLearn": ["string"],
  "requirements": ["string"],
  "curriculum": [
    {
      "section": "string",
      "lessons": ["string"]
    }
  ],
  "createdAt": "ISO 8601 date string"
}
```

---

### 3. **enrollments**

Tracks which users are enrolled in which courses and their progress.

**Fields:**

```json
{
  "_id": ObjectId,
  "userId": "string (Firebase UID)",
  "courseId": "string",
  "courseName": "string",
  "enrolledAt": "ISO 8601 date string",
  "lastAccessed": "ISO 8601 date string",
  "progress": number (0-100),
  "hoursSpent": number,
  "completed": boolean
}
```

**Example:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "userId": "XDDtcPRDdbbPme0GhzokSRNIZ6H2",
  "courseId": "course-1",
  "courseName": "Complete Web Development Bootcamp",
  "enrolledAt": "2026-05-01T10:00:00.000Z",
  "lastAccessed": "2026-05-02T15:30:00.000Z",
  "progress": 45,
  "hoursSpent": 12,
  "completed": false
}
```

---

### 4. **reviews**

Course reviews submitted by users.

**Fields:**

```json
{
  "_id": ObjectId,
  "courseId": "string",
  "userId": "string (Firebase UID)",
  "userName": "string",
  "rating": number (1-5),
  "review": "string",
  "createdAt": "ISO 8601 date string"
}
```

---

### 5. **blog_posts**

Blog articles for the platform.

**Fields:**

```json
{
  "_id": ObjectId,
  "id": "string",
  "title": "string",
  "excerpt": "string",
  "content": "string",
  "image": "string (URL)",
  "author": "string",
  "authorImage": "string (URL)",
  "category": "string",
  "readTime": "string",
  "createdAt": "ISO 8601 date string",
  "featured": boolean
}
```

---

### 6. **contacts**

Contact form submissions.

**Fields:**

```json
{
  "_id": ObjectId,
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "createdAt": "ISO 8601 date string",
  "status": "new | read | replied"
}
```

---

### 7. **newsletter**

Newsletter email subscriptions.

**Fields:**

```json
{
  "_id": ObjectId,
  "email": "string",
  "subscribedAt": "ISO 8601 date string",
  "active": boolean
}
```

---

## API Endpoints

### User Management

- `POST /api/users` - Create/update user (auto sets role: "user")
- `GET /api/users?uid={uid}` - Get user by Firebase UID
- `GET /api/users/stats?uid={uid}` - Get user statistics

### Enrollments

- `POST /api/enrollments` - Enroll user in course
- `GET /api/enrollments?userId={uid}` - Get user enrollments
- `PUT /api/enrollments/[id]` - Update enrollment progress
- `DELETE /api/enrollments/[id]` - Remove enrollment

### Courses

- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/[id]` - Get specific course
- `PUT /api/courses/[id]` - Update course
- `DELETE /api/courses/[id]` - Delete course

### Reviews

- `GET /api/reviews?courseId={id}` - Get course reviews
- `POST /api/reviews` - Submit review

### Admin

- `GET /api/admin/stats` - Get dashboard statistics

### Other

- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter

---

## Default Role Assignment

**New Users:**

- When a user registers, they are automatically assigned `role: "user"`
- This happens in `/api/users` endpoint using MongoDB's `$setOnInsert` operator
- The role is only set during user creation, not updates

**Making Users Admin:**

1. User must register first through the website
2. Admin manually updates the role in MongoDB Compass
3. Change `"role": "user"` to `"role": "admin"`
4. User logs out and logs back in
5. System automatically redirects admin users to `/dashboard/admin`
6. Regular users go to `/dashboard/user`

---

## Indexes (Recommended)

For better performance, create these indexes:

```javascript
// users collection
db.users.createIndex({ uid: 1 }, { unique: true });
db.users.createIndex({ email: 1 });

// courses collection
db.courses.createIndex({ id: 1 }, { unique: true });
db.courses.createIndex({ category: 1 });

// enrollments collection
db.enrollments.createIndex({ userId: 1 });
db.enrollments.createIndex({ courseId: 1 });
db.enrollments.createIndex({ userId: 1, courseId: 1 }, { unique: true });

// reviews collection
db.reviews.createIndex({ courseId: 1 });
db.reviews.createIndex({ userId: 1, courseId: 1 }, { unique: true });

// newsletter collection
db.newsletter.createIndex({ email: 1 }, { unique: true });
```

---

## User Flow

1. **Registration:**
   - User signs up → Firebase creates account
   - POST to `/api/users` → MongoDB creates user with `role: "user"`
2. **Login:**
   - User logs in → Firebase authenticates
   - GET `/api/users?uid={uid}` → Fetch user role
   - Redirect to appropriate dashboard

3. **Course Enrollment:**
   - User clicks "Enroll" → POST to `/api/enrollments`
   - Creates enrollment record with progress: 0

4. **Progress Tracking:**
   - As user learns → PUT to `/api/enrollments/[id]`
   - Updates progress, hoursSpent, lastAccessed

5. **Course Review:**
   - After completion → POST to `/api/reviews`
   - Saves rating and review text

---

## Testing the Setup

```bash
# Register a new user at:
http://localhost:3000/register

# Check MongoDB Compass for new user document
# It should have role: "user"

# To test admin features:
# 1. Edit the user document in MongoDB Compass
# 2. Change role to "admin"
# 3. Log out and log back in
# 4. Should redirect to /dashboard/admin
```
