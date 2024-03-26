import { deleteIcon, editIcon, minusIcon, plusIcon, replyIcon } from "../assets";
import { Replies, UserData } from "../dataModel";
import {  parse, formatDistanceToNow } from 'date-fns';
import { useState, useEffect } from "react"

interface Props{
    reply: Replies
    currentUser: UserData
}

const humanReadableDate = (dateString:string):string =>{
    const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
    const distanceToNow = formatDistanceToNow(parsedDate);
    return distanceToNow;
}


const ReplyList: React.FC<Props> = ({
    reply,
    currentUser
}) => {
    const [userImg, setUserImg] = useState<string>("");

    useEffect(() => {
      const loadImage = async () => {
        try {
            if(reply.user.image.png.includes("images/avatars")){
                const { default: userImage } = await import(reply.user.image.png);
                setUserImg(userImage);

                return
            }
          setUserImg(reply.user.image.png);
        } catch (error) {
          console.error('Error loading image:', error);
        }
      };
  
      loadImage();
  
      return () => {
        setUserImg(""); // Clear image state when component unmounts
      };
    }, [reply.user.image.png]);

  return (
    <div className="w-full py-6 px-4 bg-gray-200 shadow-sm rounded-md grid comment-list">
        <div className="w-32 max-sm:h-[42px] md:w-fit py-2 px-3 row-span-2 max-sm:row-start-2 max-sm:row-span-1 col-start-1 col-end-2 flex md:flex-col bg-gray-100 rounded-2xl h-24 justify-between items-center">
            <button className="bg-transparent focus:input-outline p-1">
                <img src={plusIcon} alt="plus icon" />
            </button>
            <span className="text-size-400 text-blue font-medium">
                {reply.score}
            </span>
            <button className="justify-self-end bg-transparent focus:input-outline p-1">
                <img src={minusIcon} alt="minus icon" />
            </button>
        </div>
        <div className="max-sm:col-start-1 max-sm:col-span-3 max-sm:row-start-1 max-sm:row-span-1 max-sm:mb-3 col-start-2 col-end-3  row-span-2 flex flex-col gap-y-4">
            <div className="flex gap-x-4 items-center">
                <img src={userImg} alt="avatar icon" className = "w-10 h-10 rounded-full" />
                <h5 className="text-size-500 font-semibold text-gray-blue-100"> {reply.user.username}</h5>
                <p className="text-size-400 text-gray-blue-100 font-normal">{humanReadableDate(reply.createdAt)}</p>
            </div>
            <p className="text-size-500 text-gray-blue-100 font-meduim">
                <span className="text-blue font-bold mr-2">@{reply.replyingTo}</span>
                {reply.content}
            </p>
            {/* <input 
                type="text"  
                className="w-full py-2 px-3 bg-transparent border-[2px] border-bg-gray-200 rounded-lg h-full md:h-28 focus:input-outline max-sm:row-start-1 max-sm:row-span-1 col-start-1 col-span-3 md:col-start-2 md:col-span-1"
            /> */}
        </div>
        <div className="row-start-2 row-span-1 col-start-3 col-span-1 w-fit justify-self-end md:row-start-1 flex gap-x-2 max-sm:items-center">
            <button className="bg-transparent focus:input-outline p-1 w-24 h-fit flex">
                <img src={replyIcon} alt="reply icon" className="w-4 h-4 mr-2"/>
                <p className="text-size-500 font-semibold text-blue uppercase">reply</p>
            </button>
            {reply.user.username === currentUser.userName && <><button className="bg-transparent focus:input-outline p-1 w-24 h-fit flex">
                    <img src={deleteIcon} alt="delete icon" className="w-4 h-4 mr-2"/>
                    <p className="text-size-500 font-semibold text-soft-red uppercase">delete</p>
                </button>
                <button className="bg-transparent focus:input-outline p-1 w-24 h-fit flex">
                    <img src={editIcon} alt="edit icon" className="w-4 h-4 mr-2"/>
                    <p className="text-size-500 font-semibold text-blue uppercase">edit</p>
                </button>
            </>}
        </div>
    </div>
  )
}

export default ReplyList