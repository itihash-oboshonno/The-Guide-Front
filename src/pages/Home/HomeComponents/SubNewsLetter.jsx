import React, { useRef } from "react";
import { toast, Toaster } from "sonner";

const SubNewsLetter = () => {
  const subsRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.subEmail.value;
    const subcriber = {email};
    fetch("https://theguidebb.vercel.app/subscribers", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(subcriber)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          subsRef.current.reset();
          toast.success("You have subscribed successfully!");
        }
      });
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16">
      <div className="bg-prim3 bg-opacity-20 rounded-2xl">
      <div className="flex flex-col gap-8 items-center py-8 w-full">
        <div>
          <p className="text-2xl md:text-4xl text-dark font-semibold text-center md:text-start">
            Subscribe to our Newsletter
          </p>
        </div>
        <div className="rounded-full p-1 border border-dark flex items-center gap-2">
          <form onSubmit={handleSubmit} ref={subsRef}>
            <input
              className="rounded-l-full px-3 md:px-7 py-3 bg-transparent text-dark text-sm md:text-base placeholder:text-dark"
              type="email"
              name="subEmail"
              placeholder="Enter your email address"
            />
            <input
              type="submit"
              value="Subscribe"
              className="text-white text-sm md:text-base md:font-semibold bg-prim2 px-7 py-3 rounded-full hover:bg-primary hover:shadow-lg"
            />
          </form>
        </div>
      </div>
      <Toaster position="top-center" expand={false} richColors />
    </div>
    </div>
  );
};

export default SubNewsLetter;
