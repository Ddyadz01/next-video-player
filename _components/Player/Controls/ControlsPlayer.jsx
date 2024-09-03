'use client';

import { Fullscreen, Pause, PlayIcon } from 'lucide-react';
import { TbPlayerTrackPrev, TbPlayerTrackNext } from 'react-icons/tb';
import { IoVolumeHigh } from 'react-icons/io5';
import './controls.scss';

const ControlsPlayer = ({
  isPlaying,
  videoRef,
  togglePlaying,
  toggleSkip,
  changeVolume,
  volume,
}) => {
  return (
    <div className="controls">
      <div className="controls--left">
        <IoVolumeHigh size={18} />
        <div className="volume" onClick={changeVolume}>
          <div className="volume-opacity"></div>
          <div className="volume-bar" style={{ width: `${volume * 100}` + '%' }}></div>
        </div>
      </div>
      <div className="controls--center">
        <span className="prev" onClick={() => toggleSkip('prev')}>
          <TbPlayerTrackPrev size={18} />
        </span>
        <span className="play" onClick={togglePlaying}>
          {isPlaying ? <Pause size={30} /> : <PlayIcon size={30} />}
        </span>
        <span className="next" onClick={() => toggleSkip('next')}>
          <TbPlayerTrackNext size={20} />
        </span>
      </div>
      <div className="controls--right">
        <Fullscreen
          style={{ cursor: 'pointer' }}
          onClick={() => videoRef.current.requestFullscreen()}
        />
      </div>
    </div>
  );
};

export default ControlsPlayer;
