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
    <section className="min-h-screen !mt-[5%]">
      <div className="w-[fit-content] !mx-auto ">
        <form className="flex flex-col">
          <div className="flex">
            <figure>
              <img src="logo.jpg" className="w-14 h-14" />
            </figure>
            <input
              type="text"
              className="border-b border-gray-300"
              placeholder="What's happening"
            />
          </div>
          <div className="flex justify-end !py-1">
            <button className="bg-blue-500 text-white !px-4">New Post</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Home;
