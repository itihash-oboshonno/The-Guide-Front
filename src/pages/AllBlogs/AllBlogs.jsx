import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext/AuthContext";
import { toast, Toaster } from "sonner";
import axios from "axios";

const AllBlogs = () => {
  const { currentUser } = useContext(AuthContext);

  // search and filter functionality area:
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [filterBy, setFilterBy] = useState(""); // Selected category
  const [dataToShow, setDataToShow] = useState([]); // Fetched data
  const [suggestions, setSuggestions] = useState([]); // Title suggestions

  const dataFetch = async () => {
    try {
      const response = await axios.get(
        `https://theguidebb.vercel.app/conditionalblogs`,
        {
          params: { searchQuery, filterBy },
        }
      );
      const result = await response.data;
      setDataToShow(result);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get(
        `https://theguidebb.vercel.app/conditionalblogs`,
        {
          params: { searchQuery: input },
        }
      );
      setSuggestions(response.data.map((proti) => proti.title)); // Extract titles for suggestions
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    dataFetch();
  }, [searchQuery, filterBy]);

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearchQuery(input);
    if (input) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchQuery(title);
    setSuggestions([]);
  };
  // end of search and filter

  const handleWishlist = (blog) => {
    const { _id, title, cover, category, shortDescription, longDescription, authorName, authorMail, } = blog;
    const blogId = _id;

    if (currentUser) {
      const wishObj = {
        title,
        cover,
        category,
        shortDescription,
        longDescription,
        authorName,
        authorMail,
        wishListsUser: currentUser.uid,
        wishListsName: currentUser.displayName,
        blogId,
      };
      fetch("https://theguidebb.vercel.app/wishlist", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(wishObj),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success(`${title} has been added to your Watchlist!`);
          }
        });
    } else {
      toast.error("Please login to add item to your wishlist!");
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4">

      {/*  */}
      <div>
        <input
          type="text"
          className="rounded-lg p-2 border w-full"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
        {suggestions.length > 0 && (
          <ul className="border p-2 rounded bg-white">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer hover:bg-gray-200 p-1"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div>
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          name="category"
          className="rounded-lg p-2 border w-full"
        >
          <option value="">All Categories</option>
          <option value="Art">Art</option>
          <option value="Automobile">Automobile</option>
          <option value="Fashion">Fashion</option>
          <option value="History">History</option>
          <option value="Media">Media</option>
          <option value="Science">Science</option>
          <option value="Sports">Sports</option>
          <option value="Technology">Technology</option>
        </select>
      </div>

      <div className="grid lgxx:grid-cols-2 gap-8 mt-4 mb-32">
        {dataToShow.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col md:flex-row items-center gap-4 border rounded-2xl shadow-lg"
          >
            <div>
              <img
                className="sm:max-w-sm sm:h-full object-cover md:rounded-l-2xl"
                src={blog.cover}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-4 md:pr-4">
              <p className="font-bold text-xl">{blog.title}</p>
              <div className="flex items-center gap-1">
                <p className="text-dark">Category:</p>
                <p className="px-6 py-1 bg-accent rounded-full text-primary text-sm font-medium">
                  {blog.category}
                </p>
              </div>
              <p className="opacity-80">
                {blog.shortDescription.slice(0, 100)}...
              </p>
              <div className="flex items-center justify-start gap-4">
                <Link to={`/post/${blog._id}`}>
                  <button className="text-white text-sm bg-prim2 px-4 py-2 md:px-6 md:py-2.5 rounded-full hover:shadow-lg hover:bg-primary transition-all">
                    View Details
                  </button>
                </Link>
                <button
                  onClick={() => handleWishlist(blog)}
                  className="text-white text-sm bg-prim2 px-4 py-2 md:px-6 md:py-2.5 rounded-full hover:shadow-lg hover:bg-primary transition-all"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Toaster position="top-center" expand={false} richColors />
    </div>
  );
};

export default AllBlogs;
