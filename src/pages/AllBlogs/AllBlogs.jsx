import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import AuthContext from "../../contexts/authContext/AuthContext";
import { toast, Toaster } from "sonner";

const AllBlogs = () => {
  const { currentUser } = useContext(AuthContext);
  const allBlogs = useLoaderData();

  const handleWishlist = (blog) => {
    const {
      title,
      cover,
      category,
      shortDescription,
      longDescription,
      authorName,
      authorMail,
    } = blog;

    if (currentUser) {
      const wishObj = {
        title,
        cover,
        category,
        shortDescription,
        longDescription,
        authorName,
        authorMail,
        wishListsUser: currentUser.email,
        wishListsName: currentUser.displayName,
      };
      fetch("http://localhost:5000/wishlist", {
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
      <div className="grid lgxx:grid-cols-2 gap-8 mt-4 mb-32">
        {allBlogs.map((blog) => (
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
