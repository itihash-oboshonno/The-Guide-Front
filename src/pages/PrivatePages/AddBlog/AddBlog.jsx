import React, { useContext, useRef } from "react";
import AuthContext from "../../../contexts/authContext/AuthContext";

const AddBlog = () => {

    const {currentUser} = useContext(AuthContext);
    const formRef = useRef(null);

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
        <form className="grid gap-5" ref={formRef}>
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
                <select
                name="category"
                className="rounded-lg p-2 border w-full">
                    <option value="art">Art</option>
                    <option value="automobile">Automobile</option>
                    <option value="fashion">Fashion</option>
                    <option value="history">History</option>
                    <option value="media">Media</option>
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
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
