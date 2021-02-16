import * as types from '../constants/SettingConstant';
import axios from 'axios';
import { settings } from '../../config/settings'

export const getSettingAction = (maSetting) => {
  // console.log("maSetting", maSetting);
  return dispatch => {
    axios({
      url: settings.domainLocal + `/Setting/LayDanhSachSetting?maSetting=${maSetting}`,
      method: 'GET'
    }).then(result => {
      console.log("getSettingAction", result.data);
      dispatch({
        type: types.GET_SETTING,
        setting: result.data
      })
    }).catch((errors) => {
      //Log ra lỗi backend trả về
    })
  }
}
