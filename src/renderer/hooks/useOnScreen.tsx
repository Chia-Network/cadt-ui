import { useEffect, useState } from 'react';

function useOnScreen(ref) {
    const [isIntersecting, setIntersecting] = useState(false);
  
    useEffect(() => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      );

      console.log(ref.current);
  
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }, [ref]);
  
    return isIntersecting;
  }


export { useOnScreen };
