import React, { useContext, useEffect, useRef, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaPenNib } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import AuthContext from "../../../contexts/authContext/AuthContext";
import { toast, Toaster } from "sonner";

const DetailedBlog = () => {
  const blog = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const formRef = useRef(null);

  const handleComment = (e) => {
    e.preventDefault();
    const comContent = e.target.commentBox.value;
    const name = currentUser.displayName;
    const image = currentUser.photoURL;
    const blogId = blog._id;
    const newComment = { name, image, comContent, blogId };

    fetch("https://theguidebb.vercel.app/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          formRef.current.reset();
          toast.success("Your comment has been posted");
          const updatedArray = [...comments, newComment];
          setComments(updatedArray);
        }
      });
  };

  useEffect(() => {
    fetch(`https://theguidebb.vercel.app/comments/${blog._id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div>
        {currentUser?.uid === blog.uniqueId ? (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-4">
            <Link to={`/updatePost/${blog._id}`}>
              <button className="text-white font-bold px-6 py-2 my-4 rounded-lg bg-green-600 cursor-pointer hover:bg-green-700 hover:shadow-xl transition">
                Update
              </button>
            </Link>
            {/* <button className="text-white font-bold px-6 py-2 my-4 rounded-lg bg-red-600 cursor-pointer hover:bg-red-700 hover:shadow-xl transition">
              Delete
            </button> 
            Will add this later, as it is not required now. Deleting this is already set up on the backend.*/}
          </div>
        ) : (
          ""
        )}
      </div>
      <h1 className="text-2xl md:text-4xl text-center font-bold pb-4">{blog.title}</h1>
      <div className="flex items-center justify-center gap-8">
        <p className="flex items-center gap-1 font-medium">
          <FaPenNib /> {blog.authorName}
        </p>
        <p className="flex items-center gap-1 font-medium">
          <BiSolidCategory className="text-xl" /> {blog.category}
        </p>
      </div>
      <div className="flex justify-center items-center py-4">
        <img src={blog.cover} alt="" />
      </div>
      <div>
        <div
          className="grid gap-4 py-4"
          dangerouslySetInnerHTML={{ __html: blog.longDescription }}
        ></div>
      </div>
      <hr className="my-8" />
      <div>
        {currentUser ? (
          <div className="my-8">
            {currentUser.uid === blog.uniqueId ? (
              <p className="font-bold text-center text-2xl">
                Author cannot comment on own post!
              </p>
            ) : (
              <div>
                <form onSubmit={handleComment} ref={formRef}>
                  <div className="flex items-center gap-4 py-2">
                    <img
                      className="h-9 w-9 object-cover rounded-full"
                      src={currentUser.photoURL}
                      alt=""
                    />
                    <p className="font-semibold">{currentUser.displayName}</p>
                  </div>
                  <textarea
                    type="text"
                    name="commentBox"
                    placeholder="Write your comment..."
                    className="rounded-lg p-2 border w-full"
                    required
                  />
                  <input
                    type="submit"
                    value="Comment"
                    className="text-white font-bold px-6 py-2 my-4 rounded-lg bg-prim2 cursor-pointer hover:bg-primary hover:shadow-xl transition"
                  />
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-20">
            <p className="text-center text-xl">
              Please{" "}
              <Link className="text-primary underline" to="/login">
                login
              </Link>{" "}
              to comment on post
            </p>
          </div>
        )}
      </div>
      <div className="mb-20">
        <p className="font-bold text-xl my-8">Comments</p>
        {comments.length > 0 ? (
          <div className="grid gap-8">
            {comments.map((each) => (
              <div className="flex gap-4" key={each._id}>
                <img
                  className="h-9 w-9 object-cover rounded-full"
                  src={each.image}
                  alt=""
                />
                <div>
                  <p className="font-medium text-dark">{each.name}</p>
                  <p>{each.comContent}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl">No Comments Yet</p>
        )}
      </div>
      <Toaster position="top-center" expand={false} richColors />
    </div>
  );
};

export default DetailedBlog;
