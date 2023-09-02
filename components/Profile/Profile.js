import styles from "./Profile.module.css";
import { useEffect, useRef, useState } from "react";
import UseIsInViewport from "../Utils/ViewPortUtil";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Image from "next/image";

export default function Profile({ ...props }) {
  const lang = props?.selectedLang;
  const isMobile = props?.isMobile;

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`/api/profile?lang=${lang}`, { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setProfile(res.profile);
      });
  }, [lang]);

  return (
    <div className={styles.profileContainer}>
      <div className={`${styles.profileInfo} ${isMobile && styles.mobile}`}>
        <div className={styles.profileDivider}>
          <LeftProfile
            profile={profile}
            selectedLang={lang}
            isMobile={isMobile}
          />
          <RightProfile isMobile={isMobile} />
        </div>
        <div
          className={`${styles.profileOtherPlatform} ${
            isMobile && styles.mobile
          }`}
        >
          pixiv, fantia, patreon?, ko-fi?, halu-app?
        </div>
      </div>
    </div>
  );
}

function LeftProfile({ ...props }) {
  const profile = props?.profile;
  const lang = props?.selectedLang;
  const isMobile = props?.isMobile;

  const ref1LeftProfile = useRef(null);
  const ref2LeftProfile = useRef(null);

  UseIsInViewport({
    ref: ref1LeftProfile,
    options: { threshold: 0.5 },
    styles: styles.animationTrigger,
  });
  UseIsInViewport({
    ref: ref2LeftProfile,
    options: { threshold: 0.5 },
    styles: styles.animationTrigger,
  });

  return (
    <div className={`${styles.profileInfoLeft} ${isMobile && styles.mobile}`}>
      <div className={styles.profileInfoLeft_1} ref={ref1LeftProfile}>
        {profile && profile[lang]?.commission}
      </div>
      <div className={styles.profileInfoLeft_2} ref={ref2LeftProfile}>
        {profile && profile[lang]?.inquiry}
      </div>
    </div>
  );
}

function RightProfile({ ...props }) {
  const isMobile = props?.isMobile;
  const refMobile2 = useRef(null);

  UseIsInViewport({
    ref: refMobile2,
    options: { threshold: 0.5 },
    styles: styles.animationTrigger,
  });

  return (
    <div
      className={`${styles.profileInfoRight} ${isMobile && styles.mobile}`}
      ref={refMobile2}
    >
      <div className={styles.rightContainer}>
        <div className={styles.iconContainer}>
          <MailOutlineIcon
            sx={{
              color: "black",
              fontSize: `${
                isMobile ? "calc(1rem + 0.5vw)" : "calc(2.5rem + 1vw)"
              }`,
            }}
          />
        </div>
        <div className={`${styles.info} ${isMobile && styles.mobile}`}>
          <a href="mailto:rafirabbani103@gmail.com">rafirabbani103@gmail.com</a>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.iconContainer}>
          <Image
            src="/icon/twitter.svg"
            alt="twitter"
            width={isMobile ? 20 : 65}
            height={isMobile ? 20 : 65}
          />
        </div>
        <div className={`${styles.info} ${isMobile && styles.mobile}`}>
          <a href="https://twitter.com/parasonge">@parasonge</a>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.iconContainer}>
          <Image
            src="/icon/ig.svg"
            alt="instagram"
            width={isMobile ? 20 : 65}
            height={isMobile ? 20 : 65}
          />
        </div>
        <div className={`${styles.info} ${isMobile && styles.mobile}`}>
          <a href="https://www.instagram.com/parasonge/">@parasonge</a>
        </div>
      </div>
    </div>
  );
}
