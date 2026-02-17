import { useState, useEffect } from "react";

function Home() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMGE0OGEyYjMtZjY2MC00YjIwLWEyNjEtYzllZjE1YzI4NmY3IiwiaWF0IjoxNzcxMzQxMzc3fQ.VqQH-_OR-Ton_-sHeletFnth_Zolto944qTERSSohGQ";

  https: useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        "https://api.hr.constel.co/api/v1/accounts/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const posts = await response.json();

      console.log(posts);
      try {
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="min-h-screen !mt-[5%]">
      <div className="w-[fit-content] !mx-auto flex justify-center items-center gap-2">
        <h1>Home</h1>
      </div>
    </section>
  );
}

export default Home;
