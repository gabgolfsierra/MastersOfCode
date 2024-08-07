import React, { useEffect, useState } from "react";
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
import challenges from "../components/challengesList.component";

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



const HomePage: React.FC = () => {
  const classes = useStyles();
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setDifficultyFilter(event.target.value);
  };

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem("completedChallenges") || "[]");
    setCompletedChallenges(completed);
  }, []);


  const filteredChallenges = challenges.filter(
    (challenge) =>
      difficultyFilter === "" || challenge.difficulty === difficultyFilter
  );

  return (
    <>
      <div className={classes.header}>
        <Box sx={{ flexGrow: 1 }} color="#1a1a1a">
          <AppBar position="static" >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="warning"
                aria-label="menu"
                sx={{ mr: 10 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="#FF8C00" fontFamily={"-moz-initial"} component="div" sx={{ flexGrow: 1 }}>
                Your Points:
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <Box >
          <Typography marginTop={"30px"} fontFamily={"-moz-initial"} color="#FF8C00" variant="h2" className={classes.title}>
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
                  key={challenge.id}
                  component={Link}
                  to={`/challenge/${challenge.id}`}
                  className={`${classes.listItem} ${challenge.difficulty.toLowerCase()}`}
                  style={{
                    pointerEvents: completedChallenges.includes(challenge.name) ? "none" : "auto",
                    opacity: completedChallenges.includes(challenge.name) ? 0.5 : 1
                  }}
                >
                  <ListItemText primary={challenge.name} />
                  <Box>
                    <Typography variant="body2" fontFamily={"monospace"} className={classes.points}>
                      {challenge.points}
                    </Typography>
                  </Box>
                  <Box className={classes.difficulty}>
                    <Typography variant="body2"  >
                      Difficulty: {challenge.difficulty}
                    </Typography>
                  </Box>
                  {completedChallenges.includes(challenge.name) && (
                    <Box className={classes.completed}>
                      <Typography variant="body2" color="green" fontFamily={"monospace"}  >
                        Completed
                      </Typography>
                    </Box>
                  )}
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