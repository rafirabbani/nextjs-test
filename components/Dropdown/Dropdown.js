// import styles from "./Dropdown.module.css";
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useRef, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import styles from './Dropdown.module.css'

export default function DropDown({
  langList,
  background,
  disableArrow,
  selectedLang,
  handleChangeLang,
  isMobile
}) {
  const [lang, setLang] = useState(selectedLang);
  const [isOpen, setIsOpen] = useState(false);
  const searchInput = useRef(null);

  const theme = createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            marginLeft: "5px",
            backgroundColor: "black",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root : {
            color: "red",
            "&.Mui-selected": {
              backgroundColor: "red",
              color: "white",
              "&.Mui-focusVisible": { backgroundColor: "red", color: "white"}
            },
            "&.MuiButtonBase-root" :{
              "&.Mui-selected": {
                backgroundColor: "red",
                color: "white"
              },
              "&:hover": {
                backgroundColor: "white",
                color: "red"
              }
            }
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            "MuibuttonBase:hover": {
              color: "green",
              backgroundColor: "white"
            }
          }
        }
      }
    },
  });

  const handleChange = (e) => {
    e.preventDefault();
    setLang(e.target.value);
    handleChangeLang(e.target.value);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    searchInput.current.previousSibling.hidden = true;
    for (const child of Array.from(searchInput.current.children)) {
      const classList = Array.from(child?.classList);
      if (
        classList.filter((d) => d === "MuiOutlinedInput-notchedOutline")
          ?.length > 0
      ) {
        child.hidden = true;
      }
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    searchInput.current.previousSibling.hidden = false;
    for (const child of Array.from(searchInput.current.children)) {
      const classList = Array.from(child?.classList);
      if (
        classList.filter((d) => d === "MuiOutlinedInput-notchedOutline")
          ?.length > 0
      ) {
        child.hidden = false;
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      searchInput.current.previousSibling.hidden = false;
    }
    else {
      searchInput.current.previousSibling.hidden = true;
    }
    
  }, [isOpen]);

  return (
    <div>
      <DropDownTitle
        selectedLang={selectedLang}
        isMobile={isMobile}
        isOpen={isOpen}
      />
      <StyledFormControl
        fullWidth
        disablearrow={disableArrow ? "true" : undefined}
      >
        <InputLabel id="demo-simple-select-label">
          <Background background={background} />
        </InputLabel>
        <ThemeProvider theme={theme}>
          <Select
            ref={searchInput}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lang}
            label={background.type === "string" ? `${background.name}` : ""}
            onChange={handleChange}
            onClose={handleClose}
            onOpen={handleOpen}
            open={isOpen}
          >
            {langList.map((item, index) => (
              <MenuItem
                value={item.value}
                key={index}
                
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </ThemeProvider>
      </StyledFormControl>
    </div>
  );
}

function Background({ background }) {
  if (background.type === "image") {
    return (
      <Image
        src={background.src}
        alt={background.alt}
        height={background.height}
        width={background.height}
      />
    );
  } else if (background.type === "string") {
    return `${background.name}`;
  }
}

function DropDownTitle({selectedLang, isMobile, isOpen}) {
  
  let title;

  if (isMobile && selectedLang === "eng") {
    title = "Language"
  }
  else if (isMobile && selectedLang === "jpn") {
    title = "言語"
  }
  else if (isMobile && selectedLang === "idn") {
    title = "Bahasa"
  }
  else {
    if (selectedLang === "eng") {
      title = "Select Language"
    }
    else if (selectedLang === "jpn") {
      title = "言語を選択する"
    }
    else {
      title = "Pilih Bahasa"
    }
  }

  return (
    <p className={`${styles.helloDarkness} ${isOpen ? styles.isOpen : styles.isClose}`}>{title}</p>
  )
}

const StyledFormControl = styled(FormControl)(({ ...props }) => {
   const disablearrow = props?.disablearrow
  return {
    "&.MuiFormControl-root": {
      minWidth: "120px",
      ".MuiFormLabel-root": {
        color: "red",
      },
      ".MuiInputBase-root": {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "red",
        },
        color: "red",
        ".MuiSvgIcon-root": {
          color: "red",
          ...(disablearrow && { display: "none" }),
          right: "1px",
        },
        ".MuiSelect-select": {
          ...(disablearrow && { textAlign: "center" }),
        },
      },
    },
  };
});



