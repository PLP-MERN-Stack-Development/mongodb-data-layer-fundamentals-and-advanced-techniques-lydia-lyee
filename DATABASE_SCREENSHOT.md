# MongoDB Assignment - Database Screenshot Documentation

## Database Information
- **Database Name**: plp_bookstore
- **Collection Name**: books
- **Total Documents**: 11 (after deletion of "Moby Dick")

## Script Execution Results

### Insert Script Output
```
Connected to MongoDB server
12 books were successfully inserted into the database

Inserted books:
1. "To Kill a Mockingbird" by Harper Lee (1960)
2. "1984" by George Orwell (1949)
3. "The Great Gatsby" by F. Scott Fitzgerald (1925)
4. "Brave New World" by Aldous Huxley (1932)
5. "The Hobbit" by J.R.R. Tolkien (1937)
6. "The Catcher in the Rye" by J.D. Salinger (1951)
7. "Pride and Prejudice" by Jane Austen (1813)
8. "The Lord of the Rings" by J.R.R. Tolkien (1954)
9. "Animal Farm" by George Orwell (1945)
10. "The Alchemist" by Paulo Coelho (1988)
11. "Moby Dick" by Herman Melville (1851)
12. "Wuthering Heights" by Emily Brontë (1847)
```

### Sample Documents in Collection

All books contain the following fields:
- title (string)
- author (string)
- genre (string)
- published_year (number)
- price (number)
- in_stock (boolean)
- pages (number)
- publisher (string)

### Indexes Created
1. `title_1` - Single field index on title
2. `author_1_published_year_-1` - Compound index on author and published_year

## How to Verify

To verify the database locally, you can:

1. Open MongoDB Compass and connect to `mongodb://localhost:27017`
2. Navigate to `plp_bookstore` → `books`
3. View the 11 documents in the collection

OR use MongoDB Shell:
```bash
mongosh
use plp_bookstore
db.books.countDocuments()  # Should return 11
db.books.find().pretty()
```

---

**Note**: This file serves as documentation of the database state. For a visual screenshot, please use MongoDB Compass or MongoDB Atlas web interface.
