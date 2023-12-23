export interface GlobConfig {
  // 网站名称
  title: string
  // 项目缩写
  shortName: string
  // 服务接口url
  apiUrl: string
  // 服务接口url前缀
  urlPrefix?: string
  // 上传url
  uploadUrl?: string
}

export interface GlobEnvConfig {
  // 网站名称
  VITE_GLOB_APP_TITLE: string
  // 项目缩写
  VITE_GLOB_APP_SHORT_NAME: string
  // 服务接口url
  VITE_GLOB_API_URL: string
  // 服务接口url前缀
  VITE_GLOB_API_URL_PREFIX?: string
  // 上传url
  VITE_GLOB_UPLOAD_URL?: string
}
