import React, { useState } from "react";
import { Typography, Box, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem, IconButton, Menu, Paper, SelectChangeEvent, AppBar, Button, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';

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
    marginBottom: "25px", // Adicionando margem inferior para separar do próximo conteúdo
  },
  title: {
    color: 'white',
    fontFamily: '-moz-initial',
    marginTop: '50px',
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
    '&::-webkit-scrollbar': {
      width: '12px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 1)',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#1a1a1a',
      borderRadius: '10px',
      border: '1px solid #ff9966',
    },
    marginBottom: "50px", // Ajustando margem inferior para espaço adequado
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
    color: "white",
    fontFamily: "monospace",
    textAlign: "right",
  },
  points: {
    color: "white",
    fontFamily: "monospace",
  },

  filterContainer: {
    width: "70%",
    display: "flex",
    justifyContent: "flex-end",
    position: "static",
    top: "0",
    zIndex: 999,
    marginBottom: "70px", // Adicionando margem inferior para separar do próximo conteúdo
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
    zIndex: 1000, // Ajustando z-index para ficar acima do conteúdo
  },
});

const StyledPaper = styled(Paper)`
  && {
    display: flex;
    flex-direction: column;
    gap: 100px;
    width: 100%; 
    padding: 20px;
    background-color: rgba(0, 0, 0, 1);
    backface-visibility: hidden;
    transition: transform 0.4s ease;
    &:hover {
      transform: scale(1.02);
    }
  }
`;

const challenges = [
  { name: "1. Add Two Numbers", difficulty: "Intern", points: "25 points" },
  { name: "2. FizzBuzz", difficulty: "Junior", points: "50 points" },
  { name: "3. Reverse Array", difficulty: "Junior", points: "50 points" },
  { name: "4. Testando", difficulty: "Middle", points: "100 points" },
  { name: "6. Testando", difficulty: "Senior", points: "500 points" },
  { name: "7. Testando", difficulty: "Senior", points: "500 points" },
  { name: "8. Testando", difficulty: "Senior", points: "500 points" },
  { name: "9. Testando", difficulty: "Senior", points: "500 points" },

];

const HomePage: React.FC = () => {
  const classes = useStyles();
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setDifficultyFilter(event.target.value);
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
    <><div className={classes.header}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="warning"
              aria-label="menu"
              sx={{ mr: 180 }}
            >
              <MenuIcon />
            </IconButton>
            <Button color="warning">Your Points: </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box className={classes.contentContainer}>
        <Typography variant="h4" className={classes.title}>
          WELCOME TO MASTERS OF CODE
        </Typography>
      </Box>
    </div><div className={classes.pageContainer}>


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

          <List>
            {filteredChallenges.map((challenge, index) => (
              <StyledPaper key={index} elevation={3}>
                <ListItem
                  component={Link}
                  to={`/challenge/${index + 1}`}
                  className={`${classes.listItem} ${challenge.difficulty.toLowerCase()}`}
                >
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
              </StyledPaper>
            ))}
          </List>
        </Box>
      </div></>
  );
};

export { HomePage };
