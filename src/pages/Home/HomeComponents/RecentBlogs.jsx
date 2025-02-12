import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";
import AuthContext from "../../../contexts/authContext/AuthContext";
import Loading from "../../Shared/Loading";
import axios from "axios";

const RecentBlogs = () => {
  const { currentUser } = useContext(AuthContext);
  const [loadedBlogs, setLoadedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dataFetch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://theguidebb.vercel.app/recentblogs`
      );
      const result = await response.data;
      setLoadedBlogs(result);
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    dataFetch();
  }, []);

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
    <div className="max-w-screen-2xl mx-auto px-4 py-4">
      <div>
        <h2 className="text-2xl md:text-4xl text-center font-bold my-8">
          Recent Blogs
        </h2>
      </div>
      <div>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="grid lgx:grid-cols-2 gap-8 my-8">
            {loadedBlogs.map((blog) => (
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

export default RecentBlogs;
