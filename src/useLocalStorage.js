export const useLocalStorage = (key) => {
    const setItem = (value) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    };
  
    return { setItem};
  };