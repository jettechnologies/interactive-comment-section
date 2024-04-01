import { Comments, Replies, UserData } from "../dataModel";

export const initialState = {
    comments: [] as Comments[],
    currentUser: {} as UserData,
};

type Action =
    | { type: "LOAD_COMMENTS"; payload: { comment: Comments[] } }
    | { type: "ADD_COMMENT"; payload: { comment: Comments } }
    | { type: "CREATE_USER"; payload: {user: UserData} }
    | { type: "EDIT_COMMENT"; payload: { id:string ; value: string } }
    | { type: "REPLY_COMMENT"; payload: { id: string ; reply: Replies } }
    | { type: "INCREMENT_SCORE"; payload: { id: string} }
    | { type: "DECREMENT_SCORE"; payload: { id: string } }
    | { type: "DELETE_COMMENT"; payload: { id: string} };

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
    payload?: Action["payload"] & { id: string; value: string },
): typeof initialState => {
    if (!payload || !payload.id || !payload.value) {
        return state;
    }

/**
 * Updates a comment in the state.
 * @param state The current state.
 * @param payload The payload containing the comment and reply IDs, and the new content.
 * @returns The updated state.
 */
const updateComment = (
    state: typeof initialState,
    payload?: Action["payload"] & { id: string; value: string },
): typeof initialState => {
    if (!payload || !payload.id || !payload.value) {
        return state;
    }

    const updateCommentContent = (comments: Comments[]): Comments[] => {
        return comments.map((comment: Comments): Comments => {
            if (comment.id === payload.id) {
                return { ...comment, content: payload.value };
            }
            if (comment.replies) {
                const updatedReplies = updateCommentContent(comment.replies);
                return { ...comment, replies: updatedReplies };
            }
            return comment;
        });
    };

    return {
        ...state,
        comments: updateCommentContent(state.comments),
    };
};
}

const createReply = (
    state: typeof initialState,
    payload?: Action["payload"] & { id: string ; reply: Replies },
): typeof initialState => {
    if (!payload || !payload.id) return state;
    
    const updateContent = (comments: Comments[]): Comments[] => {
        return comments.map(comment => {
            if (comment.id === payload.id) {
                return { ...comment, replies: [...comment.replies,payload.reply] };
            }
            if (comment.replies && comment.replies.length > 0) {
                return { ...comment, replies: updateContent(comment.replies) };
            }
            return comment;
        });
    };

    return {
        ...state,
        comments: updateContent(state.comments),
    };
};

const incrementScore = (
    state: typeof initialState, 
    payload?: Action["payload"] & { id: string },
    ): typeof initialState => {
        if (!payload || !payload.id) return state;
        const updateContent = (comments: Comments[]): Comments[] => {
            return comments.map(comment => {
                if (comment.id === payload.id) {
                    return { ...comment, score: comment.score + 1 };
                }
                if (comment.replies && comment.replies.length > 0) {
                    return { ...comment, replies: updateContent(comment.replies) };
                }
                return comment;
            });
        };
    
        return {
            ...state,
            comments: updateContent(state.comments),
        };
};

const decrementScore = (
    state: typeof initialState, 
    payload?: Action["payload"] & { id: string },
    ): typeof initialState => {
    if (!payload || !payload.id) return state;
    
    const updateContent = (comments: Comments[]): Comments[] => {
        return comments.map(comment => {
            if (comment.id === payload.id) {
                return { ...comment, score: comment.score > 0 ? comment.score - 1 : comment.score };
            }
            if (comment.replies && comment.replies.length > 0) {
                return { ...comment, replies: updateContent(comment.replies) };
            }
            return comment;
        });
    };

    return {
        ...state,
        comments: updateContent(state.comments),
    };
};

const deleteCommentOrReply = (
    state: typeof initialState,
    payload?: Action["payload"] & { id: string },
): typeof initialState => {
    if (!payload || !payload.id) return state;

    const deleteContent = (comments: Comments[]): Comments[] => {
        return comments.filter(comment => {
            if (comment.id === payload.id) {
                // If the current comment matches the ID, remove it
                return false;
            } else if (comment.replies && comment.replies.length > 0) {
                // If the comment has replies, recursively delete them as well
                comment.replies = deleteContent(comment.replies);
            }
            // Keep the comment if it doesn't match the ID
            return true;
        });
    };

    return {
        ...state,
        comments: deleteContent(state.comments),
    };
};



export default commentReducer;

