import { useState, useEffect } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import Menu from './components/Menu';
import { useTranslation } from 'react-i18next';
import './i18n'; // 引入 i18n 配置文件

import './App.css';
import { CONTENT_INFO } from './data'; // 引入 CONTENT_INFO 对象，包含多语言文本

function App() {
  const [open, setOpen] = useState(false); // 初始状态设置为 false
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true); // 新增 loading 状态

  // 切换语言的函数
  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    // 检查 i18n 是否已经初始化
    if (i18n.isInitialized) {
      setLoading(false); // 如果已初始化，更新 loading 状态
    }
  }, [i18n]);

  // 如果正在加载，显示 loading 页面
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {/* 主结构部分 */}
      <section className={open ? "main-structure active" : "main-structure"}>
        <Header open={open} setOpen={setOpen} />
        <Content currentIndex={currentIndex} />
        <Footer />
      </section>
      
      {/* 菜单部分 */}
      <Menu setCurrentIndex={setCurrentIndex} />

      {/* 内容区域，显示多语言文本 */}
      <div className="language-switcher">
        {/* 切换语言按钮 */}
        <button onClick={() => switchLanguage('en')}>{t('languageSwitch')} - English</button>
        <button onClick={() => switchLanguage('mi')}>{t('languageSwitch')} - Māori</button>
      </div>
    </div>
  );
}

export default App;
