import styles from "./Profile.module.css";
import { useEffect, useRef, useState } from "react";
import useIsInViewport from "../Utils/ViewPortUtils";

export default function Profile({ ...props }) {
  const lang = props?.selectedLang;
  const ref1LeftProfile = useRef(null);
  const ref2LeftProfile = useRef(null);

  const isVisible = useIsInViewport({ref: ref1LeftProfile, threshold: 0.3});
  const isVisible2 = useIsInViewport({ref: ref2LeftProfile, threshold: 0.3});
    const [profile, setProfile] = useState(null);

    useEffect(() => {
      fetch(`/api/profile?lang=${lang}`, {method: "GET"}).then((res) => {
        return res.json();
      }).then((res) => {
        setProfile(res.profile);
      })
      
    }, [lang]);

  useEffect(() => {
    if (isVisible) {
      ref1LeftProfile.current.classList.add(styles.animationTrigger);
    }
    else {
      ref1LeftProfile.current.classList.remove(styles.animationTrigger);
    }

    if (isVisible2) {
      ref2LeftProfile.current.classList.add(styles.animationTrigger);
    }
    else {
      ref2LeftProfile.current.classList.remove(styles.animationTrigger);
    }
  },[isVisible, isVisible2]);  

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileInfo}>
        <div className={styles.profileDivider}>
            {/* TODO: create entry animation when element inside viewport and exit animation when element outside */}
          <div className={styles.profileInfoLeft}>
            <div ref={ref1LeftProfile} className={styles.profileInfoLeft_1}>
              {profile && profile[lang]?.commission}
            </div>
            <div ref={ref2LeftProfile} className={styles.profileInfoLeft_2}>
            {profile && profile[lang]?.inquiry}
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