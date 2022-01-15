import { useState, useEffect } from 'react';



const useKeyPress = (callback: (arg0: any) => any) => {
  const [keyPressed, setKeyPressed] = useState<String>();

  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      if (keyPressed !== e.key && e.key.length === 1) {
        setKeyPressed(e.key);
        callback && callback(e.key);
      }
    };
    const upHandler = () => {
      setKeyPressed(undefined);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      //7
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });
  //8
  return keyPressed;
};

export default useKeyPress;