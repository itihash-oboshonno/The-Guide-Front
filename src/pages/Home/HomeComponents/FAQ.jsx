import React from "react";

const FAQ = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-4">
      <div>
        <h2 className="text-2xl md:text-4xl text-center font-bold my-8">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="grid gap-1">
        <div className="collapse collapse-plus bg-accent bg-opacity-20 shadow-lg">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title text-xl font-medium text-dark">
            Who writes the content for this blog?
          </div>
          <div className="collapse-content">
            <p>Our content is only produced by industry experts.</p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-accent bg-opacity-20 shadow-lg">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium text-dark">
            How often do you publish new posts?
          </div>
          <div className="collapse-content">
            <p>Everyday. More specifically, as soon as we get new updates.</p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-accent bg-opacity-20 shadow-lg">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium text-dark">
          Are the articles free to read?
          </div>
          <div className="collapse-content">
            <p>
              Yes, absolutely! However, we my earn a small commission from the ads you see on our site.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-accent bg-opacity-20 shadow-lg">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium text-dark">
          Can I leave comments on posts?
          </div>
          <div className="collapse-content">
            <p>
              Surely, you can. But in order to do that, you have to login first.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-accent bg-opacity-20 shadow-lg">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium text-dark">
            How do I receive updates on new posts?
          </div>
          <div className="collapse-content">
            <p>
              You can subscribe to our newsletter in order to receive regular
              updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
