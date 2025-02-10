import { CONTENT_INFO } from "../../data";
import { useTranslation } from "react-i18next";  // 假设你在使用 i18n 进行国际化

const VideoDescription = ({ currentIndex }) => {
  const { i18n } = useTranslation(); // 获取当前语言
  const CurrentContent = CONTENT_INFO[Object.keys(CONTENT_INFO)[currentIndex]];

  // 如果 `CurrentContent` 包含多语言的文本（假设你有 `en` 和 `mi`）
  const h1Text = CurrentContent.h1[i18n.language] || CurrentContent.h1['en'];
  const h2Text = CurrentContent.h2[i18n.language] || CurrentContent.h2['en'];
  const pText = CurrentContent.p[i18n.language] || CurrentContent.p['en'];

  const exploreLinks = [
    "https://www.newzealand.com/int/auckland/", 
    "https://www.newzealand.com/int/queenstown/",
    "https://missionbay.co.nz/", 
    "https://nzadventureguide.com/fairy-falls/",
    "https://www.newzealand.com/int/feature/ski-canterbury-and-mount-cook-mackenzie/",
  ];

  const currentLink = exploreLinks[currentIndex];

  return (
    <section className="text-description">
      <h1>{h1Text}</h1>  {/* 使用当前语言渲染 */}
      <h2>{h2Text}</h2>
      <p>{pText}</p>
      <a href={currentLink}>
        <button>Explore</button>
      </a>
    </section>
  );
};

export default VideoDescription;
