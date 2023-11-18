
import baseUrl from '@/api/env.js'
export default {
    // 获取文件上传地址
    findFileList: baseUrl + '/system/remote/system/find/file/list',

    //  文件上传
    fileUpload: baseUrl + '/system/remote/system/appUploadBase64Img'
}