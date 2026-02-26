import { useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useNavigate } from "react-router-dom";

function Home() {
  const [newAudioSrc, setNewAudioSrc] = useState<string | null>(null);
  const [posts, setPosts] = useState<Posts[] | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [inputPost, setInputPost] = useState<string>("");

  const [tokenState, setTokenState] = useState<string | null>(null);

  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (inputPost !== "" || newAudioSrc) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [inputPost, newAudioSrc]);

  type Posts = {
    audio: null | string;
    comments: number;
    created_at: string;
    image: string | null;
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

  type User = {
    email: string;
    full_name: string;
    picture: string;
    username: string;
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log("token", token);

    if (token) {
      setTokenState(token);
    } else {
      console.error();
      setTokenState(null);
      navigate("/login");
    }
  }, []);

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: any) => {
    const url = URL.createObjectURL(blob);
    setNewAudioSrc(url);
  };

  const handleDeleteAudio = () => {
    if (newAudioSrc) {
      URL.revokeObjectURL(newAudioSrc);
    }

    setNewAudioSrc(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setTokenState(null);
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await fetch(
          "https://api.hr.constel.co/api/v1/accounts/me",
          {
            headers: {
              Authorization: `Bearer ${tokenState}`,
            },
          },
        );
        const user = await userResponse.json();
        setUser(user.account);

        // console.log("user response", user);
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
              Authorization: `Bearer ${tokenState}`,
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
  }, [tokenState]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(inputPost);
    try {
      const postResponse = await fetch(
        "https://api.hr.constel.co/api/v1/posts",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenState}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body:
            "text=" +
            encodeURIComponent(inputPost) +
            "&audio=" +
            encodeURIComponent(`${newAudioSrc ? newAudioSrc : ""}`),
        },
      );
      const data = await postResponse.json();

      if (!postResponse.ok) {
        console.log("Nije uspelo", data.message);
        return;
      }

      console.log("uspelo je");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen !mt-[2%] flex flex-col items-start gap-5 !pb-8">
      <div className="absolute top-10 right-10">
        <button
          className="bg-red-500 text-white !px-2 !py-1 rounded cursor-pointer"
          onClick={() => handleLogOut()}
        >
          Log Out
        </button>
      </div>
      <div className="w-[600px] !mx-auto ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-gray-200 !p-5 rounded gap-2"
        >
          <div className="flex">
            <figure className="!mr-4 w-15 aspect-square">
              <img
                src={user && user?.picture}
                className="w-full h-full ovject-cover rounded-full"
              />
            </figure>
            <input
              type="text"
              className="border-b border-gray-300 w-full focus:outline-none focus:border-blue-500"
              placeholder="What's happening"
              value={inputPost}
              onChange={(e) => setInputPost(e.target.value)}
            />
          </div>
          <div
            className={`${newAudioSrc ? "hidden" : ""} w-full flex flex-col gap-1`}
          >
            <AudioRecorder
              onRecordingComplete={(blob) => addAudioElement(blob)}
              recorderControls={recorderControls}
            />
          </div>
          {newAudioSrc && (
            <div>
              <audio
                src={newAudioSrc}
                controls={true}
                className="w-full"
              ></audio>
            </div>
          )}
          <div className="flex gap-5 justify-end !my-3">
            {newAudioSrc && (
              <button
                onClick={() => handleDeleteAudio()}
                className="text-2xl text-white !py-2 !px-4 rounded"
              >
                <i className="bxr  bx-trash text-red-600 cursor-pointer"></i>
              </button>
            )}

            <button
              className={`!py-2 !px-4 text-gray-100 transition duration-300 rounded cursor-pointer 
            ${isActive ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 hover:bg-gray-400"}`}
              disabled={!isActive}
            >
              New Post
            </button>
          </div>
        </form>
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
                <p>@{item.user.username}</p>
                <p>{item.user.full_name}</p>
              </div>
              <div className="text-right !ml-auto flex justify-center items-center gap-2 text-gray-500">
                <i className="bxr  bx-calendar"></i>
                <span>
                  {item.created_at.split("T")[0].split("-").reverse().join(".")}
                </span>

                <button className="cursor-pointer flex justify-center items-center">
                  <i className="bxr  bx-trash text-red-600 text-lg "></i>
                </button>
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
              <button className="bg-gray-300 rouded !px-3 !py-1  flex justify-center items-center gap-1">
                {item.liked ? (
                  <i className="bxr  bxs-heart"></i>
                ) : (
                  <i className="bxr  bx-heart"></i>
                )}{" "}
                {item.likes}
              </button>
              <button className="bg-gray-300 rouded !px-3 !py-1  flex justify-center items-center gap-1">
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
