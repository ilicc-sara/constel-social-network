import { useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import type { Posts, User } from "../../types";
import Post from "./components/Post";
import Input from "../../UI/Input";

const URL_API = "https://api.hr.constel.co/api/v1";

function Home() {
  const [newAudioSrc, setNewAudioSrc] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      setTokenState(token);
    } else {
      console.error();
      setTokenState(null);
      navigate("/login");
    }
  }, []);

  const fetchUser = async () => {
    try {
      const userResponse = await fetch(`${URL_API}/accounts/me`, {
        headers: {
          Authorization: `Bearer ${tokenState}`,
        },
      });
      const user = await userResponse.json();
      setUser(user.account);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const postResponse = await fetch(`${URL_API}/posts`, {
        headers: {
          Authorization: `Bearer ${tokenState}`,
        },
      });

      const posts = await postResponse.json();

      setPosts(posts.posts);
    } catch (err) {
      console.error(err);
    }
  };

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setAudioBlob(blob);
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
    fetchUser();
    fetchPosts();
  }, [tokenState]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("text", inputPost);

      if (audioBlob) {
        formData.append("audio", audioBlob, "recording.webm");
      }
      const postResponse = await fetch(`${URL_API}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenState}`,
        },
        body: formData,
      });
      const data = await postResponse.json();
      if (!postResponse.ok) {
        toast.error(data.error.message);
        return;
      }
    } catch (err) {
      console.error(err);
    }
    setInputPost("");
    setNewAudioSrc(null);
    setAudioBlob(null);
    fetchPosts();
    toast.success("Post successfully created.");
  };

  return (
    <section className="min-h-screen !mt-[1%] flex flex-col items-start gap-5 !pb-8">
      <ToastContainer position="top-center" />
      <div className="absolute top-10 right-10">
        <button
          className="bg-red-500 text-white !px-2 !py-1 rounded cursor-pointer"
          onClick={() => handleLogOut()}
        >
          Log Out
        </button>
      </div>
      <div className="absolute top-10 left-10">
        <img className="w-12 h-12" src="logo.jpg" />
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
            {/* <input
              type="text"
              className="border-b border-gray-300 w-full focus:outline-none focus:border-blue-500"
              placeholder="What's happening"
              value={inputPost}
              onChange={(e) => setInputPost(e.target.value)}
            /> */}
            <Input
              type="text"
              variation="post"
              value={inputPost}
              handleChange={(e) => setInputPost(e.target.value)}
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
                type="button"
                onClick={() => handleDeleteAudio()}
                className="text-2xl text-white !py-2 !px-4 rounded"
              >
                <i className="bxr  bx-trash text-red-600 cursor-pointer"></i>
              </button>
            )}

            <button
              onSubmit={handleSubmit}
              type="submit"
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
          <Post
            index={index}
            item={item}
            user={user}
            tokenState={tokenState}
            setPosts={setPosts}
          />
        );
      })}
    </section>
  );
}

export default Home;
