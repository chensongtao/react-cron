import zh from './zh';

import en from './en';

const getI18n = (locale) => {
  if (locale === 'zh_CN' || locale === 'zh-CN' || locale === 'zh-Hans-CN' || locale === 'zh_Hans_CN') {
    return zh;
  }
  if (locale === 'en_US' || locale === 'en-US') {
    return en;
  }
}

export default getI18n;
