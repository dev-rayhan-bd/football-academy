import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MatchStats, ReportRequest, SHARED_REPORTS_DATA, REPORT_REQUESTS_DATA } from "@/lib/constants/reports";

export interface ReportsSliceState {
  reports: MatchStats[];
  requests: ReportRequest[];
}

const initialState: ReportsSliceState = {
  reports: SHARED_REPORTS_DATA,
  requests: REPORT_REQUESTS_DATA,
};

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    addGameReport: (state, action: PayloadAction<MatchStats>) => {
      state.reports = [action.payload, ...state.reports];
    },
    updateGameReport: (state, action: PayloadAction<MatchStats>) => {
      const idx = state.reports.findIndex(r => r.id === action.payload.id);
      if (idx !== -1) {
        state.reports[idx] = action.payload;
      } else {
        state.reports = [action.payload, ...state.reports];
      }
    },
    addGameReportRequest: (state, action: PayloadAction<ReportRequest>) => {
      state.requests = [action.payload, ...state.requests];
    },
    completeGameReportRequest: (state, action: PayloadAction<number>) => {
      state.requests = state.requests.map(req =>
        req.id === action.payload ? { ...req, status: "Completed" as const } : req
      );
    },
  },
});

export const {
  addGameReport,
  updateGameReport,
  addGameReportRequest,
  completeGameReportRequest,
} = reportsSlice.actions;

export default reportsSlice.reducer;
