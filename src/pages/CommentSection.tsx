import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";
import ReplyList from "../components/ReplyList";
import { Comment, Replies } from "../dataModel";
import useComments from "../context/CommentContext";

const CommentSection = () => {
  const { comments, currentUser, addComment } = useComments();

  
  const commentList = comments.map((comment:Comment)=> (
    <li className="w-full h-fit" key = {comment.id}>
        <CommentList comment={comment} currentUser={currentUser} />
        <ul className="w-fit h-fit flex flex-col gap-y-4 items-end">
          {comment.replies.length > 0 && comment.replies.map((reply:Replies) => {
            return (
              <li className="w-[90%] h-fit first:mt-4" key = {reply.id}>
                <ReplyList reply={reply} currentUser={currentUser} />
              </li>
            )
          })}
        </ul>
      </li>
  ));

  return (
    <section className = "w-full min-h-screen border-2 border-black bg-gray-100 grid gap-y-5 place-items-center py-6">
      <ul className="w-[90%] lg:w-2/3 h-fit flex flex-col gap-y-4">
        {commentList}
      </ul>
      <div className="w-[90%] lg:w-2/3 h-fit">
        <CommentInput addComment = {addComment} currentUser = {currentUser}/>
      </div>
    </section>
  )
}

export default CommentSection