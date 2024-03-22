import { Comment, CurrentUser, Replies } from "../dataModel";

const initialState = {
    comments: [] as Comment[],
    currentUser: {} as CurrentUser,
};

type Action =
    | { type: "ADD_COMMENT"; payload?: { value: string } }
    | { type: "EDIT_COMMENT"; payload?: { ids: { comment: number; reply?: number }; value: string } }
    | { type: "REPLY_COMMENT"; payload?: { ids: { comment: number }; value: string } }
    | { type: "DELETE_COMMENT"; payload?: { ids: { comment: number; reply?: number } } };

const commentReducer = (state = initialState, action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case "ADD_COMMENT":
            return { ...state, comments: [...state.comments, { id: state.comments.length + 1, content: payload?.value ?? "", replies: [] }] };
        case "EDIT_COMMENT":
            return updateComment(state, payload);
        case "REPLY_COMMENT":
            return updateReply(state, payload);
        case "DELETE_COMMENT":
            return deleteCommentOrReply(state, payload);
        default:
            return state;
    }
};

const updateComment = (state: typeof initialState, payload?: Action["payload"]) => {
    if (!payload || !payload.ids) return state;
    const { comment } = payload.ids;
    return {
        ...state,
        comments: state.comments.map(commentItem =>
            commentItem.id === comment ? { ...commentItem, content: payload.value } : commentItem,
        ),
    };
};

const updateReply = (state: typeof initialState, payload?: Action["payload"]) => {
    if (!payload || !payload.ids) return state;
    const { comment } = payload.ids;
    return {
        ...state,
        comments: state.comments.map(commentItem =>
            commentItem.id === comment
                ? {
                      ...commentItem,
                      replies: [...commentItem.replies, { id: commentItem.replies.length + 1, content: payload.value }],
                  }
                : commentItem,
        ),
    };
};

const deleteCommentOrReply = (state: typeof initialState, payload?: Action["payload"]) => {
    if (!payload || !payload.ids) return state;
    const { comment, reply } = payload.ids;
    return {
        ...state,
        comments: state.comments.map(commentItem =>
            commentItem.id === comment
                ? {
                      ...commentItem,
                      replies: reply ? commentItem.replies.filter(replyItem:Replies => replyItem.id !== reply) : commentItem.replies,
                  }
                : reply
                ? commentItem
                : {
                      ...commentItem,
                      replies: commentItem.replies,
                  },
        ),
    };
};

export default commentReducer;

