'use client';

import { usePlayer } from '@/hooks/usePlayer';
import { TimeFormater } from '@/utils/TimeFormater';
import Progress from './ProgressBar/Progress';
import ControlsPlayer from './Controls/ControlsPlayer';
import PlayIconPlayer from './PlayIconPlayer';

import './player.scss';

const Player = ({ src }) => {
  const {
    togglePlaying,
    toggleSkip,
    videoRef,
    isPlaying,
    progress,
    originalDuration,
    clickProgress,
    currentTime,
    changeVolume,
    volume,
  } = usePlayer();
  return (
    <div className="player">
      <div className="video" onClick={togglePlaying}>
        {!isPlaying && <PlayIconPlayer />}
        <video
          ref={videoRef}
          src={src}
          preload="auto"
          poster="https://avatars.mds.yandex.net/i?id=dae102099529da130c353d2e265dc544015a8761cfefa9e3-12624456-images-thumbs&n=13"
        />
      </div>

      <div className={isPlaying ? 'controls--block' : 'controls--block active'}>
        {videoRef.current?.currentTime !== videoRef.current?.duration && (
          <>
            <Progress progress={progress} clickProgress={clickProgress} />
            <div className="controls-row" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="time-line">
                <div>{TimeFormater(currentTime)} </div>
                <div>{TimeFormater(originalDuration)}</div>
              </div>
              <ControlsPlayer
                togglePlaying={togglePlaying}
                volume={volume}
                toggleSkip={toggleSkip}
                videoRef={videoRef}
                isPlaying={isPlaying}
                changeVolume={changeVolume}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Player;
