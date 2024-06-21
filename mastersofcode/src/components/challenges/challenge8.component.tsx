import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { Button, Typography, Snackbar, Box, CircularProgress, Container } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "90px",
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: '24px',
        borderRadius: '80px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',


    },

    backButton: {
        backgroundColor: '#FF8C00',
        color: 'white',
        marginBottom: '20px',
        "&:hover": {
            backgroundColor: '#FF8C00',
        },
    },

    editorContainer: {
        marginTop: "30px",
    },
    title: {
        marginBottom: "20px",
        color: '#FF8C00',
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
        color: '#FF8C00',
        "&:hover": {
            backgroundColor: '#388e3c',
        },
    },
}));


const Challenge8: React.FC = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const theme = useTheme();
    const [code, setCode] = useState('var superPow = function(a, b) { \n\n\n //Your code here \n\n\n }\n\n\n\n module.exports = { superPow }; ');
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
    const [messages, setMessages] = useState<any[]>([]);
    const [errorLogs, setErrorLogs] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const submitCode = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3002/challenge/8", { code });
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
            const passMessages = testResults.passes.map(() => ({
                type: "success",
                message: "CONGRATULATIONS!! YOU EARNED 500 POINTS!",
            }));
            const failMessages = testResults.failures.map((failure) => ({
                type: "error",
                message: "FAIL! TRY AGAIN",
                details: failure.err.message,
            }));
            setMessages([...passMessages, ...failMessages]);
            setOpen(true);
            setLoading(false);

            if (testResults.failures.length === 0) {
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        }
    }, [testResults, navigate]);

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

        <><Button
            variant="outlined"
            className={classes.backButton}
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
        >
            Return
        </Button><Box className={classes.root}>
                <Container className={classes.editorContainer}>
                    <Typography variant="h6" className={classes.title}>
                    Your task is to calculate a^b mod 1337 where a is a positive integer and b is an extremely large positive integer given in the form of an array.
                    </Typography>
                    <div className={classes.codeMirror}>
                        <CodeMirror
                            value={code}
                            theme={dracula}
                            height="300px"
                            extensions={[javascript({ jsx: true })]}
                            onChange={(editor, change) => {
                                setCode(editor);
                            }} />
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
                                        Input: a = 2, b = [3]
                                    </Typography>
                                    <Typography variant="overline" className={classes.par}>
                                        Output: 8
                                    </Typography>
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <Typography variant="body1" className={classes.title}>
                                    Example 2:
                                </Typography>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="overline" className={classes.par}>
                                        Input: a = 2, b = [1,0]
                                    </Typography>
                                    <Typography variant="overline" className={classes.par}>
                                        Output: 1024
                                    </Typography>
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <Typography variant="body1" className={classes.title}>
                                    Example 3:
                                </Typography>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="overline" className={classes.par}>
                                        Input: a = 1, b = [4, 3, 3, 8, 5, 2]
                                    </Typography>
                                    <Typography variant="overline" className={classes.par}>
                                        Output: 1
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'relative', marginBottom: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Typography variant="body1" className={classes.but}>
                            Difficulty: Senior
                        </Typography>
                        <div style={{ width: '10px', height: '10px', backgroundColor: 'purple', marginLeft: '10px', marginBottom: '6px' }}></div>
                    </div>
                </Container>
            </Box></>
    );
}

export { Challenge8 };

