import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Typography, Snackbar, Box } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#3f51b5",
  },
  codeMirror: {
    marginBottom: "20px",
  },
  submitButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#388e3c",
    },
  },
  logsContainer: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f7f7f7",
    borderRadius: "4px",
    textAlign: "left",
  },
}));

const CdMirror: React.FC = () => {
  const classes = useStyles();
  const [code, setCode] = useState('function sum(a, b) { \n\n\n //Your code here \n\n\n } \n\n\n //This line is used to verify your code through tests, do not delete it. \n module.exports = { sum }; ');

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

  const submitCode = async () => {
    try {
      const response = await axios.post("http://localhost:3002/code", { code });
      console.log(response.data);
      setTestResults(response.data.output);
    } catch (error: any) { // especificando o tipo de error como any ou Error
      console.error("Error to send your code: ", error);
      setTestResults(null);
      let errorMessage = error.toString() || "Unknown error occurred"; 
      setErrorLogs([...errorLogs, errorMessage]); // Adiciona a mensagem de erro aos logs de erro
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setErrorLogs([]); // Limpa os logs de erro
    }, 10000); // Limpa os logs a cada 10 segundos

    return () => {
      clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
    };
  }, []);

  useEffect(() => {
    if (testResults) {
      const passMessages: Message[] = testResults.passes.map(() => ({
        type: 'success',
        message: 'CONGRATULATIONS! YOUR CODE IS CORRECT',
      }));
      const failMessages: Message[] = testResults.failures.map((failure) => ({
        type: 'error',
        message: 'FAIL! TRY AGAIN',
        details: failure.err.message,
      }));
      setMessages([...passMessages, ...failMessages]);
      setOpen(true);
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
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Create a function that adds two numbers in JavaScript.
      </Typography>
      <div className={classes.codeMirror}>
        <CodeMirror
          value={code}
          theme={dracula}
          height="200px"
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
      >
        Submit
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
    </div>
  );
}

export { CdMirror };
