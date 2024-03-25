import { createContext, useCallback, useContext, useReducer, useEffect } from "react";
import commentReducer, {initialState} from "./commentReducer";
import { useLocalStorage } from "../useLocalStorage";
import { Comment, UserData } from "../dataModel";
import { parse } from 'date-fns';
import data from "../data";

interface LocalStorageData {
    currentUser: UserData;
    comments: Comment[];
}

interface CommentContextType {
    comments: Comment[],
    currentUser: UserData,
    addComment: (comment:Comment) => void;
    // editComment: (ids: { comment: number; reply?: number }, value: string) => void;
    createUser: (user: UserData) => void;
}


const CommentContext  = createContext<CommentContextType | null>(null);

export const CommentProvider: React.FC<{children: React.ReactNode}> =  ({ children }) => {
    const [state, dispatch] = useReducer(commentReducer, initialState);
    const { setItem } = useLocalStorage("comments", []);

    useEffect(() =>{
        const localStorage: string | null = window.localStorage.getItem("comments");
        let localStorageData = "";

        // check to ensure that the localStorage is not empty
        localStorage !== null ? localStorageData = JSON.parse(localStorage) : localStorageData = "";  
    
        if(!localStorageData){
            const updatedResult = data.comments.map(comment => {
                return{
                    ...comment,
                    createdAt: parse(comment.createdAt, 'yyyy-MM-dd', new Date()).toString(),
                    replies: comment.replies.length > 0 && comment.replies.map(reply => {
                        return {
                            ...reply,
                            createdAt: parse(reply.createdAt, 'yyyy-MM-dd', new Date()).toString()
                        };
                    })
                    
                }
            });
            console.log(updatedResult);
            const resultObj = {currentUser: state.currentUser , comments: updatedResult}
            console.log(resultObj);
            
            setItem(resultObj);
         }
         else{
            setItem(localStorageData);
         }
    }, [setItem, state.currentUser]);

    useEffect(() =>{
        const localStorage: string | null = window.localStorage.getItem("comments");
        let localStorageData: LocalStorageData | undefined;

        // check to ensure that the localStorage is not empty
        localStorage !== null ? localStorageData = JSON.parse(localStorage) : localStorageData = undefined;    
        
        
    
        if(localStorageData){
            const {currentUser, comments} = localStorageData;
    
            dispatch({
                type: "CREATE_USER",
                payload: {user: currentUser},
            });
    
            // if statement for setting the comments object
            if(comments.length > 0){
                dispatch({
                    type: "LOAD_COMMENTS",
                    payload: {comment: comments},
                });
            }
        }
            
    },[]);

    const addComment = useCallback((comment: Comment) => {
        dispatch({ type: "ADD_COMMENT", payload: { comment } });
    }, []);

    const createUser = useCallback((user: UserData) => {
        dispatch({ type: "CREATE_USER", payload: { user } });
    }, [])

    const value = {
        comments: state.comments,
        currentUser: state.currentUser,
        addComment,
        createUser,
    };
    
    return (
        <CommentContext.Provider value={value}>
            {children}
        </CommentContext.Provider>
    );
};


const useComments = () => {
    const context = useContext(CommentContext);
  
    if (context === undefined) {
      throw new Error("useTodo must be used within TodoContext");
    }
    
        return context;
    };
  
  export default useComments;
