import styles from "./Profile.module.css";
import { useEffect, useRef, useState } from "react";
import useIsInViewport from "../Utils/ViewPortUtils";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Image from "next/image";

export default function Profile({ ...props }) {
  const lang = props?.selectedLang;
  const ref1LeftProfile = useRef(null);
  const ref2LeftProfile = useRef(null);

  const isVisible = useIsInViewport({ ref: ref1LeftProfile, threshold: 0.75 });
  const isVisible2 = useIsInViewport({ ref: ref2LeftProfile, threshold: 0.75 });
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

  useEffect(() => {
    if (isVisible) {
      ref1LeftProfile.current.classList.add(styles.animationTrigger);
    } else {
      ref1LeftProfile.current.classList.remove(styles.animationTrigger);
    }

    if (isVisible2) {
      ref2LeftProfile.current.classList.add(styles.animationTrigger);
    } else {
      ref2LeftProfile.current.classList.remove(styles.animationTrigger);
    }
  }, [isVisible, isVisible2]);

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
                    <div
                      style={{
                        paddingRight: "1rem",
                        textAlign: "left",
                        fontSize: "1.25rem",
                      }}
                    >
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
                    <div
                      style={{
                        paddingRight: "1rem",
                        textAlign: "left",
                        fontSize: "1.25rem",
                      }}
                    >
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
                    <div
                      style={{
                        paddingRight: "1rem",
                        textAlign: "left",
                        fontSize: "1.25rem",
                      }}
                    >
                      Instagram
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.profileOtherPlatform}>
          pixiv, fantia, patreon?, ko-fi?, halu-app?
        </div>
      </div>
    </div>
  );
}
