import styles from "./Profile.module.css";
import { useEffect, useRef, useState } from "react";
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
 
   useIsInViewport({ ref: ref1LeftProfile, options: {threshold: 0.5}, styles: styles.animationTrigger});
   useIsInViewport({ ref: ref2LeftProfile, options: {threshold: 0.5}, styles: styles.animationTrigger});
   
  
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
  
  useIsInViewport({ ref: refMobile2, options: {threshold: 0.5}, styles: styles.animationTrigger });;

  return (
    <div
      className={`${styles.profileInfoRight} ${isMobile && styles.mobile}`}
      ref={refMobile2}
    >
      <table>
        <tbody>
          <tr>
            <td>
              <div>
                <MailOutlineIcon
                  sx={{
                    color: "black",
                    fontSize: "calc(1.5rem + 0.5vw)",
                    paddingRight: "0.2rem",
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
                  fill
                  sizes="calc(1.5rem + 0.5vw)"
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
                  alt="instagram"
                  fill
                  sizes="calc(1.5rem + 0.5vw)"
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
