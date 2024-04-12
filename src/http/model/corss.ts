
export namespace CorssUrl {
  const baseApi = import.meta.env.VITE_APP_PING_TAI
  export const getCrossInfo = `${baseApi}/dwdTfcEtyRdnetCrossInfo/getCrossInfo`
  export const stepControl = `${baseApi}/dwdTfcEtyRdnetCrossInfo/stepControl`
  export const specialControl = `${baseApi}/dwdTfcEtyRdnetCrossInfo/specialControl`
  export const getList = `${baseApi}/adsTfcEsigcloudSpecialServiceRoad/getList`
  export const getCrossList = `${baseApi}/adsTfcEsigcloudSpecialServiceRoad/getCrossList`
  export const getPlanForApp = `${baseApi}/adsTfcEsigcloudSpecialServiceRoad/getPlanForApp`
  export const passLock = `${baseApi}/adsTfcEsigcloudSpecialServiceRoad/passLock`
  export const passUnLockForOne = `${baseApi}/adsTfcEsigcloudSpecialServiceRoad/passUnLockForOne`
  export const getListForApp = `${baseApi}/adsTfcEsigcloudSpecialServiceRoad/getListForApp`
  export const getPhaseListByCrossIdList = `${baseApi}/dwdTfcEtyRdnetCrossInfo/getPhaseListByCrossIdList`
}
