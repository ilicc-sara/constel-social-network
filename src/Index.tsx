import { useState, useEffect } from "react";

function Home() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMGE0OGEyYjMtZjY2MC00YjIwLWEyNjEtYzllZjE1YzI4NmY3IiwiaWF0IjoxNzcxMzQxMzc3fQ.VqQH-_OR-Ton_-sHeletFnth_Zolto944qTERSSohGQ";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await fetch(
          "https://api.hr.constel.co/api/v1/accounts/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const user = await userResponse.json();

        console.log("user response", user);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPosts = async () => {
      try {
        const postResponse = await fetch(
          "https://api.hr.constel.co/api/v1/posts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const posts = await postResponse.json();

        console.log("posts response", posts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  return (
    <section className="min-h-screen !mt-[5%] flex flex-col items-start gap-5">
      <div className="w-[600px] !mx-auto ">
        <form className="flex flex-col bg-gray-200 !p-5">
          <div className="flex">
            <figure className="!mr-4 w-15 aspect-square">
              <img
                src="logo.jpg"
                className="w-full h-full ovject-cover rounded-full"
              />
            </figure>
            <input
              type="text"
              className="border-b border-gray-300 w-full focus:outline-none focus:border-blue-500"
              placeholder="What's happening"
            />
          </div>
          <div className="flex justify-end !my-3">
            <button className="bg-blue-500 text-white !py-2 !px-4 rounded">
              New Post
            </button>
          </div>
        </form>
      </div>

      <div className="w-[600px] !mx-auto ">
        <form className="flex flex-col bg-gray-200 !p-4">
          <div className="flex">
            <figure className="!mx-4 w-15 aspect-square">
              <img
                src="logo.jpg"
                className="w-full h-full ovject-cover rounded-full"
              />
            </figure>
            <input
              type="text"
              className="border-b border-gray-300 w-full focus:outline-none focus:border-blue-500"
              placeholder="What's happening"
            />
          </div>
          <div className="flex justify-end !my-3">
            <button className="bg-blue-500 text-white !py-2 !px-4 rounded">
              New Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Home;
