import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { Button, Typography, Snackbar, Box, CircularProgress, Container } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: '#1a1a1a',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  
  
  editorContainer: {
    flex: 1,
    marginRight: '20px',
  },
  title: {
    marginBottom: "20px",
    color: '#7a57d1',
    fontFamily: 'monospace', 
  },
  par: {
    marginBottom: "10px",
    color: 'white',
    fontFamily: 'monospace', 
  },
  but: {
    color: 'white',
    fontFamily: 'monospace', 
  },
  codeMirror: {
    marginBottom: "20px",
    textAlign: "left",
  },
  submitButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    "&:hover": {
      backgroundColor: '#388e3c',
    },
  },
  logsContainer: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f7f7f7",
    borderRadius: "4px",
    textAlign: "left",
    flex: 1,
  },
}));

const Challenge1: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [code, setCode] = useState('function sum(a, b) { \n\n\n //Your code here \n\n\n }\n\n\n\n module.exports = { sum }; ');

  interface TestResult {
    passes: { fullTitle: string }[];
    failures: { fullTitle: string, err: { message: string, stack: string } }[];
  }

  interface Message {
    type: 'success' | 'error';
    message: string;
    details?: string;
  }

  const [testResults, setTestResults] = useState<TestResult | null>(null);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [errorLogs, setErrorLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const submitCode = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3002/challenge/1", { code });
      console.log(response.data);
      setTestResults(response.data.output);
    } catch (error: any) {
      console.error("Error to send your code: ", error);
      setTestResults(null);
      let errorMessage = error.toString() || "Unknown error occurred";
      setErrorLogs([...errorLogs, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setErrorLogs([]);
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (testResults) {
      const passMessages: Message[] = testResults.passes.map(() => ({
        type: 'success',
        message: 'CONGRATULATIONS!! YOU EARNED 25 POINTS!',
      }));
      const failMessages: Message[] = testResults.failures.map((failure) => ({
        type: 'error',
        message: 'FAIL! TRY AGAIN',
        details: failure.err.message,
      }));
      setMessages([...passMessages, ...failMessages]);
      setOpen(true);
      setLoading(false); 
    }
  }, [testResults]);

  const handleClose = () => {
    setOpen(false);
  };

  const renderTestResults = () => {
    return (
      <React.Fragment>
        {messages.map((msg, index) => (
          <Snackbar
            key={index}
            open={open}
            autoHideDuration={8000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <MuiAlert onClose={handleClose} severity={msg.type}>
              {msg.message}
              {msg.details && (
                <Typography variant="body2" style={{ marginTop: '8px' }}>
                  {msg.details}
                </Typography>
              )}
            </MuiAlert>
          </Snackbar>
        ))}
      </React.Fragment>
    );
  };

  return (
    
    <Box className={classes.root}>
      <Container className={classes.editorContainer}>
        <Typography variant="h6" className={classes.title}>
          Create a function that adds two numbers in JavaScript.
        </Typography>
        <div className={classes.codeMirror}>
          <CodeMirror
            value={code}
            theme={dracula}
            height="300px"
            extensions={[javascript({ jsx: true })]}
            onChange={(editor, change) => {
              setCode(editor);
            }}
          />
        </div>
        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={submitCode}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="secondary" />
          ) : (
            "Submit"
          )}
        </Button>
        <div className={classes.logsContainer}>
          <Typography variant="h6">Logs</Typography>
          {errorLogs.map((log, index) => (
            <Typography key={index} variant="body1" color="error">
              {log}
            </Typography>
          ))}
        </div>
        {renderTestResults()}
      </Container>
  
      <Container className={classes.editorContainer}>
        <Typography variant="h5" className={classes.title}>
          Test Cases
        </Typography>
  
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginRight: '120px' }}>
            <div style={{ marginBottom: '20px' }}>
              <Typography variant="body1" className={classes.title}>
                Example 1:
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="overline" className={classes.par}>
                  Input: sum(2, 3) 
                </Typography>
                <Typography variant="overline" className={classes.par}>
                  Output: 5
                </Typography>
              </div>
            </div>
  
            <div style={{ marginBottom: '20px' }}>
              <Typography variant="body1" className={classes.title}>
                Example 2:
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="overline" className={classes.par}>
                  Input: sum(-1, -2) 
                </Typography>
                <Typography variant="overline" className={classes.par}>
                  Output: -3 
                </Typography>
              </div>
            </div>
          </div>
  
          <div style={{ marginBottom: '20px' }}>
            <Typography variant="body1" className={classes.title}>
              Example 3:
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="overline" className={classes.par}>
                Input: sum(9, 1) 
              </Typography>
              <Typography variant="overline" className={classes.par}>
                Output: 10
              </Typography>
            </div>
          </div>
        </div>
  
        <div style={{ position: 'relative', marginBottom: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <Typography variant="body1" className={classes.but}>
            Difficulty: Intern
          </Typography>
          <div style={{ width: '10px', height: '10px', backgroundColor: 'green', marginLeft: '10px' , marginBottom: '6px'}}></div>
        </div>
      </Container>
    </Box>
   
  );
}

export { Challenge1 };