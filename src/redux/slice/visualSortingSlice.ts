import { createSlice, PayloadAction} from '@reduxjs/toolkit';

const visualSortingSlice = createSlice({
    name: 'visualSortingSlice',
    initialState: {
        sortType: 'Bubble Sort',
        speed: 100,
        soundIsEnable: false,
        arrSize: 1,
    },
    reducers: {
        setSortType(state, action: PayloadAction<string>) {
            state.sortType = action.payload;
        },
        setSpeed(state, action: PayloadAction<number>) {
            state.speed = action.payload;
        },
        setSoundIsEnable(state, action: PayloadAction<boolean>) {
            state.soundIsEnable = action.payload;
        },
        setArrSize(state, action: PayloadAction<string>) {
            state.arrSize = Number(action.payload);
        }
    },
});

export default visualSortingSlice.reducer;
export const {
    setSortType,
    setSpeed,
    setSoundIsEnable,
    setArrSize,
} = visualSortingSlice.actions;
