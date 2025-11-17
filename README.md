# MongoDB Data Layer Fundamentals - Week 1 Assignment

## 📋 Overview

This repository contains the Week 1 assignment for MongoDB Data Layer Fundamentals and Advanced Techniques. The assignment demonstrates proficiency in MongoDB basics including CRUD operations, advanced queries, aggregation pipelines, and indexing.

## 🎯 Assignment Tasks Completed

- ✅ Task 1: MongoDB Setup (plp_bookstore database with books collection)
- ✅ Task 2: Basic CRUD Operations
- ✅ Task 3: Advanced Queries (filtering, projection, sorting, pagination)
- ✅ Task 4: Aggregation Pipeline
- ✅ Task 5: Indexing and Performance Optimization

## 📁 Repository Structure

```
├── insert_books.js          # Script to populate the database with sample books
├── queries.js               # All MongoDB queries for the assignment tasks
├── README.md                # This file - setup and usage instructions
├── Week1-Assignment.md      # Detailed assignment requirements
└── examples/                # Example files and package.json
    ├── mongodb_connection_example.js
    ├── mongodb_shell_example.js
    └── package.json
```

## 🛠️ Prerequisites

Before running the scripts, ensure you have the following installed:

1. **MongoDB** - Install either:
   - [MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/) (for local installation)
   - OR create a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account (cloud database)

2. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)

