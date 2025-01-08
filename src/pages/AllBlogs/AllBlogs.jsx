import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext/AuthContext";
import { toast, Toaster } from "sonner";
import axios from "axios";
import Loading from "../Shared/Loading";

const AllBlogs = () => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  // search and filter functionality area:
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [filterBy, setFilterBy] = useState(""); // Selected category
  const [dataToShow, setDataToShow] = useState([]); // Fetched data

  const dataFetch = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  useEffect(() => {
    dataFetch();
  }, [searchQuery, filterBy]);

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearchQuery(input);
  };

  // end of search and filter

  const handleWishlist = (blog) => {
    const {
      _id,
      title,
      cover,
      category,
      shortDescription,
      longDescription,
      authorName,
      authorMail,
    } = blog;
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
      <div className="text-primary text-center">
        <h2 className="py-4 text-2xl md:text-4xl font-bold">All Blogs</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 max-w-3xl mx-auto">
        {/* search and suggestions */}
        <div className="flex items-center w-full">
          <p className="rounded-l-lg px-4 py-2 border border-r-0 bg-prim3 text-primary font-medium">
            Search
          </p>
          <input
            type="text"
            className="rounded-r-lg p-2 border border-l-0 w-full"
            placeholder="Type here"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {/* filter */}
        <div className="flex items-center w-full">
          <p className="rounded-l-lg px-[22px] py-2 border border-r-0 bg-prim3 text-primary font-medium">
            Filter
          </p>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            name="category"
            className="rounded-r-lg p-[9.5px] border border-l-0 w-full"
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
      </div>

      <div>
        {isLoading ? <Loading></Loading> : (
          <div className="grid lgx:grid-cols-2 gap-8 mt-4 pb-32">
          {dataToShow.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col md:flex-row lgx:flex-col lgxx:flex-row items-center border rounded-2xl shadow-lg"
            >
              <div>
                <img
                  className="rounded-t-2xl sm:rounded-none sm:max-w-sm sm:max-h-64 md:max-w-64 md:max-h-44 mdb:max-w-sm mdb:max-h-64 object-cover mdb:rounded-l-2xl lgx:rounded-none lgxx:max-w-80 lgxx:max-h-56"
                  src={blog.cover}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-4 p-4 lgxx:p-6">
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
        )}
      </div>
      <Toaster position="top-center" expand={false} richColors />
    </div>
  );
};

export default AllBlogs;
