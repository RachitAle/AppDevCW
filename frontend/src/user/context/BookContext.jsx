"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create context
const BookContext = createContext()

// Custom hook to use the book context
export const useBookContext = () => {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider")
  }
  return context
}

export const BookProvider = ({ children }) => {
  // State for books data
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State for sorting and filtering
  const [sortBy, setSortBy] = useState("Popularity")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/books")

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        setBooks(data)
        setError(null)
      } catch (err) {
        setError(err.message)
        // Use sample data if API fails
        setBooks(sampleBooks)
        console.error("Failed to fetch books:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  // Sort books based on sortBy value
  const getSortedBooks = () => {
    if (!books) return []

    const filteredBooks =
      selectedCategory === "All" ? [...books] : books.filter((book) => book.category === selectedCategory)

    switch (sortBy) {
      case "Price: Low to High":
        return filteredBooks.sort((a, b) => a.price - b.price)
      case "Price: High to Low":
        return filteredBooks.sort((a, b) => b.price - a.price)
      case "Newest":
        return filteredBooks.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
      case "Popularity":
      default:
        return filteredBooks.sort((a, b) => b.popularity - a.popularity)
    }
  }

  // Get featured books (e.g., top 8 by popularity)
  const getFeaturedBooks = () => {
    if (!books) return []
    return [...books].sort((a, b) => b.popularity - a.popularity).slice(0, 8)
  }

  // Get books by category
  const getBooksByCategory = (category) => {
    if (!books) return []
    return books.filter((book) => book.category === category)
  }

  // Get a single book by ID
  const getBookById = (id) => {
    if (!books) return null
    return books.find((book) => book.id === id)
  }

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        error,
        sortBy,
        setSortBy,
        selectedCategory,
        setSelectedCategory,
        getSortedBooks,
        getFeaturedBooks,
        getBooksByCategory,
        getBookById,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}

// Sample data to use as fallback if API fails
const sampleBooks = [
  {
    id: 1,
    title: "The Great Adventure",
    author: "John Smith",
    price: 12.99,
    category: "Fiction",
    publishedDate: "2023-01-15",
    popularity: 95,
    description: "An epic journey through uncharted territories.",
    imageUrl: "/images/books/great-adventure.jpg",
  },
  {
    id: 2,
    title: "Science of Everything",
    author: "Jane Doe",
    price: 15.99,
    category: "Science",
    publishedDate: "2023-03-22",
    popularity: 88,
    description: "Explore the fundamental principles that govern our universe.",
    imageUrl: "/images/books/science-everything.jpg",
  },
  {
    id: 3,
    title: "History of the World",
    author: "Robert Johnson",
    price: 18.99,
    category: "History",
    publishedDate: "2022-11-05",
    popularity: 82,
    description: "A comprehensive look at world history from ancient to modern times.",
    imageUrl: "/images/books/history-world.jpg",
  },
  {
    id: 4,
    title: "The Art of Cooking",
    author: "Maria Garcia",
    price: 24.99,
    category: "Non-Fiction",
    publishedDate: "2023-02-10",
    popularity: 90,
    description: "Master the essential techniques of culinary arts.",
    imageUrl: "/images/books/art-cooking.jpg",
  },
  {
    id: 5,
    title: "Space Explorers",
    author: "David Wilson",
    price: 9.99,
    category: "Children",
    publishedDate: "2023-04-18",
    popularity: 75,
    description: "Join the adventure as kids explore the wonders of space.",
    imageUrl: "/images/books/space-explorers.jpg",
  },
  {
    id: 6,
    title: "Mind and Soul",
    author: "Sarah Brown",
    price: 14.99,
    category: "Self-Help",
    publishedDate: "2022-12-01",
    popularity: 85,
    description: "Discover the path to inner peace and mental well-being.",
    imageUrl: "/images/books/mind-soul.jpg",
  },
  {
    id: 7,
    title: "The Last Kingdom",
    author: "Michael Taylor",
    price: 11.99,
    category: "Fiction",
    publishedDate: "2023-01-30",
    popularity: 92,
    description: "A tale of conquest, betrayal, and redemption in a medieval kingdom.",
    imageUrl: "/images/books/last-kingdom.jpg",
  },
  {
    id: 8,
    title: "Ocean Depths",
    author: "Emily White",
    price: 16.99,
    category: "Science",
    publishedDate: "2022-10-15",
    popularity: 78,
    description: "Explore the mysteries of the deep ocean and its inhabitants.",
    imageUrl: "/images/books/ocean-depths.jpg",
  },
  {
    id: 9,
    title: "Ancient Civilizations",
    author: "Thomas Lee",
    price: 19.99,
    category: "History",
    publishedDate: "2022-09-20",
    popularity: 80,
    description: "Uncover the secrets of ancient civilizations and their lasting impact.",
    imageUrl: "/images/books/ancient-civilizations.jpg",
  },
  {
    id: 10,
    title: "Modern Architecture",
    author: "Jennifer Clark",
    price: 22.99,
    category: "Non-Fiction",
    publishedDate: "2023-05-05",
    popularity: 70,
    description: "A visual journey through the most innovative architectural designs.",
    imageUrl: "/images/books/modern-architecture.jpg",
  },
  {
    id: 11,
    title: "Fairy Tales",
    author: "Lisa Anderson",
    price: 8.99,
    category: "Children",
    publishedDate: "2023-03-10",
    popularity: 88,
    description: "Classic fairy tales reimagined for the modern child.",
    imageUrl: "/images/books/fairy-tales.jpg",
  },
  {
    id: 12,
    title: "Productivity Habits",
    author: "Richard Moore",
    price: 13.99,
    category: "Self-Help",
    publishedDate: "2023-02-28",
    popularity: 86,
    description: "Transform your work habits and achieve more with less effort.",
    imageUrl: "/images/books/productivity-habits.jpg",
  },
]