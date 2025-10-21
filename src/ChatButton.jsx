import React, { useState, useEffect } from "react";

const ChatButton = ({ initialConfig }) => {

  const [config, setConfig] = useState(initialConfig);

  console.log("config", config);
  

  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 👈 Thêm state popup

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const widgetId = initialConfig?.config_id;

        console.log("🚀 Gửi widget_id:", widgetId);

        if (!widgetId) {
          console.error(
            '❌ Thiếu widget_id! Vui lòng cấu hình window.MyChatConfig = { widget_id: "..." }'
          );
          return;
        }

        const apiUrl = `http://localhost:3100/api/widget-configconfig_id=${encodeURIComponent(
          widgetId
        )}`;
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
  }, [initialConfig?.config_id]);

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
  if (!initialConfig?.config_id || loading) {
    return null;
  }
 
  const renderChannel = (action) => {
    const iconMap = {
      zalo: "/Zalo.png",
      facebook: "/facebook.png",
      hotline: "/hotline.svg",
    };

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
          action?.channel === "hotline"
            ? `tel:${action.text}`
            : action?.channel === "zalo"
            ? "#" // thay bằng link Zalo OA thật
            : "#" // thay bằng link Messenger thật
        }
      >
        <img src={iconMap[action?.channel]} className="size-8" alt="" />
        {action.text && (
          <span className="text-base font-medium text-black">
            {action.text}
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
        {config.text || "Hỗ trợ"}
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
                left: config.position === "bottom-left" ? "40px" : "auto",
                right: config.position === "bottom-right" ? "40px" : "auto",
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
                background: "#191E36",
                color: "white",
                padding: "16px 18px",
                borderRadius: "12px 12px 0 0",
              }}
            >
              <div>{config.popupTitle}</div>
              <button onClick={() => setIsPopupOpen(false)}>
                {/* <FontAwesomeIcon
                    className="cursor-pointer text-base"
                    icon={faCircleMinus}
                  /> */}
                x
              </button>
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
              {(config.popupActions || []).map((action, index) => (
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
