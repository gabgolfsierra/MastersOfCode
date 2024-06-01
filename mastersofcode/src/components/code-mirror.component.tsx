import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import axios from "axios";
import codeReducer from "../slices/code.slice";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "20%",
    bottom: "40px",
    left: "10%",
    right: "10%",
    textAlign: "left",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  codeMirror: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

const CdMirror: React.FC = () => {
  const classes = useStyles();
  const [code, setCode] = useState('const a = 0;');

  const submitCode = async (event: any) => {
    try {
      const response = await axios.post("http://localhost:3002/code", { code });
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao enviar código:", error);
    }
  };
  

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Pergunta Desafio
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
    </div>
  );
};

export { CdMirror };
