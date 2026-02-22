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

      <article className="w-[600px] !mx-auto flex flex-col bg-gray-200 !p-4 gap-3 rounded">
        <div className="flex items-start">
          <figure className="!mr-4 w-15 aspect-square">
            <img
              src="profile-pic.jpg"
              className="w-full h-full ovject-cover rounded-full"
            />
          </figure>
          <div>
            <p>@dzek_ludoriba</p>
            <p>Jack Ludoriba</p>
          </div>
          <div className="text-right !ml-auto flex justify-center items-center gap-2">
            <i className="bxr  bx-calendar"></i>
            <span>09.08.2024.</span>
          </div>
        </div>
        <div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi,
            delectus soluta tenetur inventore, at doloremque nulla ratione aut
            facere nostrum explicabo necessitatibus blanditiis quibusdam
            architecto, repellendus temporibus praesentium est sapiente!
          </p>
          <img src="clif.jpg" className="w-full h-full ovject-cover rounded" />
          <audio src="https://constel-hr-frontend.s3.eu-central-1.amazonaws.com/54f0f6d5-f53c-47f7-a1aa-bdb731e80597-blob"></audio>

          <audio controls controlsList="nodownload" className="w-full">
            <source
              src="https://constel-hr-frontend.s3.eu-central-1.amazonaws.com/54f0f6d5-f53c-47f7-a1aa-bdb731e80597-blob"
              type="audio/mpeg"
            />
          </audio>
        </div>
        <div className="flex justify-start gap-3 !my-3">
          <button className="bg-gray-300 rouded !px-3 !py-1">
            <i className="bxr  bx-heart"></i>
          </button>
          <button className="bg-gray-300 rouded !px-3 !py-1">
            <i className="bxr  bx-message-bubble-reply"></i>
          </button>
        </div>
      </article>

      {posts?.map((item, index) => {
        return (
          <article className="w-[600px] !mx-auto flex flex-col bg-gray-200 !p-4 gap-3 rounded">
            <div className="flex items-start">
              <figure className="!mr-4 w-15 aspect-square">
                <img
                  src="profile-pic.jpg"
                  className="w-full h-full ovject-cover rounded-full"
                />
              </figure>
              <div>
                <p>@dzek_ludoriba</p>
                <p>Jack Ludoriba</p>
              </div>
              <div className="text-right !ml-auto flex justify-center items-center gap-2">
                <i className="bxr  bx-calendar"></i>
                <span>09.08.2024.</span>
              </div>
            </div>
            <div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi,
                delectus soluta tenetur inventore, at doloremque nulla ratione
                aut facere nostrum explicabo necessitatibus blanditiis quibusdam
                architecto, repellendus temporibus praesentium est sapiente!
              </p>
              <img
                src="clif.jpg"
                className="w-full h-full ovject-cover rounded"
              />
              <audio src="https://constel-hr-frontend.s3.eu-central-1.amazonaws.com/54f0f6d5-f53c-47f7-a1aa-bdb731e80597-blob"></audio>

              <audio controls controlsList="nodownload" className="w-full">
                <source
                  src="https://constel-hr-frontend.s3.eu-central-1.amazonaws.com/54f0f6d5-f53c-47f7-a1aa-bdb731e80597-blob"
                  type="audio/mpeg"
                />
              </audio>
            </div>
            <div className="flex justify-start gap-3 !my-3">
              <button className="bg-gray-300 rouded !px-3 !py-1">
                <i className="bxr  bx-heart"></i>
              </button>
              <button className="bg-gray-300 rouded !px-3 !py-1">
                <i className="bxr  bx-message-bubble-reply"></i>
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default Home;
