import * as types from '../constants/SettingConstant';

const initialState = {
    setting: {},
}

export const SettingReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SETTING: {
            state.setting = action.setting;
            return { ...state }
        }
        default:
            return state;
    }
}
