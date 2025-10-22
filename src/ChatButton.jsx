import React, { useState, useEffect } from "react";
import { appConfig } from "./appConfig";
import minusIcon from "./resources/images/minus.svg";
import zalo from "./resources/images/zalo.png";
import facebook from "./resources/images/facebook.png";
import hotline from "./resources/images/hotline.svg";

const ChatButton = ({ initialConfig }) => {
  const [config, setConfig] = useState(initialConfig);

  console.log("config", config);

  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const widgetId = initialConfig?.widget_id;
        console.log("🚀 Gửi widget_id:", widgetId);

        if (!widgetId) {
          console.error(
            '❌ Thiếu widget_id! Vui lòng cấu hình window.MyChatConfig = { widget_id: "..." }'
          );
          return;
        }

        const apiUrl = `${
          appConfig.apiUrl
        }/chatbots/channels/web-widget/config/${encodeURIComponent(widgetId)}`;
        console.log("🔗 Gọi API:", apiUrl);

        const response = await fetch(apiUrl);

        console.log("📡 Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const remoteConfig = await response.json();
        console.log("✅ Nhận config:", remoteConfig);

        setConfig((prev) => ({
          ...prev,
          ...remoteConfig,
        }));
      } catch (error) {
        console.error("❌ Lỗi khi tải config:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [initialConfig?.widget_id]);

  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // 👇 Xử lý khi click nút trong popup
  // const handlePopupAction = (actionConfig) => {
  //   if (actionConfig.onClick) {
  //     if (typeof window[actionConfig.onClick] === "function") {
  //       window[actionConfig.onClick]();
  //     } else {
  //       console.warn(`Hàm ${actionConfig.onClick} không tồn tại!`);
  //     }
  //   } else if (actionConfig.href) {
  //     window.open(actionConfig.href, actionConfig.target || "_blank");
  //   } else if (actionConfig.message) {
  //     alert(actionConfig.message);
  //   }
  // };

  // 👇 Ẩn nút nếu đang tải hoặc thiếu widget_id
  if (!initialConfig?.widget_id || loading) {
    return null;
  }

  const renderChannel = (action) => {
    const iconMap = {
      zalo: zalo,
      facebook: facebook,
      hotline: hotline,
    };
    console.log("action", action);

    return (
      <a
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          textDecoration: "none",
        }}
        href={
          action?.type === "hotline"
            ? `tel:${action.value}`
            : action?.type === "zalo"
            ? `https://zalo.me/${action.value}`
            : action?.type === "facebook"
            ? `https://www.facebook.com/messages/t/${action?.value}`
            : "#"
        }
        target="_blank"
      >
        <img
          src={iconMap[action?.type]}
          style={{ width: "24px", maxHeight: "24px", maxWidth: "24px" }}
          alt=""
        />
        {action.title && (
          <span style={{ color: "black", fontSize: "1rem", fontWeight: "500" }}>
            {action?.type === "hotline"
              ? `${action.title} ${action.value}`
              : action.title}
          </span>
        )}
      </a>
    );
  };

  return (
    <>
      {/* Nút chat */}
      <div
        id="my-chat-button"
        onClick={handleTogglePopup}
        style={{
          position: "fixed",
          zIndex: 2147483647,
          // ...getButtonPosition(),
          bottom: "20px",
          right: "20px",
          padding: "12px 24px",
          backgroundColor: config.color || "#191E36",
          color: "white",
          borderRadius: "9999px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          cursor: "pointer",
          userSelect: "none",
          textTransform: "uppercase",
        }}
      >
        {config.buttonText || "Chat ngay"}
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <>
          {/* Overlay nền */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2147483645,
            }}
            onClick={() => setIsPopupOpen(false)}
          />

          {/* Nội dung popup */}
          <div
            style={{
              position: "fixed",
              bottom: "90px",
              ...(config.position === "bottom-left"
                ? { left: "20px" }
                : { right: "20px" }),
              width: "320px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              zIndex: 2147483646,
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mũi tên */}
            <div
              style={{
                position: "absolute",
                bottom: "-12px",
                right: "48px",
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "12px solid white",
              }}
            />

            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: config.color,
                color: "white",
                padding: "16px 18px",
                borderRadius: "12px 12px 0 0",
              }}
            >
              <div className="font-normal text-base">{config.title}</div>
              <span
                onClick={() => setIsPopupOpen(false)}
                style={{ cursor: "pointer" }}
              >
                <img
                  // src={"../src/resources/images/minus.svg"}
                  src={minusIcon}
                  style={{ width: "20px", height: "20px" }}
                  alt=""
                />
              </span>
            </div>

            {/* Nội dung */}
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              {(config.contactLinks || []).map((action, index) => (
                <React.Fragment key={index}>
                  {renderChannel(action)}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatButton;
