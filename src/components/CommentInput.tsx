import { useState } from "react";
import { UserData, Comment } from "../dataModel"

interface Props {
  addComment: (comment:Comment) => void;
  currentUser: UserData;
}

const CommentInput:React.FC<Props> = ({
  addComment,
  currentUser
}) => {
  const [comment, setComment] = useState("");

  const handleCommentUpload = () => {
    const currentDate = new Date(Date.now());
    const formattedDateString = currentDate.toISOString().split("T")[0];

    const userImg = currentUser.imgUrl && currentUser.imgUrl;

    const newComment = {
      id: 0,
      content: comment,
      createdAt: formattedDateString,
      score: 0,
      user:{
        image: {
          png: userImg,
        },
        username: currentUser.userName,
      },
      replies: [],      
    }

    console.log(newComment)

    addComment(newComment);
  }

  return (
    <div className="w-full py-6 px-4 bg-gray-200 shadow-sm rounded-md grid comment-input gap-x-3">
        <img src={currentUser.imgUrl} alt="avatar icon" className = "w-10 h-10 rounded-full max-sm:row-start-2 max-sm:row-span-1 col-start-1 col-span-1" />
        <input 
            type="text" 
            placeholder="Add a comment" 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full py-2 px-3 bg-transparent border-[2px] border-bg-gray-200 rounded-lg h-full md:h-28 focus:input-outline max-sm:row-start-1 max-sm:row-span-1 col-start-1 col-span-3 md:col-start-2 md:col-span-1"
        />
        <button 
          type="button" 
          className="py-4 w-24 h-fit bg-blue text-size-500 font-medium text-white rounded-lg uppercase justify-self-end max-sm:row-start-2 max-sm:row-span-1 col-start-3 col-span-1"
          onClick={handleCommentUpload}>Send</button>
    </div>
  )
}

export default CommentInput