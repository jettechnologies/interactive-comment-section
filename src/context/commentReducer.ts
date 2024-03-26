import { Comment, Replies, UserData } from "../dataModel";

export const initialState = {
    comments: [] as Comment[],
    currentUser: {} as UserData,
};

type Action =
    | { type: "LOAD_COMMENTS"; payload: { comment: Comment[] } }
    | { type: "ADD_COMMENT"; payload: { comment: Comment } }
    | { type: "CREATE_USER"; payload: {user: UserData} }
    | { type: "EDIT_COMMENT"; payload: { ids: { comment: number; reply?: number }; value: string } }
    | { type: "REPLY_COMMENT"; payload: { ids: { comment: number }; value: Replies } }
    | { type: "INCREMENT_SCORE"; payload: { ids: { comment: number; reply?: number } } }
    | { type: "DECREMENT_SCORE"; payload: { ids: { comment: number; reply?: number } } }
    | { type: "DELETE_COMMENT"; payload: { ids: { comment: number; reply?: number } } };

const commentReducer = (state = initialState, action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case "LOAD_COMMENTS":
            return { ...state, comments: payload.comment };
        case "ADD_COMMENT":
            return { ...state, comments: [...state.comments, payload.comment] };
        case "CREATE_USER":
            return { ...state, currentUser: payload.user };
        case "EDIT_COMMENT":
            return updateComment(state, payload);
        case "REPLY_COMMENT":
            return createReply(state, payload);
        case "DELETE_COMMENT":
            return deleteCommentOrReply(state, payload);
        case "INCREMENT_SCORE":
            return incrementScore(state, payload);
        case "DECREMENT_SCORE":
            return decrementScore(state, payload);
        default:
            return state;
    }
};

/**
 * Updates a comment in the state.
 * @param state The current state.
 * @param payload The payload containing the comment and reply IDs, and the new content.
 * @returns The updated state.
 */
const updateComment = (
    state: typeof initialState,
    payload?: Action["payload"] & { ids: { comment: number; reply?: number }; value: string },
): typeof initialState => {
    if (!payload || !payload.ids || !payload.value) {
        return state;
    }
    const { comment, reply } = payload.ids;
    if (reply) {
        return {
            ...state,
            comments: state.comments.map((commentItem: Comment) =>
                commentItem.id === comment
                    ? {
                          ...commentItem,
                          replies: commentItem.replies.map((replyItem: Replies) =>
                              replyItem.id === reply ? { ...replyItem, content: payload.value } : replyItem,
                          ),
                      }
                    : commentItem,
            ),
        };
    }

    return {
        ...state,
        comments: state.comments.map((commentItem: Comment) =>
            commentItem.id === comment ? { ...commentItem, content: payload.value } : commentItem,
        ),
    };
};

const createReply = (
    state: typeof initialState,
    payload?: Action["payload"] & { ids: { comment: number }; value: Replies },
): typeof initialState => {
    if (!payload || !payload.ids) return state;
    const { comment } = payload.ids;
    const updatedComments = state.comments.map((commentItem: Comment) => {
        if (commentItem.id === comment) {
            return {
                ...commentItem,
                replies: [...commentItem.replies, payload.value],
            };
        } else {
            return commentItem;
        }
    });
    return { ...state, comments: updatedComments };
};

const incrementScore = (
    state: typeof initialState, 
    payload?: Action["payload"] & { ids: { comment: number, reply?: number } },
    ): typeof initialState => {
        if (!payload || !payload.ids) return state;
        const { comment, reply } = payload.ids;
        const updatedComments = state.comments.map((commentItem: Comment) => {
            if (commentItem.id === comment) {
                const updatedReplies = reply
                    ? commentItem.replies.map((replyItem: Replies) => {
                        if (replyItem.id === reply) {
                            return { ...replyItem, score: replyItem.score + 1 };
                        } else {
                            return replyItem;
                        }
                    })
                    : commentItem.replies;
                return { ...commentItem, replies: updatedReplies };
            } else {
                return commentItem;
            }
        });
        return { ...state, comments: updatedComments };
};

const decrementScore = (
    state: typeof initialState, 
    payload?: Action["payload"] & { ids: { comment: number, reply?: number } },
    ): typeof initialState => {
    if (!payload || !payload.ids) return state;
    const { comment, reply } = payload.ids;
    const updatedComments = state.comments.map((commentItem: Comment) => {
        if (commentItem.id === comment) {
            const updatedReplies = reply
                ? commentItem.replies.map((replyItem: Replies) => {
                      if (replyItem.id === reply) {
                          return { ...replyItem, score: replyItem.score - 1 };
                      } else {
                          return replyItem;
                      }
                  })
                : commentItem.replies;
            return { ...commentItem, replies: updatedReplies };
        } else {
            return commentItem;
        }
    });
    return { ...state, comments: updatedComments };
};

const deleteCommentOrReply = (
    state: typeof initialState, 
    payload?: Action["payload"] & { ids: { comment: number, reply?: number } },
    ): typeof initialState => {
    if (!payload || !payload.ids) return state;
    const { comment, reply } = payload.ids;
    const updatedComments = reply
        ? state.comments.map((commentItem: Comment) => {
              if (commentItem.id === comment) {
                  const updatedReplies = commentItem.replies.filter((replyItem: Replies) => replyItem.id !== reply);
                  return { ...commentItem, replies: updatedReplies };
              } else {
                  return commentItem;
              }
          })
        : state.comments.filter((commentItem: Comment) => commentItem.id !== comment);
    return { ...state, comments: updatedComments };
};

export default commentReducer;

