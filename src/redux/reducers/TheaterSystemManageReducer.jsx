import * as types from '../constants/TheaterSystemManageConstant';
import { showMessageAlert } from '../../templates/SweetAlert';

const initialState = {
    theaterSystemArray: [], //Hệ thống rạp
    theaterArray: [], //Cụm rạp
    lichChieuHTRArray: [],
    HTRArray: [],
    rapArray: [],
    cumRapInfor: [],
    danhSachRap: [],
    thongTinCumRap: {},
    danhSachGhe: [],
    themGheResult: {}
}

export const TheaterSystemManageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_THEATER_SYSTEM_LIST: {
            state.theaterSystemArray = action.theaterSystemArray;
            return { ...state }
        }
        case types.GET_THEATER_LIST: {
            state.theaterArray = action.theaterArray;
            return { ...state }
        }
        case types.GET_TTLC_SYSTEM_LIST: {
            state.lichChieuHTRArray = action.lichChieuHTRArray;
            return { ...state }
        }
        case types.GET_HTR_LIST: {
            state.HTRArray = action.HTRArray;
            return { ...state }
        }
        // GET_CUMRAP_LIST
        case types.GET_CUMRAP_LIST: {
            state.rapArray = action.rapArray;
            state.cumRapInfor = action.cumRapInfor;
            return { ...state }
        }
         // GET_RAP_LIST
         case types.GET_RAP_LIST: {
            state.danhSachRap = action.danhSachRap;
            state.thongTinCumRap = action.thongTinCumRap;
            return { ...state }
        }
         // GET_RAP_LIST
         case types.GET_RAP_LIST: {
            state.danhSachRap = action.danhSachRap;
            state.thongTinCumRap = action.thongTinCumRap;
            return { ...state }
        }
         // GET_GHE_LIST
         case types.GET_GHE_LIST: {
            // console.log(" state.danhSachGhe",  state.danhSachGhe);            
            state.danhSachGhe = action.danhSachGhe;
            return { ...state }
        }        
        // Thêm ghế
        case types.THEM_GHE: {
            state.themGheResult = action.themGheResult;
            if (action.themGheResult === "Thêm ghế thành công!"){
                showMessageAlert('Notification', action.themGheResult, 'success')
            }
            else {
                showMessageAlert('Notification', action.themGheResult, 'warning')
            }
        }

        default:
            return state
    }
}
