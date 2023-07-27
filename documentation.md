## Agroservice API Endpoints

### Data Structure

- `fullName`: String (Name of the person)
  - **Required**: True
- `email`: String (Email address)
  - **Required**: True
- `phoneNumber`: String (Contact number)
  - **Required**: True
- `subject`: String (Subject of the service)
  - **Required**: True
- `message`: String (Message or description)
  - **Required**: True
- `createdAt`: Date (Automatically set upon creation)
- `updatedAt`: Date (Automatically updated upon any changes)


### 1. Create Agroservice
- **Endpoint**: `/api/agroservice/`
- **HTTP Method**: POST
- **Description**: Allows creation of a new agroservice.
- **Controller**: `createAgroservice`
- **Middleware**: None
- **Expected Input**: 
  - **Body**: 
    - `fullName`: String (Name of the person)
    - `email`: String (Email address)
    - `phoneNumber`: String (Contact number)
    - `subject`: String (Subject of the service)
    - `message`: String (Message or description)
- **Expected Output**: 
  - **Status Code**: 201 (Created)
  - **Body**:
    - `status`: "success"
    - `message`: "Agroservice created successfully"
    - `data`: Object (Details of the saved agroservice)
  
### 2. Delete Agroservice
- **Endpoint**: `/api/agroservice/:id`
- **HTTP Method**: DELETE
- **Description**: Deletes the specified agroservice based on the provided ID.
- **Controller**: `deleteAgroservice`
- **Middleware**: `verifyTokenAndAdmin` (Ensures user is authenticated and is an admin)
- **Expected Input**: 
  - **Parameters**: `id` - ID of the agroservice to delete.
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**:
    - `status`: "success"
    - `message`: "Agroservice deleted successfully"

### 3. Update Agroservice
- **Endpoint**: `/api/agroservice/:id`
- **HTTP Method**: PATCH
- **Description**: Updates the details of a specified agroservice.
- **Controller**: `updateAgroservice`
- **Middleware**: None
- **Expected Input**: 
  - **Parameters**: `id` - ID of the agroservice to update.
  - **Body**: Object (Details to update, e.g., `fullName`, `email`, etc.)
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**:
    - `status`: "success"
    - `agroservice`: Object (Details of the updated agroservice)

### 4. Get Single Agroservice
- **Endpoint**: `/api/agroservice/:id`
- **HTTP Method**: GET
- **Description**: Retrieves the details of a specific agroservice by its ID.
- **Controller**: `getAgroservice`
- **Middleware**: `verifyTokenAndAdmin` (Ensures user is authenticated and is an admin)
- **Expected Input**: 
  - **Parameters**: `id` - ID of the agroservice to retrieve.
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**:
    - `status`: "success"
    - `agroservice`: Object (Details of the retrieved agroservice)

### 5. Get All Agroservices
- **Endpoint**: `/api/agroservice/`
- **HTTP Method**: GET
- **Description**: Retrieves a list of all agroservices.
- **Controller**: `getAllAgroservices`
- **Middleware**: `verifyTokenAndAdmin` (Ensures user is authenticated and is an admin)
- **Expected Input**: None
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**:
    - `status`: "success"
    - `agroservices`: Array (List of all agroservices)


## Announcement API Endpoints

### Data Structure

- `subject`: String (Subject of the announcement)
  - **Required**: True
- `content`: String (Content or body of the announcement)
  - **Required**: True
