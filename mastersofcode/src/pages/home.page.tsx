import React, { useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Paper,
  AppBar,
  Toolbar,
  SelectChangeEvent,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import useStyles from "../styles";

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

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setDifficultyFilter(event.target.value);
  };


  const filteredChallenges = challenges.filter(
    (challenge) =>
      difficultyFilter === "" || challenge.difficulty === difficultyFilter
  );

  return (
    <>
      <div className={classes.header}>
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
              <Typography variant="h6" color="#ff9966" fontFamily={"-moz-initial"} component="div" sx={{ flexGrow: 1 }}>
                Your Points:
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <Box >
          <Typography marginTop={"30px"} fontFamily={"-moz-initial"} color="#ff9966" variant="h2"  className={classes.title}>
            WELCOME TO MASTERS OF CODE
          </Typography>
        </Box>
      </div>
      <div className={classes.pageContainer}>
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
          <Typography fontFamily={"monospace"} variant="h4" className={classes.titleList}>
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
      </div>
    </>
  );
};

export { HomePage };
