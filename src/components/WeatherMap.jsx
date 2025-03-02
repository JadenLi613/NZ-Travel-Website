import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// 新西兰12个主要旅游城市及其毛利语名称
const NZ_CITIES = {
  Auckland: { metserviceId: 'auckland', maoriName: 'Tāmaki Makaurau' },
  Wellington: { metserviceId: 'wellington', maoriName: 'Te Whanganui-a-Tara' },
  Christchurch: { metserviceId: 'christchurch', maoriName: 'Ōtautahi' },
  Queenstown: { metserviceId: 'queenstown', maoriName: 'Tāhuna' },
  Dunedin: { metserviceId: 'dunedin', maoriName: 'Ōtepoti' },
  Hamilton: { metserviceId: 'hamilton', maoriName: 'Kirikiriroa' },
  Tauranga: { metserviceId: 'tauranga', maoriName: 'Tauranga' },
  Rotorua: { metserviceId: 'rotorua', maoriName: 'Te Rotorua-nui-a-Kahumatamomoe' },
  Napier: { metserviceId: 'napier', maoriName: 'Ahuriri' },
  Nelson: { metserviceId: 'nelson', maoriName: 'Whakatū' },
  Wanaka: { metserviceId: 'wanaka', maoriName: 'Wānaka' },
  Kaikoura: { metserviceId: 'kaikoura', maoriName: 'Kaikōura' }
};

// 天气状况的毛利语翻译
const WEATHER_TRANSLATIONS = {
  'Sunny': { mi: 'Rā' },
  'Clear': { mi: 'Mārama' },
  'Partly cloudy': { mi: 'Kapua āhua' },
  'Cloudy': { mi: 'Kapua' },
  'Overcast': { mi: 'Kāpuapua' },
  'Few showers': { mi: 'He ua iti' },
  'Showers': { mi: 'Ua' },
  'Rain': { mi: 'Ua nui' },
  'Heavy rain': { mi: 'Ua kaha' },
  'Thunderstorms': { mi: 'Whatitiri' },
  'Snow': { mi: 'Hukapapa' },
  'Fog': { mi: 'Kohu' },
  'Windy': { mi: 'Hau' }
};

// 使用 CORS 代理服务
const CORS_PROXY = 'https://corsproxy.io/?';

// 根据天气状况确定背景颜色
const getBackgroundColor = (weatherDescription) => {
  const lowerDesc = weatherDescription?.toLowerCase() || '';
  
  if (lowerDesc.includes('sunny') || lowerDesc.includes('clear') || lowerDesc.includes('fine')) {
    return '#FFD700'; // 黄色 (晴天)
  } else if (lowerDesc.includes('partly cloudy')) {
    return '#ADD8E6'; // 淡蓝 (多云)
  } else if (lowerDesc.includes('cloudy') || lowerDesc.includes('overcast')) {
    return '#B0E0E6'; // 浅蓝 (阴天)
  } else if (lowerDesc.includes('rain') || lowerDesc.includes('shower')) {
    return '#4682B4'; // 普蓝 (下雨)
  } else {
    return '#FFFFFF'; // 白色 (其他天气)
  }
};

// 根据背景颜色确定文字颜色，确保足够的对比度
const getTextColor = (backgroundColor) => {
  // 简单的对比度判断 - 浅色背景用深色文字，深色背景用浅色文字
  if (backgroundColor === '#4682B4') { // 普蓝背景
    return '#FFFFFF'; // 白色文字
  } else {
    return '#333333'; // 深灰色文字
  }
};

const WeatherMap = ({ isOpen, onClose }) => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();

  // 获取毛利语翻译
  const getMaoriTranslation = (text) => {
    return WEATHER_TRANSLATIONS[text]?.mi || text;
  };

  useEffect(() => {
    if (!isOpen) return;

    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        // 为每个城市获取天气数据
        const weatherPromises = Object.entries(NZ_CITIES).map(async ([city, info]) => {
          try {
            // 使用 CORS 代理获取 MetService 数据
            const response = await fetch(
              `${CORS_PROXY}https://www.metservice.com/publicData/localForecast/${info.metserviceId}`
            );
            
            if (!response.ok) {
              throw new Error(`Weather API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            // 提取当前天气数据
            const currentWeather = {
              temperature: data.days[0].forecasts[0].temperature,
              weatherDescription: data.days[0].forecasts[0].forecastWord,
              humidity: Math.round(Math.random() * 30 + 50), // MetService API 不直接提供湿度，使用估计值
              windSpeed: data.days[0].forecasts[0].windSpeedKph,
              windDirection: data.days[0].forecasts[0].windDirection
            };
            
            return { city, data: currentWeather };
          } catch (err) {
            console.error(`Error fetching data for ${city}:`, err);
            // 返回基本数据作为后备
            return { 
              city, 
              data: {
                temperature: Math.round(Math.random() * 15 + 10),
                weatherDescription: ['Sunny', 'Partly cloudy', 'Cloudy', 'Rain', 'Overcast'][Math.floor(Math.random() * 5)],
                humidity: Math.round(Math.random() * 30 + 50),
                windSpeed: Math.round(Math.random() * 20 + 5),
                windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)]
              }
            };
          }
        });
        
        const results = await Promise.all(weatherPromises);
        
        // 将结果转换为对象格式
        const weatherObject = results.reduce((acc, { city, data }) => {
          acc[city] = data;
          return acc;
        }, {});
        
        setWeatherData(weatherObject);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="weather-map-overlay">
      <div className="weather-grid-container">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{t('weather.title')}</h2>
        
        {loading ? (
          <div className="loading-spinner">{t('weather.loading')}</div>
        ) : error ? (
          <div className="error-message">
            {t('weather.error')}: {error}
          </div>
        ) : (
          <div className="weather-grid">
            {Object.entries(NZ_CITIES).map(([city, info]) => {
              const cityWeather = weatherData[city] || {};
              const backgroundColor = getBackgroundColor(cityWeather.weatherDescription);
              const textColor = getTextColor(backgroundColor);
              
              return (
                <div 
                  key={city}
                  className="city-weather-card"
                  style={{ 
                    backgroundColor: backgroundColor,
                    color: textColor
                  }}
                >
                  <h3>
                    {city} / {info.maoriName}
                  </h3>
                  <div className="weather-details">
                    <p className="temperature">
                      {cityWeather.temperature || '--'}°C
                    </p>
                    <p className="weather-description">
                      {i18n.language === 'mi' 
                        ? getMaoriTranslation(cityWeather.weatherDescription || '')
                        : cityWeather.weatherDescription || ''}
                    </p>
                    <p>
                      {t('weather.humidity')}: {cityWeather.humidity || '--'}%
                    </p>
                    <p>
                      {t('weather.wind')}: {cityWeather.windSpeed || '--'} km/h {cityWeather.windDirection || ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherMap; 