- `startDate`: Date (Start date of the announcement's validity)
  - **Required**: True
  - **Default**: Current date and time
- `endDate`: Date (End date of the announcement's validity)
  - **Required**: True
- `isActive`: Virtual property (Boolean indicating if the announcement is currently active)

### 1. Create Announcement
- **Endpoint**: `/api/announcement/`
- **HTTP Method**: POST
- **Description**: Allows creation of a new announcement.
- **Controller**: `createAnnouncement`
- **Expected Input**: 
  - **Body**: As per the above data structure.
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**:
    - `success`: true
    - `announcement`: Object (Details of the created announcement)

### 2. Update Announcement
- **Endpoint**: `/api/announcement/:id`
- **HTTP Method**: PUT
- **Description**: Updates the details of a specified announcement by its ID.
- **Controller**: `updateAnnouncement`
- **Expected Input**: 
  - **Parameters**: `id` - ID of the announcement to update.
  - **Body**: Object (Details to update, e.g., `subject`, `content`, `endDate`, etc.)
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**:
    - `success`: true
    - `announcement`: Object (Details of the updated announcement)

### 3. Delete Announcement
- **Endpoint**: `/api/announcement/:id`
- **HTTP Method**: DELETE
- **Description**: Deletes a specified announcement by its ID.
- **Controller**: `deleteAnnouncement`
- **Expected Input**: 
  - **Parameters**: `id` - ID of the announcement to delete.
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**: 
    - `message`: "Announcement deleted successfully"

### 4. Get All Active Announcements
- **Endpoint**: `/api/announcement/active`
- **HTTP Method**: GET
- **Description**: Retrieves a list of all currently active announcements.
- **Controller**: `getActiveAnnouncements`
- **Expected Input**: None
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**:
    - `success`: true
    - `activeAnnouncements`: Array (List of active announcements)

### 5. Get All Announcements
- **Endpoint**: `/api/announcement/`
- **HTTP Method**: GET
- **Description**: Retrieves a list of all announcements.
- **Controller**: `getAllAnnouncements`
- **Expected Input**: None
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**:
    - `success`: true
    - `count`: Number (Total number of announcements)
    - `data`: Array (List of all announcements)

---

## Blog API Endpoints

### Data Structure

- `title`: String (Title of the blog)
  - **Required**: True
- `content`: String (Content of the blog)
  - **Required**: True
- `featuredImage`: String (URL of the featured image)
- `author`: ObjectId (ID of the author of the blog, referencing User)
  - **Required**: True
- `comments`: Array of ObjectId (IDs of the comments on the blog, referencing Comment)
- `createdAt`: Date (Automatically set upon creation)
- `updatedAt`: Date (Automatically updated upon any changes)

### 1. Create Blog
- **Endpoint**: `/api/blog/`
- **HTTP Method**: POST
- **Middleware**: `verifyTokenAndAdmin`, `uploadSingleImage`, `uploadToCloudinary`
- **Controller**: `createBlog`
- **Expected Input**: 
  - **Body**: As per the above data structure.
- **Expected Output**: 
  - **Status Code**: 201 (Created)
  - **Body**: Object (Details of the created blog)

### 2. Update Blog
- **Endpoint**: `/api/blog/:id`
- **HTTP Method**: PUT
- **Middleware**: `verifyTokenAndAdmin`, `uploadImage`
- **Controller**: `updateBlog`
- **Expected Input**: 
  - **Parameters**: `id` - ID of the blog to update.
  - **Body**: Object (Details to update)
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**: Object (Details of the updated blog)

### 3. Delete Blog
- **Endpoint**: `/api/blog/:id`
- **HTTP Method**: DELETE
- **Middleware**: `verifyTokenAndAdmin`
- **Controller**: `deleteBlog`
- **Expected Input**: 
  - **Parameters**: `id` - ID of the blog to delete.
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**: 
    - `message`: "Blog deleted successfully"

### 4. Delete Blog with Comments
- **Endpoint**: `/api/blog/:id/comments`
- **HTTP Method**: DELETE
- **Middleware**: `verifyTokenAndAdmin`
- **Controller**: `deleteBlogWithComments`
- **Expected Input**: 
  - **Parameters**: `id` - ID of the blog whose associated comments need to be deleted.
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**: 
    - `message`: "Blog and associated comments deleted successfully"

### 5. Get Single Blog
- **Endpoint**: `/api/blog/:id`
- **HTTP Method**: GET
- **Controller**: `getBlog`
- **Expected Input**: 
  - **Parameters**: `id` - ID of the blog to retrieve.
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**: Object (Details of the retrieved blog)

### 6. Get Single Blog with Comments
- **Endpoint**: `/api/blog/:id/comments`
- **HTTP Method**: GET
- **Controller**: `getBlogWithComments`
- **Expected Input**: 
  - **Parameters**: `id` - ID of the blog to retrieve with its comments.
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**: Object (Details of the retrieved blog with its comments)

### 7. Get All Blogs
- **Endpoint**: `/api/blog/`
- **HTTP Method**: GET
- **Controller**: `getBlogs`
- **Expected Input**: None
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**: Array (List of all blogs)

### 8. Get All Blogs with Comments
- **Endpoint**: `/api/blog/comments`
- **HTTP Method**: GET
- **Controller**: `getBlogsWithComments`
- **Expected Input**: None
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**: Array (List of all blogs with their comments)

### 9. Create Comment on a Blog
- **Endpoint**: `/api/blog/:id/comment`
- **HTTP Method**: POST
- **Middleware**: `verifyTokenAndAuthorization`
- **Controller**: `createComment`
- **Expected Input**: 
  - **Parameters**: `id` - ID of the blog to comment on.
  - **Body**: Object (Details of the comment to create)
- **Expected Output**: 
  - **Status Code**: 201 (Created)
  - **Body**: Object (Details of the created comment)

### 10. Update Comment
- **Endpoint**: `/api/blog/comment/:id`
- **HTTP Method**: PATCH
- **Controller**: `updateComment`
- **Expected Input**: 
  - **Parameters**: `id` - ID of the comment to update.
  - **Body**: Object (Details to update)
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**: Object (Details of the updated comment)

### 11. Delete Comment
- **Endpoint**: `/api/blog/comment/:id`
- **HTTP Method**: DELETE
- **Middleware**: `verifyTokenAndAuthorization`
- **Controller**: `deleteComment`
- **Expected Input**: 
  - **Parameters**: `id` - ID of the comment to delete.
- **Expected Output**: 
  - **Status Code**: 200 (OK)
  - **Body**: 
    - `message`: "Comment deleted"

---


### Cart Data Structure

- **user**: 
  - Type: ObjectId (Reference to `User` model)
  - Description: The ID of the user to whom the cart belongs.
  - Required: Yes

- **items** (Array of `CartItem` objects):
  - **product**: 
    - Type: ObjectId (Reference to `Product` model)
    - Description: The ID of the product added to the cart.
    - Required: Yes
  - **quantity**: 
    - Type: Number
    - Description: The number of units of the product added to the cart.
    - Required: Yes
    - Constraints: Minimum value of 1.
  - **orderNotes**: 
    - Type: String
    - Description: Additional notes or instructions regarding the order.
    - Required: No

- **bill**: 
  - Type: Number
  - Description: The total bill amount for the cart.
  - Required: Yes
  - Default Value: 0

---

