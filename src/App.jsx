import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ChatWidget from "./ChatButton";

function App() {
  const [count, setCount] = useState(0);
  // Mô phỏng config như khi nhúng vào website thật
  const mockConfig = {
    text: "Chat ngay",
    color: "#191E36",
    position: "bottom-right",
    popupTitle: "LIÊN HỆ ĐỂ ĐƯỢC TƯ VẤN",
    popupActions: [
      { text: "0999 999 999", channel: "hotline" },
      { text: "Nhắn Zalo", channel: "zalo" },
      { text: "Nhắn Messenger", channel: "facebook" },
    ],
  };

  const wdId = {
    widget_id: 'bbf7e002-2095-4c1b-a372-64f4b0d4d749'
  }
  
  return (
    <>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>🛠️ Debug Mode - Widget Preview</h1>
        <p>👉 Widget sẽ render ở góc dưới bên phải màn hình.</p>
        <p>👉 Mở DevTools để xem console, sửa code, hot-reload tự động!</p>
        <ChatWidget initialConfig={wdId} />
      </div>
    </>
  );
}

export default App;
