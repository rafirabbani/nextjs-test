import styles from "./Layout.module.css";
import {
  useState,
  useEffect,
  Children,
  cloneElement as CloneElement,
  isValidElement,
} from "react";
import Dropdown from "../Dropdown/Dropdown";

export default function Layout({ children, ...props }) {
  const handleViewPort = props?.handleIsMobile;
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleChangeLang = props?.handleChangeLang;

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    // handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  if (windowSize.width > 768) {
    return (
      <>
        <WebPage
          selectedLang={props?.selectedLang}
          handleChangeLang={handleChangeLang}
          handleViewPort={handleViewPort}
        >
          {children}
        </WebPage>
      </>
    );
  } 
  else {
    return (
      <>
        <MobilePage
          handleViewPort={handleViewPort}
          selectedLang={props?.selectedLang}
          handleChangeLang={handleChangeLang}
        >
          {children}
        </MobilePage>
      </>
    );
  }
}

function WebPage({ children, ...props }) {
  // set default lang props passed to dropdown componenent
  const selectedLang = props?.selectedLang;
  const handleChangeLang = props?.handleChangeLang;
  const handleViewPort = props?.handleViewPort;
  
  useEffect(() => {
    handleViewPort(false);
  });

  return (
    <div className={styles.layout}>
      <nav>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>{/* Logo goes Here */}</div>
          <div className={styles.leftHeader}>
            <div className={styles.routesContainer}>
              <a href="#gallery-container">Gallery</a>
              <a href="#contacts-container">Contacts</a>
            </div>
          </div>
          <div className={styles.rightHeader}>
            <Dropdown
              background={{ type: "string", name: "Language" }}
              langList={[
                { name: "ENG", value: "eng" },
                { name: "JPN", value: "jpn" },
                { name: "IDN", value: "idn" },
              ]}
              selectedLang={selectedLang}
              handleChangeLang={handleChangeLang}
            />
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer>Footer Here</footer>
    </div>
  );
}

function MobilePage({ children, ...props }) {
  const selectedLang = props?.selectedLang;
  const handleChangeLang = props?.handleChangeLang;
  const handleViewPort = props?.handleViewPort;
  
  useEffect(() => {
    handleViewPort(true);
  });

  return (
    <div className={styles.layout}>
      <header>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>{/* Logo goes Here */}</div>
          <div className={styles.dropDown}>
            <Dropdown
              background={{ type: "string", name: "Language" }}
              langList={[
                { name: "ENG", value: "eng" },
                { name: "JPN", value: "jpn" },
                { name: "IDN", value: "idn" },
              ]}
              selectedLang={selectedLang}
              handleChangeLang={handleChangeLang}
              disableArrow
            />
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer>Footer Here</footer>
    </div>
  );
}

// child props manipulation
function ChildrenPropsManipulate(childrenArray, addedProps) {
  return Children.map(childrenArray, (child) => {
    if (isValidElement(child)) {
      return CloneElement(child, { ...addedProps });
    }
  });
}
