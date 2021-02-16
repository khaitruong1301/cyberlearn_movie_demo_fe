import {combineReducers} from 'redux';
import { MovieManageReducer } from './MovieManageReducer';
import { TheaterSystemManageReducer } from './TheaterSystemManageReducer';
import { BookingManageReducer } from './BookingManageReducer';
import { MemberManageReducer } from './MemberManageReducer';
import { DashboardReducer } from './DashboardReducer'
import { SettingReducer } from './SettingReducer'
 
export const rootReducer = combineReducers({
    //Nơi khai báo các reducer con ứng dụng
    // MOVIE MANAGE
    MovieManageReducer,
    TheaterSystemManageReducer,
    BookingManageReducer,
    MemberManageReducer,
    DashboardReducer,
    SettingReducer
});