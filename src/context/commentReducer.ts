import { Comment, UserData } from "../dataModel";

export const initialState = {
    comments: [] as Comment[],
    currentUser: {} as UserData,
};

type Action =
    | { type: "LOAD_COMMENTS"; payload: { comment: Comment[] } }
    | { type: "ADD_COMMENT"; payload: { comment: Comment } }
    | { type: "CREATE_USER"; payload: {user: UserData} }
    | { type: "EDIT_COMMENT"; payload: { ids: { comment: number; reply?: number }; value: string } }
    | { type: "REPLY_COMMENT"; payload: { ids: { comment: number }; value: string } }
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

const updateComment = (state: typeof initialState, payload?: Action["payload"]) => {
    if (!payload || !payload.ids) return state;
    const { comment, reply } = payload.ids;
    if(reply){
        return {
            ...state,
            comments: state.comments.map(commentItem =>
                commentItem.id === comment
                    ? {
                          ...commentItem,
                          replies: state.comments[comment].replies.map(replyItem =>
                              replyItem.id === reply ? { ...replyItem, content: payload.value } : replyItem);
                      }
                    : commentItem,
            ),
        };
    }

    return {
        ...state,
        comments: state.comments.map(commentItem =>
            commentItem.id === comment ? { ...commentItem, content: payload.value } : commentItem,
        ),
    };
};

const createReply = (state: typeof initialState, payload?: Action["payload"]) => {
    if (!payload || !payload.ids) return state;
    const { comment } = payload.ids;
    return {
        ...state,
        comments: state.comments.map(commentItem =>
            commentItem.id === comment
                ? {
                      ...commentItem,
                      replies: [...commentItem.replies, payload.value],
                  }
                : commentItem,
        ),
    };
};

const incrementScore = (state: typeof initialState, payload?: Action["payload"]) => {
    if (!payload || !payload.ids) return state;
    const { comment, reply } = payload.ids;
    if(reply){
        return {
            ...state,
            comments: state.comments.map(commentItem =>
                commentItem.id === comment
                    ? {
                          ...commentItem,
                          replies: state.comments[comment].replies.map(replyItem =>
                              replyItem.id === reply ? { ...replyItem, score: replyItem.score + 1 } : replyItem),
                      }
                    : commentItem,
            ),
        };
    }

    return {
        ...state,
        comments: state.comments.map(commentItem =>
            commentItem.id === comment
                ? {
                      ...commentItem,
                      score: commentItem.score + 1 
                  }
                : commentItem,
        ),
    };
}

const decrementScore = (state: typeof initialState, payload?: Action["payload"]) => {
    if (!payload || !payload.ids) return state;
    const { comment, reply } = payload.ids;
    if(reply){
        return {
            ...state,
            comments: state.comments.map(commentItem =>
                commentItem.id === comment
                    ? {
                          ...commentItem,
                          replies: state.comments[comment].replies.map(replyItem =>
                              replyItem.id === reply ? { ...replyItem, score: replyItem.score - 1 } : replyItem),
                      }
                    : commentItem,
            ),
        };
    }

    return {
        ...state,
        comments: state.comments.map(commentItem =>
            commentItem.id === comment
                ? {
                      ...commentItem,
                      score: commentItem.score - 1
                  }
                : commentItem,
        ),
    };
}

// const deleteCommentOrReply = (state: typeof initialState, payload?: Action["payload"]) => {
//     if (!payload || !payload.ids) return state;
//     const { comment, reply } = payload.ids;
//     return {
//         ...state,
//         comments: state.comments.map(commentItem =>
//             commentItem.id === comment
//                 ? {
//                       ...commentItem,
//                       replies: reply ? commentItem.replies.filter(replyItem => replyItem.id !== reply) : commentItem.replies,
//                   }
//                 : reply
//                 ? commentItem
//                 : {
//                       ...commentItem,
//                       replies: commentItem.replies,
//                   },
//         ),
//     };
// };

const deleteCommentOrReply = (state: typeof initialState, payload?: Action["payload"]) => {
    if (!payload || !payload.ids) return state;
    const { comment, reply } = payload.ids;

    if(reply){
        return {
                ...state,
                comments: state.comments.map(commentItem =>
                    commentItem.id === comment
                        ? {
                            ...commentItem,
                            replies: reply ? commentItem.replies.filter(replyItem => replyItem.id !== reply) : commentItem.replies,
                        }
                        : commentItem)
        }
    }

    return {
        ...state,
        comments: state.comments.filter(commentItem => commentItem.id !== comment)
    }
}

export default commentReducer;

