import config from '@/common/config'
const baseUrl =
	process.env.NODE_ENV === 'development' ?
	config.API_DEV_HOST : config.API_PRO_HOST;

export default baseUrl 