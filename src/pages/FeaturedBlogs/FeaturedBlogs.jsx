import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../Shared/Loading";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { RxCaretSort } from "react-icons/rx";

const FeaturedBlogs = () => {
  const [featData, setFeatData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://theguidebb.vercel.app/featuredblogs"
      );
      setFeatData(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "shortDescription",
        header: "Description",
        cell: ({ getValue }) => <div>{getValue().slice(0, 50)}...</div>,
      },
      {
        accessorKey: "longDescriptionWords",
        header: "Words",
        cell: ({ getValue }) => <div>{getValue()}</div>,
        sortingFn: (rowA, rowB) => {
          const countA = rowA.original.longDescription.split(" ").length;
          const countB = rowB.original.longDescription.split(" ").length;
          return countB - countA;
        },
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <button className="px-4 py-1 rounded-full bg-accent text-primary">
            <Link to={`/post/${row.original._id}`}>Read Now</Link>
          </button>
        ),
      },
    ],
    []
  );

  const tableData = useMemo(
    () =>
      featData.map((item) => ({
        ...item,
        longDescriptionWords: item.longDescription.split(" ").length,
      })),
    [featData]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div>
      <div className="text-primary text-center">
        <h2 className="py-4 text-2xl md:text-4xl font-bold">Featured Blogs</h2>
      </div>
      <div className="max-w-screen-2xl mx-auto px-4 pt-4 pb-20">
        <div>
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <div className="overflow-x-auto border rounded-2xl shadow-lg">
              <table className="table w-full">
                <thead className="bg-gray-200 text-sm">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          onClick={
                            header.column.getCanSort()
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                          className={`p-3 text-left cursor-pointer ${
                            header.column.getCanSort()
                              ? "hover:bg-gray-300"
                              : ""
                          }`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() &&
                            (header.column.getIsSorted() === "asc"
                              ? " ☝️"
                              : header.column.getIsSorted() === "desc"
                              ? " 👇"
                              : " ")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-100">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
