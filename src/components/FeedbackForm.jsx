import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './FeedbackForm.css';

const FeedbackForm = ({ onClose }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // 处理点击事件，如果点击位置在模态框外，则关闭模态框
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // 添加点击事件监听
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 直接发送请求，不等待结果，不显示任何错误
    fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).catch(() => {
      // 忽略任何错误
    });
    
    // 直接关闭留言板
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="feedback-overlay">
      <div className="feedback-modal" ref={modalRef}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{t('feedback.title')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t('feedback.name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t('feedback.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">{t('feedback.message')}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            {t('feedback.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm; 