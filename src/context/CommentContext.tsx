/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useReducer, useEffect } from "react";
import commentReducer, {initialState} from "./commentReducer";
import useLocalStorage from "./useLocalStorage";
import { Comment, UserData, LocalStorageData } from "../dataModel";
import { format, sub } from 'date-fns';
import data from "../data";

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

    // Function to parse and format human-readable date expressions
    const parseAndFormat = (dateExpression:string, formatString:string):string => {
        const expressionParts = dateExpression.split(' ');
        const quantity = parseInt(expressionParts[0]);
        console.log(quantity, expressionParts[1]);
        const unit = expressionParts[1];
        const currentDate = new Date();
        const pastDate = sub(currentDate, { [unit + 's']: quantity });
        return format(pastDate, formatString);
    }

    
// const parseAndFormat = (dateExpression: string, formatString: string): string => {
//     const expressionParts = dateExpression.split(' ');
//     const quantity = parseInt(expressionParts[0]);
//     const unit = expressionParts[1];
//     const currentDate = new Date();

//     let pastDate;

//     // Calculate the past date based on the provided unit
//     if (unit === 'month') {
//         pastDate = sub(currentDate, { months: quantity });
//     } else if (unit === 'day') {
//         pastDate = sub(currentDate, { days: quantity });
//     } else if (unit === 'hour') {
//         pastDate = sub(currentDate, { hours: quantity });
//     } else if (unit === 'minute') {
//         pastDate = sub(currentDate, { minutes: quantity });
//     } else {
//         throw new Error('Invalid unit provided');
//     }

//     // Format the past date using the provided format string
//     return format(pastDate, formatString);
// };

    useEffect(() =>{
        const localStorage: string | null = window.localStorage.getItem("comments");
        let localStorageData = "";

        // check to ensure that the localStorage is not empty
        localStorage !== null ? localStorageData = JSON.parse(localStorage) : localStorageData = "";  
    
        if(!localStorageData){
            const updatedResult = data.comments.map(comment => {
                return{
                    ...comment,
                    createdAt: parseAndFormat(comment.createdAt, 'yyyy-MM-dd'),
                    replies: comment.replies.length > 0 && comment.replies.map(reply => {
                        return {
                            ...reply,
                            createdAt: parseAndFormat(reply.createdAt, 'yyyy-MM-dd')
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

    console.log(state.comments)
    // Here is a useEffect for handling the logging of data from the localstorage to the local states provided

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
        const lastId = state.comments[state.comments.length - 1].id;
        const currentId: number = lastId + 1;
        comment.id = currentId;
        console.log(comment);
        dispatch({ type: "ADD_COMMENT", payload: { comment } });

        const updatedState = {
            currentUser: state.currentUser,
            comments: [...state.comments, comment],
        };

        setItem(updatedState)
    }, [state.comments, setItem, state.currentUser]);

    const createUser = useCallback((user: UserData) => {
        dispatch({ type: "CREATE_USER", payload: { user } });

        console.log(user);

        const updatedState = {
            currentUser: user,
            comments: state.comments,
        };

        setItem(updatedState)

    }, [state.comments, setItem])

    const value = {
        comments: state.comments,
        currentUser: state.currentUser,
        addComment: addComment,
        createUser: createUser,
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
      throw new Error("useComments must be used within TodoContext");
    }
    
        return context;
    };
  
  export default useComments;
