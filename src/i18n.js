import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 引入翻译文件
import enTranslation from '../public/assets/locales/en.json';
import miTranslation from '../public/assets/locales/mi.json';

const resources = {
  en: {
    translation: {
      feedback: {
        button: 'Leave Feedback',
        title: 'Share Your Feedback',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        submit: 'Submit',
        success: 'Thank you for your feedback!',
        error: 'Failed to submit feedback. Please try again.',
        timeout: 'Request timed out. Your feedback will be saved locally.'
      }
    }
  },
  mi: {
    translation: {
      feedback: {
        button: 'Tukua he Whakahoki Kōrero',
        title: 'Tukua ō Whakaaro',
        name: 'Ingoa',
        email: 'Īmēra',
        message: 'Karere',
        submit: 'Tuku',
        success: 'Ngā mihi mō ō whakahoki kōrero!',
        error: 'Kāore i taea te tuku. Ngāna anō.',
        timeout: 'Kua pau te wā. Ka tiakina ō kōrero ki te rokiroki o tō rorohiko.'
      }
    }
  }
};

// 初始化 i18next
i18n
  .use(initReactI18next) // 使用 react-i18next 插件
  .init({
    resources,
    fallbackLng: 'en', // 默认语言
    lng: 'en', // 初始语言
    react: {
      useSuspense: false, // 禁用 Suspense 避免白屏
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
