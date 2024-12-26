import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import Loading from "../Shared/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FeaturedBlogs = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['topten'],
    queryFn: async () => {
    const {data} = await axios.get('http://localhost:5000/featuredblogs')
    return data;
  }
})

  if (isLoading) {
    return <Loading></Loading>;
  }

console.log(data);

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto px-4">
        <div>
          {data ? (
            <div className="flex flex-col gap-5 py-10">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Words</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((prottek, index) => (
                      <tr className="hover" key={prottek._id}>
                        <th>{index + 1}</th>
                        <td className="font-bold">{prottek.title}</td>
                        <td>
                          {prottek.shortDescription.length > 50
                            ? `${prottek.shortDescription.slice(0, 50)}...`
                            : prottek.shortDescription}
                        </td>
                        <td>
                          {prottek.longDescription.trim().split(/\s+/).length}
                        </td>
                        <td>{prottek.category}</td>
                        <td>
                          <button className="px-4 py-1 rounded-full bg-accent text-primary">
                            <Link to={`/post/${prottek._id}`}>Read Now</Link>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-center text-lg md:text-2xl font-medium py-10">
              You haven't added any blogs to your wishlist yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
