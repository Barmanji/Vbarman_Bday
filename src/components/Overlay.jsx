
import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";

export const Overlay = ({ onExplore }) => {  // Accept the `onExplore` prop
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">
            Happy BirthDay!
            <div className="spinner">
              <div className="spinner__image" />
            </div>
          </h1>
          <p className="intro__scroll">Scroll to begin the journey</p>
          <button
            className="explore"
            onClick={() => {
              setPlay(true); // Continue setting play state
              if (onExplore) {
                onExplore();  // Trigger the `onExplore` prop function when "Explore" is clicked
              }
            }}
          >
            Explore
          </button>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text">XXX -add your line if you want(deleted for privacy)- XXX.</p>
      </div>
    </div>
  );
};
