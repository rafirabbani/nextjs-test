import styles from "./Profile.module.css";
import { useState, useEffect, useRef, useMemo } from "react";
export default function Profile({ ...props }) {
  const ref1LeftProfile = useRef(null);
  const ref2LeftProfile = useRef(null);

  const isVisible = useIsInViewport(ref1LeftProfile);
  const isVisible2 = useIsInViewport(ref2LeftProfile);
  // TODO: create profile api call
    // const [profile, setProfile] = useState({});

    // useEffect(() => {
      
    //   setProfile({});
    // }, [props.profile, props.selectedLang]);

  useEffect(() => {
    if (isVisible) {
      console.log('left 1 visible');
    }

    if (isVisible2) {
      console.log('left 2 visible')
    }
  },[isVisible, isVisible2]);  

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileInfo}>
        <div className={styles.profileDivider}>
            {/* TODO: create entry animation when element inside viewport and exit animation when element outside */}
          <div className={styles.profileInfoLeft}>
            <div ref={ref1LeftProfile} className={styles.profileInfoLeft_1}>
              For business inquiries, I accept work for games, light novels,
              illustration books, exhibitions, album/EP art, music videos,
              official merch/goods and promotional art.
            </div>
            <div ref={ref2LeftProfile} className={styles.profileInfoLeft_2}>
              Please provide the following in your email Project Name,
              Production Content, Schedule, and Budget I accept individual and
              personal commission
            </div>
          </div>
          <div className={styles.profileInfoRight}>
            Contact
            <div className={styles.email}>email info</div>
            <div className={styles.twitter}>twwitter info</div>
            <div className={styles.insta}>ig info</div>
          </div>
        </div>
        <div className={styles.profileOtherPlatform}>
          pixiv, fantia, patreon?, ko-fi?, halu-app?
        </div>
      </div>
    </div>
  );
}

function useIsInViewport(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    [],
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
