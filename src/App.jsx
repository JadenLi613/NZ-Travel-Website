import { useState, useEffect } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import Menu from './components/Menu';
import WeatherMap from './components/WeatherMap';
import { useTranslation } from 'react-i18next';
import './i18n'; // 引入 i18n 配置文件
import FeedbackForm from './components/FeedbackForm';

import './App.css';
import { CONTENT_INFO } from './data'; // 引入 CONTENT_INFO 对象，包含多语言文本

function App() {
  const [open, setOpen] = useState(false); // 初始状态设置为 false
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWeatherMap, setShowWeatherMap] = useState(false);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true); // 新增 loading 状态
  const [showFeedback, setShowFeedback] = useState(false);

  // 切换语言的函数
  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  // 处理天气按钮点击
  const handleWeatherClick = () => {
    setShowWeatherMap(true);
  };

  // 关闭天气地图
  const handleCloseWeatherMap = () => {
    setShowWeatherMap(false);
  };

  useEffect(() => {
    // 检查 i18n 是否已经初始化
    if (i18n.isInitialized) {
      setLoading(false); // 如果已初始化，更新 loading 状态
    }
  }, [i18n]);

  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  // 如果正在加载，显示 loading 页面
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="header">
        <div className="language-switcher">
          <button onClick={() => i18n.changeLanguage('en')}>English</button>
          <button onClick={() => i18n.changeLanguage('mi')}>Te Reo Māori</button>
        </div>
        <button className="feedback-button" onClick={toggleFeedback}>
          {t('feedback.button')}
        </button>
      </div>

      {/* 主结构部分 */}
      <section className={open ? "main-structure active" : "main-structure"}>
        <Header open={open} setOpen={setOpen} />
        <Content currentIndex={currentIndex} />
        <Footer onWeatherClick={handleWeatherClick} />
      </section>
      
      {/* 菜单部分 */}
      <Menu setCurrentIndex={setCurrentIndex} />

      {/* 天气地图组件 */}
      <WeatherMap isOpen={showWeatherMap} onClose={handleCloseWeatherMap} />

      {showFeedback && <FeedbackForm onClose={() => setShowFeedback(false)} />}
    </div>
  );
}

export default App;
