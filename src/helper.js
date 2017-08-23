/**
 * 将字符串转为破折连接形式
 * @param {string} str 
 * @return {string}
 */
export const normalizeToBreak = str => str.replace(/[A-Z]/g, data => `-${data.toLowerCase()}`)

/**
 * 将字符串转为驼峰形式
 * @param {string} str 
 * @return {string}
 */
export const normalizeToCamel = str => str.replace(/\-[a-z]/g, data => data.substr(1).toUpperCase())
