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
  const selectedLang = props?.selectedLang
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleChangeLang = props?.handleChangeLang;

  let backgroundName;
  
  if (selectedLang === "eng") {
    backgroundName = "Languages"
  }
  else if (selectedLang === "jpn") {
    backgroundName = "言語"
  }
  else {
    backgroundName = "Bahasa"
  }

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
          selectedLang={selectedLang}
          handleChangeLang={handleChangeLang}
          handleViewPort={handleViewPort}
          backgroundName={backgroundName}
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
          selectedLang={selectedLang}
          handleChangeLang={handleChangeLang}
          backgroundName={backgroundName}
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
  const backgroundName = props?.backgroundName
  
  useEffect(() => {
    handleViewPort(false);
  });

  return (
    <div className={styles.layout}>
      <nav>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>lOGO GOES HERE</div>
          <div className={styles.leftHeader}>
            <div className={styles.routesContainer}>
              <a href="#gallery-container">Gallery</a>
              <a href="#contacts-container">Contacts</a>
            </div>
          </div>
          <div className={styles.rightHeader}>
            <Dropdown
              background={{ type: "string", name: backgroundName }}
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
  const backgroundName = props?.backgroundName
  
  useEffect(() => {
    handleViewPort(true);
  });


  return (
    <div className={styles.layout}>
      <header>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>LOGO GOES HERE</div>
          <div className={styles.dropDown}>
            <Dropdown
              background={{ type: "string", name: backgroundName }}
              langList={[
                { name: "ENG", value: "eng" },
                { name: "JPN", value: "jpn" },
                { name: "IDN", value: "idn" },
              ]}
              selectedLang={selectedLang}
              handleChangeLang={handleChangeLang}
              disableArrow
              isMobile={true}
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
