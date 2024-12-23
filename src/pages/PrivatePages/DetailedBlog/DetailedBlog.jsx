import React from "react";
import { useLoaderData } from "react-router-dom";

const DetailedBlog = () => {
  const blog = useLoaderData();

  return (
    <div>
      <div>{blog.title}</div>
      <div>
        <img src={blog.cover} alt="" />
      </div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: blog.longDescription }}></div>
      </div>
    </div>
  );
};

export default DetailedBlog;
