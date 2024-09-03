import { useEffect, useRef, useState } from 'react';

export const usePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef();

  const togglePlaying = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleSkip = (action) => {
    if (!videoRef.current) return;
    if (action === 'next') videoRef.current.currentTime += 5;
    if (action === 'prev') videoRef.current.currentTime -= 5;
  };

  const [originalDuration, setOriginalDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = videoRef.current?.duration;
    if (duration) setOriginalDuration(duration);
  }, [videoRef.current?.duration]);

  useEffect(() => {
    const updateProgress = () => {
      if (!videoRef.current) return;
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / originalDuration) * 100);
    };

    if (videoRef.current?.currentTime === videoRef.current?.duration) setIsPlaying(!isPlaying);

    videoRef.current?.addEventListener('timeupdate', updateProgress);

    return () => {
      videoRef.current?.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentTime, originalDuration]);

  const clickProgress = (e) => {
    if (!videoRef.current) return;
    const width = e.target.offsetWidth;
    const click = e.nativeEvent.layerX;
    setProgress((click / width) * 100);
    // setCurrentTime(videoRef.current.duration * (click / width));
    videoRef.current.currentTime = videoRef.current?.duration * (click / width);
  };

  const [volume, setVolume] = useState(1);

  const changeVolume = (e) => {
    const widthVolume = e.target.offsetWidth;
    const clickVolume = e.nativeEvent.layerX;
    setVolume(((clickVolume / widthVolume) * 100) / 100);
    videoRef.current.volume = ((clickVolume / widthVolume) * 100) / 100;
  };

  return {
    togglePlaying,
    toggleSkip,
    videoRef,
    isPlaying,
    currentTime,
    progress,
    originalDuration,
    setProgress,
    clickProgress,
    changeVolume,
    volume,
  };
};
