import styles from "./Profile.module.css";
import { use, useEffect, useRef, useState } from "react";
import useIsInViewport from "../Utils/ViewPortUtils";
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

    // TODO: refactor this bullshit future Rafi awkakwaw
  }, [lang]);

  return (
    <div className={styles.profileContainer}>
      <div className={`${styles.profileInfo} ${isMobile && styles.mobile}`}>
        <div className={styles.profileDivider}>
          <LeftProfile profile={profile} selectedLang={lang} isMobile={isMobile}/>
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

function LeftProfile({...props}) {
   const profile = props?.profile;
   const lang = props?.selectedLang;
   const isMobile = props?.isMobile;

   const ref1LeftProfile = useRef(null);
   const ref2LeftProfile = useRef(null);
 
   // TODO: PROBLEM 2 FOR FUTURE RAFI MAMPUS
   const isVisible = useIsInViewport({ ref: ref1LeftProfile, threshold: 0.3 });
   const isVisible2 = useIsInViewport({ ref: ref2LeftProfile, threshold: 0.3 });
   
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
  });
  return (
    <div className={`${styles.profileInfoLeft} ${isMobile && styles.mobile}`}>
      <div ref={ref1LeftProfile} className={styles.profileInfoLeft_1}>
        {profile && profile[lang]?.commission}
      </div>
      <div ref={ref2LeftProfile} className={styles.profileInfoLeft_2}>
        {profile && profile[lang]?.inquiry}
      </div>
    </div>
  );
}

function RightProfile({ ...props }) {
  const isMobile = props?.isMobile;
  const refMobile2 = useRef(null);
  const isVisible3 = useIsInViewport({ ref: refMobile2, threshold: 0.2 });

  useEffect(() => {
    if (isVisible3) {
      refMobile2.current.classList.add(styles.animationTrigger, styles.right);
    } 
    else {
      refMobile2.current.classList.remove(
        styles.animationTrigger,
        styles.right
      );
    }
  });

  return (
    <div
      className={`${styles.profileInfoRight} ${isMobile && styles.mobile}`}
      ref={refMobile2}
    >
      Contact
      <table>
        <tbody>
          <tr>
            <td>
              <div>
                <MailOutlineIcon
                  sx={{
                    color: "black",
                    fontSize: "2.2rem",
                    fontWeight: "",
                  }}
                />
              </div>
            </td>
            <td>
              <div className={`${styles.info} ${isMobile && styles.mobile}`}>
                <a href="mailto:rafirabbani103@gmail.com">
                  rafirabbani103@gmail.com
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <Image
                  src="/icon/twitter.svg"
                  alt="twitter"
                  width={37}
                  height={37}
                />
              </div>
            </td>
            <td>
              <div className={`${styles.info} ${isMobile && styles.mobile}`}>
                twitter
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <Image
                  src="/icon/ig.svg"
                  alt="twitter"
                  width={37}
                  height={37}
                />
              </div>
            </td>
            <td>
              <div className={`${styles.info} ${isMobile && styles.mobile}`}>
                Instagram
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
