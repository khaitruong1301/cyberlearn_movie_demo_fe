import * as types from '../constants/DashboardConstant';

const initialState = {
    danhSachThongKeVe: [],
    dsThongKeVeTheoNam: [],
    dsThongKeDoanhThuTheoNam: [],
    dsThongKeDoanhThu: [],
}

export const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_THONG_KE_SO_LUONG_VE: {
            state.danhSachThongKeVe = action.danhSachThongKeVe;
            return { ...state }
        }
        case types.GET_THONG_KE_SL_VE_THEO_NAM: {
            state.dsThongKeVeTheoNam = action.dsThongKeVeTheoNam;
            console.log("state.dsThongKeVeTheoNam", state.dsThongKeVeTheoNam);
            
            return { ...state }
        }
        case types.GET_THONG_KE_DOANH_THU_THEO_NAM: {
            state.dsThongKeDoanhThuTheoNam = action.dsThongKeDoanhThuTheoNam;
            console.log("state.dsThongKeDoanhThuTheoNam", state.dsThongKeDoanhThuTheoNam);
            
            return { ...state }
        }
        case types.GET_THONG_KE_DOANH_THU: {
            state.dsThongKeDoanhThu = action.dsThongKeDoanhThu;
            console.log("state.dsThongKeDoanhThu", state.dsThongKeDoanhThu);
            
            return { ...state }
        }
        default:
            return state;
    }
}
