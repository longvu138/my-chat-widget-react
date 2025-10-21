// src/embed.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatButton from './ChatButton.jsx';
import { getConfig } from './config.js';

// Gán React/ReactDOM vào window để tránh lỗi
if (!window.React) window.React = React;
if (!window.ReactDOM) window.ReactDOM = ReactDOM;

function initWidget() {
  if (window.MyChatWidgetLoaded) {
    console.warn('Widget đã được load!');
    return;
  }

  const inject = () => {
    window.MyChatWidgetLoaded = true;

    const container = document.createElement('div');
    container.id = 'my-chat-widget-root';
    document.body.appendChild(container);

    const config = getConfig();
    
    const root = window.ReactDOM.createRoot(container);
    root.render(<ChatButton initialConfig={config} />);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
}

initWidget();