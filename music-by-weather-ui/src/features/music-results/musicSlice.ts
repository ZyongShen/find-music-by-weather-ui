import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { MusicResultsData } from '../music-results/types';


interface MusicState {
    data: MusicResultsData | null;
    loading: boolean;
    error: string | null;
};

export const initialState: MusicState = {
    data: null,
    loading: false,
    error: null,
};

export const getMusicByLocation = createAsyncThunk(
    'music/getMusicByLocation',
    async (zipcode: string, {rejectWithValue}) => {
        try {
            // api call
            const url = `http://0.0.0.0:8000/find-music-recs`;
            let headers = {
                "zipcode": zipcode,
                "Content-Type": "application/json",
            };
            const response = await fetch(url, {
                headers: headers
            });

            if (!response.ok) {
                return rejectWithValue("Failed to GET music results");
            }
            return await response.json()
        } catch {
            return rejectWithValue("Unexpected event happened while fetching music data");
        }
    }
)

const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        fetchMusicStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchMusicSuccess(state, action: PayloadAction<MusicResultsData>) {
            state.loading = false; // finished loading
            state.data = action.payload; // got passed the result body
        },
        fetchMusicFailure(state, action: PayloadAction<string>) {
            state.loading = false; // finish loading
            state.error = action.payload; // resulted in error and got passed an error
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMusicByLocation.pending, (state) => {
                state.loading = true,
                state.error = null;
            })
            .addCase(getMusicByLocation.fulfilled, (state, action: PayloadAction<MusicResultsData>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getMusicByLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { fetchMusicStart, fetchMusicSuccess, fetchMusicFailure } = musicSlice.actions;
export default musicSlice.reducer;

