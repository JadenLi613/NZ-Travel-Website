import Video from './Video/Video';
import VideoDescription from './Video/VideoDescription';
import { CONTENT_INFO } from '../data';

const Content = ({ currentIndex }) => {
  const contentKeys = Object.keys(CONTENT_INFO); // 获取内容的所有键
  const currentItem = contentKeys[currentIndex]; // 获取当前索引对应的内容项

  return (
    <div className="content">
      {contentKeys.map((item, index) => (
        <Video
          key={index}
          active={currentIndex === index}
          src={CONTENT_INFO[item].src}
        />
      ))}

      {/* 根据 currentIndex 设置对应的覆盖层类名 */}
      <div className={`video-overlay video-overlay-${currentItem}`}></div>

      {/* 渲染视频描述组件并传递 currentIndex */}
      <VideoDescription currentIndex={currentIndex} />
    </div>
  );
};

export default Content;