3. **MongoDB Shell (mongosh)** - Included with MongoDB Community Edition or [download separately](https://www.mongodb.com/try/download/shell)

4. **MongoDB Compass** (Optional but recommended) - [Download here](https://www.mongodb.com/try/download/compass)

## 📦 Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repository-url>
   cd mongodb-data-layer-fundamentals-and-advanced-techniques-lydia-lyee
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install mongodb
   ```

   Or if you prefer to initialize from scratch:
   ```bash
   npm init -y
   npm install mongodb
   ```

## 🚀 Running the Scripts

### Option 1: Using Local MongoDB

1. **Start MongoDB server**:
   ```bash
   # On Windows (if installed as a service, it should already be running)
   net start MongoDB

   # On macOS/Linux
   sudo systemctl start mongod
   # or
   brew services start mongodb-community
   ```

2. **Verify MongoDB is running**:
   ```bash
   mongosh
   ```
   You should see a connection message. Type `exit` to exit the shell.

3. **Run the insert script** to populate the database:
   ```bash
   node insert_books.js
   ```
   
   Expected output:
   ```
   Connected to MongoDB server
   12 books were successfully inserted into the database
   
   Inserted books:
   1. "To Kill a Mockingbird" by Harper Lee (1960)
   2. "1984" by George Orwell (1949)
   ...
   ```

4. **Run the queries script** to execute all assignment queries:
   ```bash
   node queries.js
   ```
   
   This will display the results of all queries including:
   - Basic CRUD operations
   - Advanced queries with filtering and projection
   - Aggregation pipeline results
   - Index creation and performance analysis

### Option 2: Using MongoDB Atlas (Cloud)

1. **Create a MongoDB Atlas cluster**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Create a free cluster
   - Create a database user
   - Whitelist your IP address (or allow access from anywhere for testing: 0.0.0.0/0)

2. **Get your connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`)

3. **Update the connection string** in both scripts:
   
   In `insert_books.js` and `queries.js`, replace:
   ```javascript
   const uri = 'mongodb://localhost:27017';
   ```
   
   With your Atlas connection string:
   ```javascript
   const uri = 'mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority';
   ```

4. **Run the scripts** (same as local MongoDB):
   ```bash
   node insert_books.js
   node queries.js
   ```

## 🔍 Viewing Your Data

### Using MongoDB Compass (GUI)

1. Open MongoDB Compass
2. Connect to your database:
   - Local: `mongodb://localhost:27017`
   - Atlas: Use your Atlas connection string
3. Navigate to: `plp_bookstore` → `books`
4. You can view, filter, and analyze your data visually
5. **Take a screenshot** of your collections for submission

### Using MongoDB Shell (CLI)

```bash
# Connect to MongoDB
mongosh

# Switch to the database
use plp_bookstore

# View all books
db.books.find()

# Pretty print
db.books.find().pretty()

# Count documents
db.books.countDocuments()

# Run any query from queries.js
db.books.find({ genre: 'Fiction' })
```

## 📊 What the Scripts Do

### insert_books.js
- Connects to MongoDB (local or Atlas)
- Creates the `plp_bookstore` database
- Creates the `books` collection
- Inserts 12 sample books with fields:
  - title, author, genre, published_year
  - price, in_stock, pages, publisher
- Drops existing data if re-run (for clean testing)

### queries.js
Executes all required queries for the assignment:

**Task 2: Basic CRUD Operations**
- Find books by genre
- Find books by publication year
- Find books by author
- Update book price
- Delete a book

**Task 3: Advanced Queries**
- Complex filtering (in_stock AND year > 2010)
- Projection (return specific fields only)
- Sorting (ascending and descending)
- Pagination (limit and skip)

**Task 4: Aggregation Pipeline**
- Average price by genre
- Author with most books
- Books grouped by publication decade

**Task 5: Indexing**
- Create single field index (title)
- Create compound index (author + published_year)
- Performance analysis with explain()

## 🧪 Testing Your Setup

Run this quick test to verify everything is working:

```bash
# 1. Insert the data
node insert_books.js

# 2. Run all queries
node queries.js

# 3. Check the database in mongosh
mongosh
use plp_bookstore
db.books.countDocuments()  # Should return 11 (one book is deleted by queries.js)
```

## 📸 Screenshot Instructions

For your submission, take a screenshot showing:
1. **MongoDB Compass**: Your `plp_bookstore` database with the `books` collection
2. **OR MongoDB Atlas**: Your cluster with the database visible
3. Make sure the screenshot shows:
   - Database name: `plp_bookstore`
   - Collection name: `books`
   - Sample documents visible
   - Document count

## ✅ Submission Checklist

Before submitting, ensure you have:

- [ ] `insert_books.js` - Script to populate the database
- [ ] `queries.js` - All assignment queries implemented
- [ ] `README.md` - This file with clear instructions
- [ ] Screenshot of MongoDB Compass/Atlas showing your collections
- [ ] All changes committed to Git
- [ ] Changes pushed to your GitHub Classroom repository

## 🚨 Troubleshooting

### Connection Issues

**Error: "MongoNetworkError: connect ECONNREFUSED"**
- MongoDB server is not running
- Start MongoDB: `net start MongoDB` (Windows) or `brew services start mongodb-community` (macOS)

**Error: "MongoServerError: Authentication failed"**
- Check your username and password in the connection string
- Ensure the database user has proper permissions in Atlas

### Script Issues

**Error: "Cannot find module 'mongodb'"**
- Run: `npm install mongodb`

**Error: "Collection already contains documents"**
- This is normal - the script will drop and recreate the collection
- Or manually delete: `mongosh` → `use plp_bookstore` → `db.books.drop()`

### General Tips
- Make sure MongoDB is running before executing scripts
- Check your firewall settings if using MongoDB Atlas
- Verify your IP is whitelisted in Atlas Network Access settings
- Use `console.log()` to debug any issues in the scripts

## 📚 Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/) - Free courses
- [MongoDB Node.js Driver Docs](https://mongodb.github.io/node-mongodb-native/)
- [MongoDB Compass Guide](https://docs.mongodb.com/compass/current/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Aggregation Pipeline](https://docs.mongodb.com/manual/aggregation/)
- [Indexing Best Practices](https://docs.mongodb.com/manual/indexes/)

## 📝 Assignment Details

For complete assignment requirements, see [Week1-Assignment.md](Week1-Assignment.md)

## 👨‍💻 Author

Student submission for MongoDB Data Layer Fundamentals and Advanced Techniques

---

**Note**: Remember to update the connection URI in both scripts if you're using MongoDB Atlas instead of a local installation.
