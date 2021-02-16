import * as types from '../constants/MemberManageConstant';
import { Redirect } from 'react-router-dom'
import { showMessageAlert, showMessageAlertEvent } from '../../templates/SweetAlert';

const initialState = {
    memberArray : [],
    userLogin: {},
    profileInfor: {}
}

export const MemberManageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_MEMBER_LIST: {
            state.memberArray = action.memberArray;
            return { ...state }
        }
        case types.LOGIN: {
            console.log("Thành Công");
            state.userLogin = action.resultLogin;
            if (action.resultLogin.Content === "Tài khoản hoặc mật khẩu không đúng!" || action.resultLogin.Content === "Tài khoản không tồn tại!"){
                showMessageAlert("Warning", action.resultLogin.Content, "warning")
            }else{
                window.location.reload();
            }
            return { ...state }
        }
        case types.GET_PROFILE: {
            state.profileInfor = action.profileInfor;
            return { ...state }
        }
        default:
            return state;
    }
}
