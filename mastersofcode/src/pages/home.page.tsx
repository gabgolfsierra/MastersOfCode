import React, { useState } from "react";
import { Typography, Box, List, ListItem, ListItemText, FormControl, InputLabel, Select, SelectChangeEvent, IconButton, Menu, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';


const useStyles = makeStyles({
  pageContainer: {
    minHeight: "95vh",
    backgroundColor: "#281332",
    color: "white",
    paddingTop: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contentContainer: {
    width: "80%",
    margin: "auto",
    textAlign: "center",
  },
  title: {
    color: 'white',
    position: 'fixed',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'monospace',
  },
  titleList: {
    fontSize: "29px",
    marginBottom: "10px",
    color: "white",
    fontFamily: "monospace",
  },
  listContainer: {
    marginTop: "42px",
    width: "70%",
    maxHeight: "600px",
    overflowY: "auto",
    overflowX: "hidden",
    '&::-webkit-scrollbar': {
      width: '12px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#281332',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#4c2d52',
      borderRadius: '10px',
      border: '3px solid #281332',
    },
  },
  list: {
    backgroundColor: "#190c20",
    padding: "10px",
    borderRadius: "20px",
    width: "98%",
    marginBottom: "400px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    
    alignItems: "center",
    '&:hover': {
      borderBottom: "1px solid white", 
    },
    '& h3': {
      fontFamily: "monospace",
      
    },
    '& .MuiTypography-body1': {
      fontFamily: "monospace",
  
    },
    '&.intern': {
      color: "green",
    },
    '&.junior': {
      color: "yellow",
    },
    '&.middle': {
      color: "red",
    },
    '&.senior': {
      color: "purple",
    },
  },
  difficulty: {
    marginLeft: "470px",
    color: "white",
    fontFamily: "monospace",
    textAlign: "right",
  },
  points:{
    marginLeft: "1px",
    color: "white",
    fontFamily: "monospace",
  
    
  },
  filterContainer: {
    marginRight: "270px",
    display: "flex",
    justifyContent: "flex-end",
    width: "80%",
    position: "sticky", 
    marginTop: "100px", 
    zIndex: 999, 
    backgroundColor: "#281332", 
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
  },
});

const challenges = [
  { name: "1. Add Two Numbers", difficulty: "Intern", points: "25 points" },
  { name: "2. FizzBuzz", difficulty: "Junior", points: "50 points" },
  { name: "3. Reverse Array", difficulty: "Junior", points: "50 points" },
  { name: "4. Testando", difficulty: "Middle", points: "100 points" },
  { name: "5. Testando", difficulty: "Senior", points: "500 points" },
];

const HomePage: React.FC = () => {
  const classes = useStyles();
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setDifficultyFilter(event.target.value as string);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredChallenges = challenges.filter(challenge =>
    difficultyFilter === "" || challenge.difficulty === difficultyFilter
  );

  return (
    <div className={classes.pageContainer}>
      
      <IconButton className={classes.menuButton} onClick={handleMenuClick}>
        <MenuIcon />
      </IconButton>

     
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
          Your Profile
        </MenuItem>
      </Menu>

      
      <Box className={classes.contentContainer}>
        <Typography variant="h2" className={classes.title}>
          Welcome to Masters Of Code!
        </Typography>
        
      </Box>

      <Box className={classes.filterContainer}>
        <FormControl variant="filled">
          <InputLabel className={classes.select}>Difficulty</InputLabel>
          <Select
            value={difficultyFilter}
            onChange={handleFilterChange}
            label="Filter by Difficulty"
            className={classes.select}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Intern">Intern</MenuItem>
            <MenuItem value="Junior">Junior</MenuItem>
            <MenuItem value="Middle">Middle</MenuItem>
            <MenuItem value="Senior">Senior</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Box className={classes.listContainer}>
        <Typography variant="h3" className={classes.titleList}>
          Pick your challenge and CODE!
        </Typography>
        
        <List className={classes.list}>
          {filteredChallenges.map((challenge, index) => (
            <ListItem key={index} component={Link} to={`/challenge/${index + 1}`} className={`${classes.listItem} ${challenge.difficulty.toLowerCase()}`}>
              <ListItemText primary={challenge.name} />
              <Box>
                <Typography variant="body2" className={classes.points}>
                  {challenge.points}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" className={classes.difficulty}>
                  Difficulty: {challenge.difficulty}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export { HomePage };