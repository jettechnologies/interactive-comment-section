import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";
import ReplyList from "../components/ReplyList";
import Modal from "../components/Modal";
import { Comments, Replies } from "../dataModel";
import useComments from "../context/CommentContext";
import { useState } from "react";

const CommentSection = () => {
  const [isDeleting, setIsDeleting] = useState({
    id: "",
    status: false,
  });

  const { comments, currentUser, addComment, deleteComment } = useComments();

  const sortedComment: Comments[] = [...comments].sort(
    (a: Comments, b: Comments) => b.score - a.score
  );

  const commentList = sortedComment.map((comment: Comments) => (
    <li className="w-full h-fit" key={comment.id}>
      <CommentList
        setIsDeleting={setIsDeleting}
        comment={comment}
        currentUser={currentUser}
      />
      <ul className="h-fit flex flex-col gap-y-4 items-end">
        {
          //the code ([...comment.replies].sort((a:Replies, b:Replies) => b.score - a.score)) is used to order the score for the replies too
          comment.replies.length > 0 &&
            [...comment.replies]
              .sort((a: Replies, b: Replies) => b.score - a.score)
              .map((reply: Replies) => {
                return (
                  <li className="w-[90%] h-fit first:mt-4" key={reply.id}>
                    <ReplyList
                      reply={reply}
                      currentReply={reply}
                      currentUser={currentUser}
                      setIsDeleting={setIsDeleting}
                    />
                    <ul className="h-fit flex flex-col gap-y-4 items-end">
                      {
                        //the code ([...reply.replies].sort((a:Replies, b:Replies) => b.score - a.score)) is used to order the score for the replies too
                        reply.replies &&
                          reply.replies.length > 0 &&
                          [...reply.replies]
                            .sort((a: Replies, b: Replies) => b.score - a.score)
                            .map((reply: Replies) => {
                              return (
                                <li
                                  className="w-[90%] h-fit first:mt-4"
                                  key={reply.id}
                                >
                                  <ReplyList
                                    reply={reply}
                                    currentUser={currentUser}
                                    setIsDeleting={setIsDeleting}
                                  />
                                </li>
                              );
                            })
                      }
                    </ul>
                  </li>
                );
              })
        }
      </ul>
    </li>
  ));

  return (
    <section className="w-full min-h-screen border-2 border-black bg-gray-100 grid gap-y-5 place-items-center py-6">
      <ul className="w-[90%] lg:w-2/3 h-fit flex flex-col gap-y-4">
        {commentList}
      </ul>
      <div className="w-[90%] lg:w-2/3 h-fit">
        <CommentInput addComment={addComment} currentUser={currentUser} />
      </div>

      {/* <div className="absolute border-2 border-pink-400 inset-0 flex justify-center items-center h-full bg-black opacity-35 z-10">
        <div className="w-[23rem] h-24 border-2 border-black pt-6 pb-2 px-4  rounded-md bg-white flex flex-col items-center gap-y-4 relative z-40">

        </div>
      </div> */}
      <Modal
        open={isDeleting.status}
        onClose={() => setIsDeleting({ ...isDeleting, status: false })}
      >
        <div className="w-[20rem] p-6">
          <div className="w-full mb-4">
            <h3 className="text-size-500 font-black text-black mb-2">
              Delete comment
            </h3>
            <p className="text-size-400 text-gray-blue-100 font-medium">
              Are you sure you want to delete this comment? this will remove
              this comment and it would be undone.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="py-2 h-fit bg-gray-blue-100 text-size-500 font-medium text-white rounded-lg uppercase w-full"
              onClick={() => setIsDeleting({ ...isDeleting, status: false })}
            >
              Cancel
            </button>
            <button
              className="w-full py-2 h-fit bg-soft-red text-size-500 font-medium text-white rounded-lg uppercase"
              onClick={() => {
                deleteComment(isDeleting.id);
                setIsDeleting({ id: "", status: false });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default CommentSection;
