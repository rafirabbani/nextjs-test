import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
export default function Profile({ ...props }) {

  // TODO: create profile api call
    // const [profile, setProfile] = useState({});

    // useEffect(() => {
      
    //   setProfile({});
    // }, [props.profile, props.selectedLang]);

    const handleOnFocusLeft = () => {
        console.log('focus left')
    }

    const handleOnFocusRight = () => {
        console.log("focus right")
    }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileInfo}>
        <div className={styles.profileDivider}>
            {/* TODO: create entry animation when element inside viewport and exit animation when element outside */}
          <div className={styles.profileInfoLeft} onFocus={handleOnFocusLeft}>
            <p>
              For business inquiries, I accept work for games, light novels,
              illustration books, exhibitions, album/EP art, music videos,
              official merch/goods and promotional art.
            </p>
            <p>
              Please provide the following in your email Project Name,
              Production Content, Schedule, and Budget I accept individual and
              personal commission
            </p>
          </div>
          <div className={styles.profileInfoRight} onFocus={handleOnFocusRight}>
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
