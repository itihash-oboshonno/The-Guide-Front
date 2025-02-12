import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/authContext/AuthContext";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import Loading from "../../Shared/Loading";
import { toast, Toaster } from "sonner";
import { BiSolidDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useContext(AuthContext);
  const wishUser = currentUser.uid;
  const [thisLoading, setThisLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        setThisLoading(true);
        const { data } = await axiosSecure.get(`/mywishlist/${wishUser}`);
        setFetchedData(data.length ? data : null);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setThisLoading(false);
      }
    };

    dataFetch();
  }, [wishUser]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://theguidebb.vercel.app/mywishlist/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Post removed from your wishlist.",
                icon: "success",
              });
              setFetchedData(fetchedData.filter((y) => y._id !== _id));
            }
          });
      }
    });
  };

  return (
    <div>
      <div className="text-primary text-center">
        <h2 className="py-4 text-2xl md:text-4xl font-bold">
          {currentUser.displayName}'s Wishlist
        </h2>
      </div>
      <div className="max-w-screen-2xl mx-auto px-4">
        <div>
          {thisLoading ? (
            <Loading></Loading>
          ) : (
            <div>
              {fetchedData ? (
                <div className="flex flex-col gap-5 pt-4 pb-20">
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
                        {fetchedData.map((prottek, index) => (
                          <tr className="hover" key={prottek._id}>
                            <th>{index + 1}</th>
                            <td className="font-bold">{prottek.title}</td>
                            <td>
                              {prottek.shortDescription.length > 50
                                ? `${prottek.shortDescription.slice(0, 50)}...`
                                : prottek.shortDescription}
                            </td>
                            <td>
                              {
                                prottek.longDescription.trim().split(/\s+/)
                                  .length
                              }
                            </td>
                            <td>{prottek.category}</td>
                            <td>
                              <div className="flex gap-4">
                                <Link to={`/post/${prottek.blogId}`}>
                                  <button className="text-2xl">
                                    <BiSolidDetail />
                                  </button>
                                </Link>
                                <button
                                  onClick={() => handleDelete(prottek._id)}
                                  className="text-2xl"
                                >
                                  <MdDeleteForever />
                                </button>
                              </div>
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
          )}
        </div>
      </div>
      <Toaster position="top-center" expand={false} richColors />
    </div>
  );
};

export default Wishlist;
