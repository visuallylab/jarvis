import useWindowScroll from '@/hooks/useWindowScroll';
import { useRef, useEffect, useState } from 'react';
export const useVideController = () => {
  const { y } = useWindowScroll();
  const container = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (container.current && player.current) {
      if (
        y > container.current.offsetTop - container.current.offsetHeight / 2 &&
        y < container.current.offsetTop + container.current.offsetHeight / 2
      ) {
        player.current.play();
        setIsPlaying(true);
      } else {
        player.current.pause();
        setIsPlaying(false);
      }
    }
  }, [y]);
  return { isPlaying, container, player };
};
