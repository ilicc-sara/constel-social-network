import type { Posts, User } from "../types";
import { toast } from "react-toastify";

const URL_API = "https://api.hr.constel.co/api/v1";

type PostProps = {
  index: number;
  item: Posts | null;
  user: User | undefined;
  tokenState: string | null;
  setPosts: React.Dispatch<React.SetStateAction<Posts[] | null>>;
};

function Post({ index, item, user, tokenState, setPosts }: PostProps) {
  const likePost = async (postId: string, liked: boolean, likes: number) => {
    try {
      fetch(`${URL_API}/posts/${postId}/like`, {
        method: `${liked ? "DELETE" : "POST"}`,
        headers: {
          Authorization: `Bearer ${tokenState}`,
        },
      });
    } catch (err) {
      console.error(err);
    }
    // fetchPosts();
    setPosts((prev) => {
      if (!prev) return prev;
      {
        return prev?.map((item) => {
          if (item.post_id === postId) {
            return {
              ...item,
              liked: !liked,
              likes: liked ? likes - 1 : likes + 1,
            };
          } else return item;
        });
      }
    });
  };

  const deletePost = async (postId: string) => {
    try {
      const response = fetch(`${URL_API}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenState}`,
        },
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }

    setPosts((prev) => {
      if (!prev) return prev;
      return prev.filter((item) => item.post_id !== postId);
    });
    toast.success("Post succesfully deleted.");
  };

  return (
    <article
      key={index}
      className="w-[600px] !mx-auto flex flex-col bg-gray-200 !p-4 gap-3 rounded"
    >
      <div className="flex items-start">
        <figure className="!mr-4 w-15 aspect-square">
          <img
            src={item?.user.picture}
            className="w-full h-full object-cover rounded-full"
          />
        </figure>
        <div>
          <p>@{item?.user.username}</p>
          <p>{item?.user.full_name}</p>
        </div>
        <div className="text-right !ml-auto flex justify-center items-center gap-2 text-gray-500">
          <i className="bxr  bx-calendar"></i>
          <span>
            {item?.created_at.split("T")[0].split("-").reverse().join(".")}
          </span>

          {item && (
            <button
              className={`${user?.username === item?.user.username ? "" : "hidden"} cursor-pointer flex justify-center items-center cursor-pointer`}
              onClick={() => deletePost(item.post_id)}
            >
              <i className="bxr  bx-trash text-red-600 text-lg "></i>
            </button>
          )}
        </div>
      </div>
      <div>
        {item?.text && <p>{item?.text}</p>}
        {item?.image && (
          <img
            src={`${item.image}`}
            className="w-full h-full object-cover rounded"
          />
        )}

        {item?.audio && (
          <>
            <audio src={item.audio}></audio>

            <audio controls controlsList="nodownload" className="w-full">
              <source src={item.audio} type="audio/mpeg" />
            </audio>
          </>
        )}
      </div>
      <div className="flex justify-start gap-3 !my-3">
        {item && (
          <button
            className="bg-gray-300 rouded !px-3 !py-1 flex justify-center items-center gap-1 cursor-pointer"
            onClick={() => likePost(item.post_id, item.liked, item.likes)}
          >
            {item?.liked ? (
              <i className="bxr  bxs-heart"></i>
            ) : (
              <i className="bxr  bx-heart"></i>
            )}{" "}
            {item?.likes}
          </button>
        )}
        <button className="bg-gray-300 rouded !px-3 !py-1  flex justify-center items-center gap-1">
          <i className="bxr  bx-message-bubble-reply"></i> {item?.comments}
        </button>
      </div>
    </article>
  );
}

export default Post;
