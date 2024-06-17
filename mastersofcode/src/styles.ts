// HOME PAGE STYLES

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  header: {
    background: "#1a1a1a",
    
  },
  pageContainer: {
    minHeight: "100vh",
    background: "#1a1a1a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contentContainer: {
    width: "80%",
    margin: "auto",
    textAlign: "center",
    marginBottom: "25px",
  },
  title: {
    color: "white",
    width: "100%",
    textAlign: "center",
   
  },
  titleList: {
    fontSize: "29px",
    marginBottom: "20px",
    color: "white",
    fontFamily: "monospace",
  },
  listContainer: {
    width: "70%",
    maxHeight: "650px",
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "2px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(0, 0, 0, 1)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#1a1a1a",
      borderRadius: "10px",
      border: "1px solid #ff9966",
    },
    marginBottom: "50px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h3": {
      fontFamily: "monospace",
    },
    "& .MuiTypography-body1": {
      fontFamily: "monospace",
    },
    "&.intern": {
      color: "green",
    },
    "&.junior": {
      color: "yellow",
    },
    "&.middle": {
      color: "red",
    },
    "&.senior": {
      color: "purple",
    },
  },
  difficulty: {
    color: "white",
    fontFamily: "monospace",
    paddingRight: "30px",
  },
  points: {
    color: "white",
    fontFamily: "monospace",
    paddingRight: "510px",

  },

  completed:{
    paddingRight: "30px",
  },

  filterContainer: {
    width: "70%",
    display: "flex",
    justifyContent: "flex-end",
    position: "static",
    zIndex: 999,
    marginBottom: "10px",
  },

  select: {
    fontFamily: "monospace",
    color: "white",
    "& .MuiSelect-icon": {
      color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiInputLabel-outlined": {
      color: "white",
    },
    minWidth: 220,
  },
  menuButton: {
    position: "fixed",
    top: "20px",
    left: "20px",
    color: "white",
    zIndex: 1000,
  },
});

export default useStyles;
