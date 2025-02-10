import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 引入翻译文件
import enTranslation from '../public/assets/locales/en.json';
import miTranslation from '../public/assets/locales/mi.json';

// 初始化 i18next
i18n
  .use(initReactI18next) // 使用 react-i18next 插件
  .init({
    resources: {
      en: { translation: enTranslation }, // 英文翻译
      mi: { translation: miTranslation }, // Māori 翻译
    },
    fallbackLng: 'en', // 默认语言
    lng: 'en', // 初始语言
    react: {
      useSuspense: false, // 禁用 Suspense 避免白屏
    },
  });

export default i18n;
