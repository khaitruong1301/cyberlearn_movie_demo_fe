import * as types from '../constants/MovieManageConstant';
import { showMessageAlert, showMessageAlertEvent } from '../../templates/SweetAlert';
import { message } from 'antd'

const initialState = {
    movieArray: [],
    activeMovie: {},
    comingMovie: {},
    comingMovieArray: [],
    movieInfor: {},
    ngayKhoiChieu: '',
    thongTinBinhLuanPhim: [],
    lichChieuPhim: [],
    deleteResult: {},
    updateResult: {},
    createResult: {},
    maLichChieuSearch: 0,
    addCommentResult: ''
}

export const MovieManageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_MOVIE_LIST: {
            state.movieArray = action.movieArray;
            state.activeMovie = action.activeMovie;
            state.comingMovieArray = action.comingMovieArray
            return { ...state }
        }
        case types.GET_MOVIE_DETAIL: {
            state.movieInfor = action.movieInfor;
            state.thongTinBinhLuanPhim = action.thongTinBinhLuanPhim;
            state.lichChieuPhim = action.lichChieuPhim;
            state.ngayKhoiChieu = action.ngayKhoiChieu;
            return { ...state }
        }
        case types.CREATE_MOVIE: {
            state.createResult = action.createResult;
            if (action.createResult === "Thêm phim thành công!"){
                showMessageAlert('Notification', action.createResult , 'success')
            }
            else{
                showMessageAlert('Notification', action.createResult.Content , 'success')
            }
            return { ...state }
        }
        case types.UPDATE_MOVIE: {
            state.updateResult = action.updateResult;  
            if (action.updateResult === "Cập nhật phim thành công!"){
                showMessageAlert('Notification', action.updateResult , 'success')
            }
            else{
                showMessageAlert('Notification', action.updateResult.Content , 'success')
            }         
            return { ...state }
        }
        case types.DELETE_MOVIE: {
            if (action.deleteResult.Content === 'Phim đã xếp lịch chiếu không thể xóa!' || action.deleteResult.Content === 'Mã phim không hợp lệ!') {
                message.warning(action.deleteResult.Content);
            }
            else{
                state.movieArray = action.deleteResult;
            }
            return { ...state }
        }
        case types.COMING_MOVIE: {
            state.activeMovie = action.activeMovie;
            return { ...state }
        }
        case types.UPLOAD_HINH_ANH: {
            return { ...state }
        }
        // Tìm kiếm
        case types.SEARCH_LICH_CHIEU: {
            state.maLichChieuSearch = action.maLichChieuSearch;
            return { ... state }
        }
        // Comment
        case types.ADD_COMMENT: {
            state.addCommentResult = action.addCommentResult;
            if (action.addCommentResult === "Bình luận thành công"){
                showMessageAlertEvent('Notification', action.addCommentResult, 'success');
            }
            return { ...state}
        }
        default:
            return state
    }
}
