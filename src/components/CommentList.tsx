import { deleteIcon, editIcon, minusIcon, plusIcon, replyIcon } from "../assets";
import amyrobsonImg from "../assets/avatars/image-amyrobson.png";

const CommentList = () => {
  return (
    <div className="w-full py-6 px-4 bg-gray-200 shadow-sm rounded-md grid comment-list">
        <div className="w-32 max-sm:h-[42px] md:w-fit py-2 px-3 row-span-2 max-sm:row-start-2 max-sm:row-span-1 col-start-1 col-end-2 flex md:flex-col bg-gray-100 rounded-2xl h-24 justify-between items-center">
            <button className="bg-transparent focus:input-outline p-1">
                <img src={plusIcon} alt="plus icon" />
            </button>
            <span className="text-size-400 text-blue font-medium">
                12
            </span>
            <button className="justify-self-end bg-transparent focus:input-outline p-1">
                <img src={minusIcon} alt="minus icon" />
            </button>
        </div>
        <div className="max-sm:col-start-1 max-sm:col-span-3 max-sm:row-start-1 max-sm:row-span-1 max-sm:mb-3 col-start-2 col-end-3  row-span-2 flex flex-col gap-y-4">
            <div className="flex gap-x-4 items-center">
                <img src={amyrobsonImg} alt="avatar icon" className = "w-10 h-10 rounded-full" />
                <h5 className="text-size-500 font-semibold text-gray-blue-100"> amyrobson</h5>
                <p className="text-size-400 text-gray-blue-100 font-normal">1 month ago</p>
            </div>
            <p className="text-size-500 text-gray-blue-100 font-meduim">
                <span className="text-blue font-bold mr-2">@amyrobson</span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, ullam. Aspernatur laborum maxime vitae at quos praesentium asperiores ratione exercitationem.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, illum. Aliquam eaque exercitationem veniam eos temporibus! At dignissimos delectus beatae magni nisi illum consequuntur excepturi.
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
            {/* <button className="bg-transparent focus:input-outline p-1 w-24 h-fit flex">
                <img src={deleteIcon} alt="delete icon" className="w-4 h-4 mr-2"/>
                <p className="text-size-500 font-semibold text-soft-red uppercase">delete</p>
            </button>
            <button className="bg-transparent focus:input-outline p-1 w-24 h-fit flex">
                <img src={editIcon} alt="edit icon" className="w-4 h-4 mr-2"/>
                <p className="text-size-500 font-semibold text-blue uppercase">edit</p>
            </button> */}
        </div>
    </div>
  )
}

export default CommentList