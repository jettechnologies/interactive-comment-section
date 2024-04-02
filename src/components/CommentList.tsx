import {
  deleteIcon,
  editIcon,
  minusIcon,
  plusIcon,
  replyIcon,
} from "../assets";
import { Comments, UserData } from "../dataModel";
import { parse, formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
// import CommentInput from "./CommentInput";
import ReplyInput from "./ReplyInput";
import { getImagePath } from "../utils/imageUtil";
import useComments from "../context/CommentContext";

import userImgAlt from "../assets/user.png";

interface Props {
  comment: Comments;
  currentUser: UserData;
  setIsDeleting: React.Dispatch<
    React.SetStateAction<{
      id: string;
      status: boolean;
    }>
  >;
}

const humanReadableDate = (dateString: string): string => {
  const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
  const distanceToNow = formatDistanceToNow(parsedDate);
  return distanceToNow;
};

const CommentList: React.FC<Props> = ({
  comment,
  currentUser,
  setIsDeleting,
}) => {
  const [userImg, setUserImg] = useState<string>("");
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [edittedComment, setEdittedComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { replyComment, editComment, scoreIncrementOrDecrement } =
    useComments();


  useEffect(() => {
    const loadImage = async (): Promise<void> => {
      try {
        if (comment.user.image.png.includes("images/avatars")) {
          const userImage = await import(
            /* @vite-ignore */ getImagePath(comment.user.image.png)
          );
          setUserImg(userImage);
          return;
        }
        setUserImg(comment.user.image.png);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();

    // const loadImage = async () => {
    //   try {
    //       if(comment.user.image.png.includes("images/avatars")){
    //          /* @vite-ignore */ const { default: userImage } = await import(`./${comment.user.image.png}`);
    //           setUserImg(userImage);

    //           return
    //       }
    //     setUserImg(comment.user.image.png);
    //   } catch (error) {
    //     console.error('Error loading image:', error);
    //   }
    // };

    // loadImage();

    return () => {
      setUserImg(""); // Clear image state when component unmounts
    };
  }, [comment.user.image.png]);

  return (
    <div className="w-full h-fit flex flex-col gap-y-3">
      <div className="w-full py-6 px-4 bg-gray-200 shadow-sm rounded-md grid comment-list">
        <div className="w-32 max-sm:h-[42px] md:w-fit py-2 px-3 row-span-2 max-sm:row-start-2 max-sm:row-span-1 col-start-1 col-end-2 flex md:flex-col bg-gray-100 rounded-2xl h-24 justify-between items-center">
          <button
            className="bg-transparent focus:input-outline p-1"
            onClick={() => scoreIncrementOrDecrement(comment.id, "increment")}
          >
            <img src={plusIcon} alt="plus icon" />
          </button>
          <span className="text-size-400 text-blue font-medium">
            {comment.score}
          </span>
          <button
            className="justify-self-end bg-transparent focus:input-outline p-1"
            onClick={() => scoreIncrementOrDecrement(comment.id, "decrement")}
          >
            <img src={minusIcon} alt="minus icon" />
          </button>
        </div>
        <div className="max-sm:col-start-1 max-sm:col-span-3 max-sm:row-start-1 max-sm:row-span-1 max-sm:mb-3 col-start-2 col-end-3  row-span-2 flex flex-col gap-y-4">
          <div className="flex gap-x-4 items-center">
            {userImg ? (
              <img
                src={userImg}
                alt="avatar icon"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <img
                src={userImgAlt}
                alt="avatar icon"
                className="w-10 h-10 rounded-full"
              />
            )}
            <h5 className="text-size-500 font-semibold text-gray-blue-100 first-letter:capitalize">
              {comment.user.username}
            </h5>
            {comment.user.username === currentUser.userName && (
              <span className="bg-blue font-medium text-white text-size-400 p-1 rounded-sm">
                you
              </span>
            )}
            <p className="text-size-400 text-gray-blue-100 font-normal">
              {humanReadableDate(comment.createdAt)}
            </p>
          </div>
          {!isEditing && (
            <p className="text-size-500 text-gray-blue-100 font-meduim">
              {comment.content}
            </p>
          )}
          {isEditing && (
            <div className="flex flex-col gap-y-3">
              <input
                type="text"
                className="w-full py-2 px-3 bg-transparent border-[2px] border-bg-gray-200 rounded-lg h-28 focus:input-outline max-sm:row-start-1 max-sm:row-span-1 col-start-1 col-span-3 md:col-start-2 md:col-span-1"
                onChange={(e) => setEdittedComment(e.target.value)}
              />
              <button
                type="button"
                className="self-end py-4 w-24 h-fit bg-blue text-size-500 font-medium text-white rounded-lg uppercase justify-self-end max-sm:row-start-2 max-sm:row-span-1 col-start-3 col-span-1"
                onClick={() => {
                  editComment(comment.id, edittedComment);
                  setIsEditing(!isEditing);
                }}
              >
                Update
              </button>
            </div>
          )}
        </div>
        <div className="row-start-2 row-span-1 col-start-3 col-span-1 w-fit justify-self-end md:row-start-1 flex gap-x-2 max-sm:items-center">
          {comment.user.username !== currentUser.userName && (
            <button
              className="bg-transparent focus:input-outline p-1 w-24 h-fit flex"
              onClick={() => setIsReplying(!isReplying)}
            >
              <img src={replyIcon} alt="reply icon" className="w-4 h-4 mr-2" />
              <p className="text-size-500 font-semibold text-blue uppercase">
                reply
              </p>
            </button>
          )}
          {comment.user.username === currentUser.userName && (
            <>
              <button
                className="bg-transparent focus:input-outline p-1 w-24 h-fit flex"
                onClick={() => setIsDeleting({ id: comment.id, status: true })}
              >
                <img
                  src={deleteIcon}
                  alt="delete icon"
                  className="w-4 h-4 mr-2"
                />
                <p className="text-size-500 font-semibold text-soft-red uppercase">
                  delete
                </p>
              </button>
              <button
                className="bg-transparent focus:input-outline p-1 w-24 h-fit flex"
                onClick={() => setIsEditing(!isEditing)}
              >
                <img src={editIcon} alt="edit icon" className="w-4 h-4 mr-2" />
                <p className="text-size-500 font-semibold text-blue uppercase">
                  edit
                </p>
              </button>
            </>
          )}
        </div>
      </div>
      {isReplying && (
        <ReplyInput
          id={comment.id}
          comment={comment}
          replyComment={replyComment}
          setIsReplying={setIsReplying}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default CommentList;
