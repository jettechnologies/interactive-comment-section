import CommentInput from "../components/CommentInput"
import Comment from "../components/CommentList"

const CommentSection = () => {
  return (
    <section className = "w-full min-h-screen border-2 border-black bg-gray-100 grid gap-y-5 place-items-center">
      <ul className="w-[90%] lg:w-2/3 h-fit">
        <li className="w-full h-fit">
          <Comment />
        </li>
      </ul>
      <div className="w-[90%] lg:w-2/3 h-fit">
        <CommentInput />
      </div>
    </section>
  )
}

export default CommentSection