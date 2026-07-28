import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EvaluationData {
  dribbling: number;
  ballMastery: number;
  runningWithBall: number;
  rangePassing: number;
  strikingFinishing: number;
  defending: number;
  firstTouch: number;
  nonDominantFoot: number;
  gameAwareness: number;
  gamesUnderstanding: number;
  decisionMaking: number;
  concentration: number;
  leadership: number;
  desire: number;
  maturity: number;
  speedAcceleration: number;
  movement: number;
  balance: number;
  power: number;
  strength: number;
  agility: number;
  coordination: number;
}

export interface SavedEvaluation {
  playerId: number;
  playerName: string;
  evaluation: EvaluationData;
  date: string;
}

export interface EvaluationSliceState {
  /** Map from playerId → saved evaluation record */
  records: Record<number, SavedEvaluation>;
}

const initialState: EvaluationSliceState = {
  records: {},
};

export const evaluationSlice = createSlice({
  name: "evaluation",
  initialState,
  reducers: {
    /** Save or overwrite the evaluation for a player */
    saveEvaluation: (
      state,
      action: PayloadAction<{
        playerId: number;
        playerName: string;
        evaluation: EvaluationData;
        date: string;
      }>
    ) => {
      const { playerId, playerName, evaluation, date } = action.payload;
      state.records[playerId] = { playerId, playerName, evaluation, date };
    },

    /** Remove the saved evaluation for a player */
    clearEvaluation: (state, action: PayloadAction<number>) => {
      delete state.records[action.payload];
    },
  },
});

export const { saveEvaluation, clearEvaluation } = evaluationSlice.actions;

export default evaluationSlice.reducer;
