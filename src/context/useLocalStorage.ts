const useLocalStorage = (key:string ) => {
    const setItem = (value:any) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    };
  
    return { setItem};
  };

export default useLocalStorage;