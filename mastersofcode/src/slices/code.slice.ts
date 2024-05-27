
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CodeState {
  value: string;
  status: string;
  error: string | null;
}

const initialState: CodeState = {
  value: 'const a = 0;',
  status: 'idle',
  error: null,
};

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    submitCodeStart: (state) => {
      state.status = 'loading';
      state.error = null; 
    },
    submitCodeSuccess: (state, action: PayloadAction<string>) => {
      state.status = 'succeeded';
      state.value = action.payload;
      state.error = null; 
    },
    submitCodeFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload; 
    },
  },
});

export const { submitCodeStart, submitCodeSuccess, submitCodeFailure } = codeSlice.actions;

export default codeSlice.reducer;
