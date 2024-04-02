/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useEffect,
} from "react";
import commentReducer, { initialState } from "./commentReducer";
import useLocalStorage from "./useLocalStorage";
import { Comments, UserData, LocalStorageData, Replies } from "../dataModel";
import { format, sub } from "date-fns";
import { nanoid } from "nanoid";
import isEqual from "lodash/isEqual";
import data from "../data";

interface CommentContextType {
  comments: Comments[];
  currentUser: UserData;
  addComment: (comment: Comments) => void;
  replyComment: (id: string, value: Replies) => void;
  editComment: (id: string, value: string) => void;
  deleteComment: (id: string) => void;
  createUser: (user: UserData) => void;
  scoreIncrementOrDecrement: (id: string, type: string) => void;
}

const CommentContext = createContext<CommentContextType | null>(null);

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);
  const { setItem } = useLocalStorage("comments");

  // Function to parse and format human-readable date expressions
  const parseAndFormat = (
    dateExpression: string,
    formatString: string
  ): string => {
    if (!dateExpression || typeof dateExpression !== "string") {
      return ""; // or handle the case appropriately
    }
    const expressionParts = dateExpression?.split(" ");
    const quantity = parseInt(expressionParts[0]);
    console.log(quantity, expressionParts[1]);
    const unit = expressionParts[1];
    const currentDate = new Date();
    const pastDate = sub(currentDate, { [unit + "s"]: quantity });
    return format(pastDate, formatString);
  };

  useEffect(() => {
    const localStorage: string | null = window.localStorage.getItem("comments");
    let localStorageData = "";

    // check to ensure that the localStorage is not empty
    localStorage !== null
      ? (localStorageData = JSON.parse(localStorage))
      : (localStorageData = "");

    if (!localStorageData) {
      const updatedResult = data.comments.map((comment) => {
        return {
          ...comment,
          id: nanoid(),
          createdAt: parseAndFormat(comment.createdAt, "yyyy-MM-dd"),
          replies:
            comment.replies.length > 0
              ? comment.replies.map((reply) => {
                  return {
                    ...reply,
                    createdAt: parseAndFormat(reply.createdAt, "yyyy-MM-dd"),
                  };
                })
              : comment.replies,
        };
      });
      console.log(updatedResult);
      const resultObj = {
        currentUser: state.currentUser,
        comments: updatedResult,
      };
      console.log(resultObj);

      setItem(resultObj);
    } else {
      setItem(localStorageData);
    }
  }, [setItem, state.currentUser]);

  // Here is a useEffect for handling the logging of data from the localstorage to the local states provided
  useEffect(() => {
    const localStorage: string | null = window.localStorage.getItem("comments");
    let localStorageData: LocalStorageData | undefined;

    // check to ensure that the localStorage is not empty
    localStorage !== null
      ? (localStorageData = JSON.parse(localStorage))
      : (localStorageData = undefined);

    if (localStorageData) {
      let timeDiff: number;
      const { currentUser, comments } = localStorageData;
      const loginDate = currentUser?.createdAt?.split("T")[0];
      const currentTime = Date.now();
      timeDiff = Math.abs(
        (currentTime - Date.parse(loginDate)) / (1000 * 60 * 60 * 24)
      );
      timeDiff = Math.floor(timeDiff);

      console.log(timeDiff);

      if (timeDiff > 3) {
        const localStorageObj = { currentUser: {}, comments };
        console.log(localStorageObj);
        // setItem(localStorageObj);
        window.localStorage.setItem(
          "comments",
          JSON.stringify(localStorageObj)
        );
      }

      // conditional to check if the current user object is not empty
      const isNotEmpty = Object.entries(currentUser).length !== 0;

      if (isNotEmpty) {
        dispatch({
          type: "CREATE_USER",
          payload: { user: currentUser },
        });
      }

      // if statement for setting the comments object
      if (comments.length > 0) {
        dispatch({
          type: "LOAD_COMMENTS",
          payload: { comment: comments },
        });
      }
    }
  }, []);

  // useEffect to check if the object been stored in localstorage is the equals as the local state
  useEffect(() => {
    const localStorage: string | null = window.localStorage.getItem("comments");
    let localStorageData: LocalStorageData | undefined;

    // check to ensure that the localStorage is not empty
    localStorage !== null
      ? (localStorageData = JSON.parse(localStorage))
      : (localStorageData = undefined);

    if (localStorageData) {
      const { comments } = localStorageData;

      const isDataEqual = isEqual(comments, state.comments);

      if (!isDataEqual) {
        localStorageData = { ...localStorageData, comments: state.comments };
        setItem(localStorageData);
      }
    }
  }, [setItem, state.comments]);

  const addComment = useCallback((comment: Comments) => {
    dispatch({ type: "ADD_COMMENT", payload: { comment } });
  }, []);

  const createUser = useCallback(
    (user: UserData) => {
      dispatch({ type: "CREATE_USER", payload: { user } });

      console.log(user);

      const updatedState = {
        currentUser: user,
        comments: state.comments,
      };

      setItem(updatedState);
    },
    [state.comments, setItem]
  );

  const replyComment = useCallback((id: string, reply: Replies) => {
    dispatch({ type: "REPLY_COMMENT", payload: { id, reply } });
  }, []);

  const editComment = useCallback(
    (id: string, value: string) => [
      dispatch({
        type: "EDIT_COMMENT",
        payload: { id, value },
      }),
    ],
    []
  );

  const deleteComment = useCallback(
    (id: string) => [
      dispatch({
        type: "DELETE_COMMENT",
        payload: { id },
      }),
    ],
    []
  );

  const scoreIncrementOrDecrement = useCallback((id: string, type: string) => {
    if (type === "increment") {
      dispatch({ type: "INCREMENT_SCORE", payload: { id } });
    } else if (type === "decrement") {
      dispatch({ type: "DECREMENT_SCORE", payload: { id } });
    }
  }, []);

  const value = {
    comments: state.comments,
    currentUser: state.currentUser,
    addComment: addComment,
    createUser: createUser,
    replyComment,
    editComment,
    deleteComment,
    scoreIncrementOrDecrement,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};

const useComments = () => {
  const context = useContext(CommentContext);

  if (context === undefined || context === null) {
    throw new Error("useComments must be used within TodoContext");
  }

  return context;
};

export default useComments;
