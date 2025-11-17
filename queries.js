// queries.js - MongoDB Queries for Week 1 Assignment

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Main function to execute all queries
async function executeQueries() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server\n');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // ===========================
    // TASK 2: Basic CRUD Operations
    // ===========================
    console.log('=== TASK 2: Basic CRUD Operations ===\n');

    // 1. Find all books in a specific genre (Fiction)
    console.log('1. Find all books in Fiction genre:');
    const fictionBooks = await collection.find({ genre: 'Fiction' }).toArray();
    fictionBooks.forEach(book => {
      console.log(`   - ${book.title} by ${book.author}`);
    });
    console.log();

    // 2. Find books published after a certain year (2010)
    console.log('2. Find books published after 2010:');
    const recentBooks = await collection.find({ published_year: { $gt: 2010 } }).toArray();
    if (recentBooks.length > 0) {
      recentBooks.forEach(book => {
        console.log(`   - ${book.title} (${book.published_year})`);
      });
    } else {
      console.log('   No books found published after 2010');
    }
    console.log();

    // 3. Find books by a specific author (George Orwell)
    console.log('3. Find books by George Orwell:');
    const orwellBooks = await collection.find({ author: 'George Orwell' }).toArray();
    orwellBooks.forEach(book => {
      console.log(`   - ${book.title} (${book.published_year})`);
    });
    console.log();

    // 4. Update the price of a specific book
    console.log('4. Update the price of "1984":');
    const updateResult = await collection.updateOne(
      { title: '1984' },
      { $set: { price: 13.99 } }
    );
    console.log(`   Modified ${updateResult.modifiedCount} document(s)`);
    const updatedBook = await collection.findOne({ title: '1984' });
    console.log(`   New price: $${updatedBook.price}`);
    console.log();

    // 5. Delete a book by its title (we'll use a non-essential book)
    console.log('5. Delete "Moby Dick" from the collection:');
    const deleteResult = await collection.deleteOne({ title: 'Moby Dick' });
    console.log(`   Deleted ${deleteResult.deletedCount} document(s)`);
    console.log();

    // ===========================
    // TASK 3: Advanced Queries
    // ===========================
    console.log('=== TASK 3: Advanced Queries ===\n');

    // 1. Find books that are both in stock and published after 2010
    console.log('1. Books in stock AND published after 2010:');
    const inStockRecent = await collection.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    if (inStockRecent.length > 0) {
      inStockRecent.forEach(book => {
        console.log(`   - ${book.title} (${book.published_year})`);
      });
    } else {
      console.log('   No books found matching criteria');
    }
    console.log();

    // 2. Use projection to return only title, author, and price
    console.log('2. All books with projection (title, author, price only):');
    const projectedBooks = await collection.find({}, {
      projection: { title: 1, author: 1, price: 1, _id: 0 }
    }).toArray();
    projectedBooks.forEach(book => {
      console.log(`   - ${book.title} by ${book.author} - $${book.price}`);
    });
    console.log();

    // 3a. Sort books by price (ascending)
    console.log('3a. Books sorted by price (ascending):');
    const sortedAsc = await collection.find({}, {
      projection: { title: 1, price: 1, _id: 0 }
    }).sort({ price: 1 }).toArray();
    sortedAsc.forEach(book => {
      console.log(`   - ${book.title}: $${book.price}`);
    });
    console.log();

    // 3b. Sort books by price (descending)
    console.log('3b. Books sorted by price (descending):');
    const sortedDesc = await collection.find({}, {
      projection: { title: 1, price: 1, _id: 0 }
    }).sort({ price: -1 }).toArray();
    sortedDesc.forEach(book => {
      console.log(`   - ${book.title}: $${book.price}`);
    });
    console.log();

    // 4. Pagination - Page 1 (5 books per page)
    console.log('4a. Pagination - Page 1 (5 books per page):');
    const page1 = await collection.find({}, {
      projection: { title: 1, author: 1, _id: 0 }
    }).limit(5).toArray();
    page1.forEach((book, index) => {
      console.log(`   ${index + 1}. ${book.title} by ${book.author}`);
    });
    console.log();

    // 4. Pagination - Page 2 (5 books per page)
    console.log('4b. Pagination - Page 2 (5 books per page):');
    const page2 = await collection.find({}, {
      projection: { title: 1, author: 1, _id: 0 }
    }).skip(5).limit(5).toArray();
    page2.forEach((book, index) => {
      console.log(`   ${index + 6}. ${book.title} by ${book.author}`);
    });
    console.log();

    // ===========================
    // TASK 4: Aggregation Pipeline
    // ===========================
    console.log('=== TASK 4: Aggregation Pipeline ===\n');

    // 1. Calculate average price of books by genre
    console.log('1. Average price of books by genre:');
    const avgPriceByGenre = await collection.aggregate([
      {
        $group: {
          _id: '$genre',
          averagePrice: { $avg: '$price' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { averagePrice: -1 }
      }
    ]).toArray();
    avgPriceByGenre.forEach(genre => {
      console.log(`   - ${genre._id}: $${genre.averagePrice.toFixed(2)} (${genre.count} books)`);
    });
    console.log();

    // 2. Find the author with the most books
    console.log('2. Author with the most books:');
    const authorBookCount = await collection.aggregate([
      {
        $group: {
          _id: '$author',
          bookCount: { $sum: 1 },
          books: { $push: '$title' }
        }
      },
      {
        $sort: { bookCount: -1 }
      },
      {
        $limit: 1
      }
    ]).toArray();
    if (authorBookCount.length > 0) {
      const topAuthor = authorBookCount[0];
      console.log(`   - ${topAuthor._id} with ${topAuthor.bookCount} book(s):`);
      topAuthor.books.forEach(book => {
        console.log(`     * ${book}`);
      });
    }
    console.log();

    // 3. Group books by publication decade and count them
    console.log('3. Books grouped by publication decade:');
    const booksByDecade = await collection.aggregate([
      {
        $addFields: {
          decade: {
            $concat: [
              { $toString: { $multiply: [{ $floor: { $divide: ['$published_year', 10] } }, 10] } },
              's'
            ]
          }
        }
      },
      {
        $group: {
          _id: '$decade',
          count: { $sum: 1 },
          books: { $push: { title: '$title', year: '$published_year' } }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();
    booksByDecade.forEach(decade => {
      console.log(`   - ${decade._id}: ${decade.count} book(s)`);
      decade.books.forEach(book => {
        console.log(`     * ${book.title} (${book.year})`);
      });
    });
    console.log();

    // ===========================
    // TASK 5: Indexing
    // ===========================
    console.log('=== TASK 5: Indexing ===\n');

    // 1. Create an index on the title field
    console.log('1. Creating index on title field:');
    const titleIndex = await collection.createIndex({ title: 1 });
    console.log(`   Index created: ${titleIndex}`);
    console.log();

    // 2. Create a compound index on author and published_year
    console.log('2. Creating compound index on author and published_year:');
    const compoundIndex = await collection.createIndex({ author: 1, published_year: -1 });
    console.log(`   Index created: ${compoundIndex}`);
    console.log();

    // 3. List all indexes
    console.log('3. Current indexes on the collection:');
    const indexes = await collection.indexes();
    indexes.forEach(index => {
      console.log(`   - ${index.name}: ${JSON.stringify(index.key)}`);
    });
    console.log();

    // 4. Use explain() to demonstrate performance improvement
    console.log('4. Performance analysis using explain():');
    console.log('\n   Query: Find book by title "The Great Gatsby"');
    const explainResult = await collection.find({ title: 'The Great Gatsby' }).explain('executionStats');
    console.log(`   - Execution time: ${explainResult.executionStats.executionTimeMillis}ms`);
    console.log(`   - Documents examined: ${explainResult.executionStats.totalDocsExamined}`);
    console.log(`   - Documents returned: ${explainResult.executionStats.nReturned}`);
    console.log(`   - Index used: ${explainResult.executionStats.executionStages.indexName || 'title_1'}`);
    console.log();

    console.log('\n   Query: Find books by author "George Orwell" sorted by year');
    const explainResult2 = await collection.find({ author: 'George Orwell' })
      .sort({ published_year: -1 })
      .explain('executionStats');
    console.log(`   - Execution time: ${explainResult2.executionStats.executionTimeMillis}ms`);
    console.log(`   - Documents examined: ${explainResult2.executionStats.totalDocsExamined}`);
    console.log(`   - Documents returned: ${explainResult2.executionStats.nReturned}`);
    console.log(`   - Index used: ${explainResult2.executionStats.executionStages.indexName || 'author_1_published_year_-1'}`);
    console.log();

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
executeQueries().catch(console.error);

/*
 * Additional MongoDB Shell (mongosh) Queries
 * You can also run these queries directly in MongoDB Shell or Compass:
 *
 * // Find all books in Fiction genre
 * db.books.find({ genre: 'Fiction' })
 *
 * // Find books published after 2010
 * db.books.find({ published_year: { $gt: 2010 } })
 *
 * // Find books by George Orwell
 * db.books.find({ author: 'George Orwell' })
 *
 * // Update price of "1984"
 * db.books.updateOne({ title: '1984' }, { $set: { price: 13.99 } })
 *
 * // Delete a book by title
 * db.books.deleteOne({ title: 'Moby Dick' })
 *
 * // Find books in stock AND published after 2010
 * db.books.find({ in_stock: true, published_year: { $gt: 2010 } })
 *
 * // Projection example
 * db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
 *
 * // Sort by price ascending
 * db.books.find({}).sort({ price: 1 })
 *
 * // Sort by price descending
 * db.books.find({}).sort({ price: -1 })
 *
 * // Pagination - Page 1
 * db.books.find({}).limit(5)
 *
 * // Pagination - Page 2
 * db.books.find({}).skip(5).limit(5)
 *
 * // Average price by genre
 * db.books.aggregate([
 *   { $group: { _id: '$genre', averagePrice: { $avg: '$price' }, count: { $sum: 1 } } },
 *   { $sort: { averagePrice: -1 } }
 * ])
 *
 * // Author with most books
 * db.books.aggregate([
 *   { $group: { _id: '$author', bookCount: { $sum: 1 }, books: { $push: '$title' } } },
 *   { $sort: { bookCount: -1 } },
 *   { $limit: 1 }
 * ])
 *
 * // Books by decade
 * db.books.aggregate([
 *   { $addFields: { decade: { $concat: [{ $toString: { $multiply: [{ $floor: { $divide: ['$published_year', 10] } }, 10] } }, 's'] } } },
 *   { $group: { _id: '$decade', count: { $sum: 1 } } },
 *   { $sort: { _id: 1 } }
 * ])
 *
 * // Create indexes
 * db.books.createIndex({ title: 1 })
 * db.books.createIndex({ author: 1, published_year: -1 })
 *
 * // List indexes
 * db.books.getIndexes()
 *
 * // Explain query
 * db.books.find({ title: 'The Great Gatsby' }).explain('executionStats')
 */
