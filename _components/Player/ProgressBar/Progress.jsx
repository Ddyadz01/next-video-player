import './progress.scss';
const Progress = ({ progress, clickProgress }) => {
  return (
    <>
      <div className="progress-line" onClick={clickProgress} />
      <div className="progress">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </>
  );
};

export default Progress;
