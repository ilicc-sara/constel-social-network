import { useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

function Home() {
  type Posts = {
    audio: null | string;
    comments: number;
    created_at: string;
    image: string;
    liked: boolean;
    likes: number;
    post_id: string;
    text: string;
    user: {
      username: string;
      full_name: string;
      picture: string;
    };
    user_id: string;
  };

  const [posts, setPosts] = useState<Posts[] | null>(null);
  const [inputPost, setInputPost] = useState<string>("");

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
        setPosts(posts.posts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: any) => {
    const url = URL.createObjectURL(blob);
    console.log(url);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(inputPost);
  };

  return (
    <section className="min-h-screen !mt-[5%] flex flex-col items-start gap-5 !pb-8">
      <div className="w-[600px] !mx-auto ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-gray-200 !p-5 rounded"
        >
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
              onChange={(e) => setInputPost(e.target.value)}
            />
          </div>
          <div className="flex justify-end !my-3">
            <button className="bg-blue-500 text-white !py-2 !px-4 rounded">
              New Post
            </button>
          </div>
        </form>

        <div>
          <AudioRecorder
            onRecordingComplete={(blob) => addAudioElement(blob)}
            recorderControls={recorderControls}
          />
          <button onClick={recorderControls.stopRecording}>
            Stop recording
          </button>
        </div>
      </div>

      {posts?.map((item, index) => {
        return (
          <article
            key={index}
            className="w-[600px] !mx-auto flex flex-col bg-gray-200 !p-4 gap-3 rounded"
          >
            <div className="flex items-start">
              <figure className="!mr-4 w-15 aspect-square">
                <img
                  src={item.user.picture}
                  className="w-full h-full object-cover rounded-full"
                />
              </figure>
              <div>
                <p>{item.user.username}</p>
                <p>{item.user.full_name}</p>
              </div>
              <div className="text-right !ml-auto flex justify-center items-center gap-2">
                <i className="bxr  bx-calendar"></i>
                <span>
                  {item.created_at.split("T")[0].split("-").reverse().join(".")}
                </span>
              </div>
            </div>
            <div>
              {item.text && <p>{item.text}</p>}
              {item.image && (
                <img
                  src={`${item.image}`}
                  className="w-full h-full object-cover rounded"
                />
              )}

              {item.audio && (
                <>
                  <audio src={item.audio}></audio>

                  <audio controls controlsList="nodownload" className="w-full">
                    <source src={item.audio} type="audio/mpeg" />
                  </audio>
                </>
              )}
            </div>
            <div className="flex justify-start gap-3 !my-3">
              <button className="bg-gray-300 rouded !px-3 !py-1">
                {item.liked ? (
                  <i className="bxr  bxs-heart"></i>
                ) : (
                  <i className="bxr  bx-heart"></i>
                )}{" "}
                {item.likes}
              </button>
              <button className="bg-gray-300 rouded !px-3 !py-1">
                <i className="bxr  bx-message-bubble-reply"></i> {item.comments}
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default Home;
