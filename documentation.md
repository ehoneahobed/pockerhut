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

