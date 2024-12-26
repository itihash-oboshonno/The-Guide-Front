import React, { useContext, useRef } from "react";
import AuthContext from "../../../contexts/authContext/AuthContext";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddBlog = () => {
  const { currentUser } = useContext(AuthContext);
  const formRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (postData) => {
      axiosSecure.post("/blogs", postData);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const cover = e.target.cover.value;
    const category = e.target.category.value;
    const shortDescription = e.target.shortDescription.value;
    const longDescription = e.target.longDescription.value;
    const authorName = currentUser.displayName;
    const authorMail = currentUser.email;
    const uniqueId = currentUser.uid;

    const newPost = {
      title,
      cover,
      category,
      shortDescription,
      longDescription,
      authorName,
      authorMail,
      uniqueId,
    };

    try {
      await mutateAsync(newPost);
      formRef.current.reset();
        Swal.fire({
          title: "Success!",
          text: "Your blog has been posted!",
          icon: "success",
        });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="bg-prim2 text-white text-center">
        <h2 className="py-16 text-2xl md:text-4xl font-bold">Add Post</h2>
      </div>

      <div className="flex flex-col items-center justify-center my-8 text-dark">
        <div className="text-center grid gap-4 px-4">
          <p className="text-prim2">Add New Post</p>
          <div className="flex items-center justify-center gap-2">
            <hr className="flex-grow" />
            <p className="text-sm">Fill up your post details below</p>
            <hr className="flex-grow" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-4 mb-16 px-4">
        <form onSubmit={handleSubmit} className="grid gap-5" ref={formRef}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <div className="w-full">
              <p className="mb-1 font-medium">Post Title</p>
              <input
                type="text"
                name="title"
                placeholder="Post Title"
                className="rounded-lg p-2 border w-full"
                required
              />
            </div>
            <div className="w-full">
              <p className="mb-1 font-medium">Post Cover</p>
              <input
                type="url"
                name="cover"
                placeholder="Photo-URL"
                className="rounded-lg p-2 border w-full"
                required
              />
            </div>
            <div className="w-full">
              <p className="mb-1 font-medium">Category</p>
              <select name="category" className="rounded-lg p-2 border w-full">
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
          <div className="w-full">
            <p className="mb-1 font-medium">Short Description</p>
            <textarea
              type="text"
              name="shortDescription"
              placeholder="Write short description for your post..."
              className="rounded-lg p-2 border w-full"
              required
            />
          </div>
          <div className="w-full">
            <p className="mb-1 font-medium">Long Description</p>
            <textarea
              type="text"
              name="longDescription"
              placeholder="Write your post..."
              className="rounded-lg p-2 border w-full min-h-44"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <div className="w-full">
              <p className="mb-1 font-medium">User Email</p>
              <p className="rounded-lg p-2 border w-full bg-accent opacity-80">
                {currentUser?.email}
              </p>
            </div>
            <div className="w-full">
              <p className="mb-1 font-medium">User Name</p>
              <p className="rounded-lg p-2 border w-full bg-accent opacity-80">
                {currentUser?.displayName}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <input
              type="submit"
              value="Submit Post"
              className="text-white font-bold px-6 py-2 my-4 rounded-lg bg-prim2 cursor-pointer hover:bg-primary hover:shadow-xl transition"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
