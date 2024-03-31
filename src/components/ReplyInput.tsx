import { useState } from "react";
import { UserData, Replies, Comments } from "../dataModel"
import { nanoid } from "nanoid";

interface Props {
  replyComment: (id: string, reply: Replies) => void;
  comment?: Comments;
  reply?: Replies;
  id: string;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: UserData;
}

const ReplyInput:React.FC<Props> = ({
  replyComment,
  id,
  comment,
  reply,
  setIsReplying,
  currentUser
}) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentUpload = () => {
    const currentDate = new Date(Date.now());
    const formattedDateString = currentDate.toISOString().split("T")[0];
    const userImg = currentUser?.imgUrl && currentUser.imgUrl;

    comment && console.log(comment);
    reply && console.log(reply);

    if (reply) {
      const newComment = {
        id: nanoid(),
        content: commentText,
        createdAt: formattedDateString,
        score: 0,
        replyingTo: reply.user.username,
        user:{
          image: {
            png: userImg,
          },
          username: currentUser.userName,
        },     
      }

        console.log(newComment)

        replyComment(id , newComment);
      }
      else if(comment){
        const newComment = {
          id: nanoid(),
          content: commentText,
          createdAt: formattedDateString,
          score: 0,
          replyingTo: comment.user.username,
          user:{
            image: {
              png: userImg,
            },
            username: currentUser.userName,
          },   
          replies: [],  
        }

        console.log(newComment)

        replyComment(id , newComment);
      }

    setIsReplying(false);
  }

  return (
    <div className="w-full py-6 px-4 bg-gray-200 shadow-sm rounded-md grid comment-input gap-x-3">
        <img src={currentUser.imgUrl} alt="avatar icon" className = "w-10 h-10 rounded-full max-sm:row-start-2 max-sm:row-span-1 col-start-1 col-span-1" />
        <input 
            type="text" 
            placeholder="Add a comment" 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full py-2 px-3 bg-transparent border-[2px] border-bg-gray-200 rounded-lg h-full md:h-28 focus:input-outline max-sm:row-start-1 max-sm:row-span-1 col-start-1 col-span-3 md:col-start-2 md:col-span-1"
        />
        <button 
          type="button" 
          className="py-4 w-24 h-fit bg-blue text-size-500 font-medium text-white rounded-lg uppercase justify-self-end max-sm:row-start-2 max-sm:row-span-1 col-start-3 col-span-1"
          onClick={handleCommentUpload}>Send</button>
    </div>
  )
}

export default ReplyInput;