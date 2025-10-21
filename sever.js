// // server.js — Backend API mẫu (chạy bằng Node.js)
// import express from "express";
// import cors from "cors";
// const app = express();
// app.use(cors({
//     origin: "*"
// }));

// // CSDL mẫu — thực tế sẽ dùng MongoDB/PostgreSQL...
// const widgetConfigs = {
//   web_a_123: {
//     text: "Liên hệ Website A",
//     icon: "🛒",
//     color: "#e74c3c",
//     clickMessage: "Bạn đang ở Website A!",
//   },
//   web_b_456: {
//     text: "Hỗ trợ Website B",
//     icon: "📞",
//     color: "#27ae60",
//     href: "http://baogam.m1.gobizdev.com",
//   },
//   web_c_789: {
//     text: "Chat với Website C",
//     icon: "💬",
//     color: "#3498db",
//     onClick: "customFunctionC",
//   },
// };

// app.get("/api/widget-config", (req, res) => {
//   const { widget_id } = req.query;

//   if (!widget_id) {
//     return res.status(400).json({ error: "Thiếu widget_id" });
//   }

//   const config = widgetConfigs[widget_id];

//   if (!config) {
//     return res
//       .status(404)
//       .json({ error: "Không tìm thấy config cho widget_id này" });
//   }

//   res.json(config);
// });

// app.get("/", (req, res) => {
//   res.send("✅ Backend API chạy tại http://localhost:3000");
// })

// app.listen(3100, () => {
//   console.log("✅ Backend API chạy tại http://localhost:3000");
// });

// server.js — Backend API mẫu (chạy bằng Node.js)
import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json()); // 👈 hỗ trợ POST nếu cần sau này

// CSDL mẫu — thực tế sẽ dùng MongoDB/PostgreSQL...
const widgetConfigs = {
  web_a_123: {
    title: "LIÊN HỆ ĐỂ ĐƯỢC TƯ VẤN",
    contactLinks: [
      {
        title: "Gọi",
        type: "hotline",
        value: "0708666345",
      },
      {
        title: "Nhắn Messenger",
        type: "facebook",
        value: "764859730045701",
      },
    ],
    color: "#d31414",
    buttonText: "CHAT NGAY",
  },
  web_b_456: {
    text: "Hỗ trợ Website B",
    icon: "📞",
    color: "#27ae60",
    position: "bottom-left",
    popupTitle: "Website B - Cần giúp gì?",
    popupActions: [
      {
        text: "Hotline",
        icon: "📲",
        color: "#e67e22",
        hoverColor: "#d35400",
        href: "tel:19002002",
      },
      {
        text: "Facebook",
        icon: "📘",
        color: "#3b5998",
        hoverColor: "#344e86",
        href: "https://facebook.com/websiteB",
      },
      {
        text: "Form liên hệ",
        icon: "📝",
        color: "#8e44ad",
        hoverColor: "#7d3c98",
        href: "http://baogam.m1.gobizdev.com",
      },
    ],
  },
  web_c_789: {
    text: "Chat với Website C",
    icon: "💬",
    color: "#3498db",
    position: "bottom-right",
    popupTitle: "Website C - Hỗ trợ nhanh",
    popupActions: [
      {
        text: "Tư vấn viên 1",
        icon: "🧑‍💻",
        color: "#16a085",
        hoverColor: "#138d75",
        onClick: "customFunctionC", // 👈 frontend sẽ gọi window.customFunctionC()
      },
      {
        text: "Tư vấn viên 2",
        icon: "👩‍💻",
        color: "#2980b9",
        hoverColor: "#2472a4",
        message: "Vui lòng chờ kết nối...",
      },
      {
        text: "Đóng",
        icon: "❌",
        color: "#c0392b",
        hoverColor: "#a93226",
        onClick: "closePopup", // 👈 bạn có thể định nghĩa hàm này trong window
      },
    ],
  },
};

app.get("/api/widget-config", (req, res) => {
  const { widget_id } = req.query;

  if (!widget_id) {
    return res.status(400).json({ error: "Thiếu widget_id" });
  }

  const config = widgetConfigs[widget_id];

  if (!config) {
    return res
      .status(404)
      .json({ error: "Không tìm thấy config cho widget_id này" });
  }

  res.json(config); // ✅ Trả về đầy đủ: text, icon, popupTitle, popupActions...
});

app.get("/", (req, res) => {
  res.send(`
    <h1>✅ Backend API đang chạy</h1>
    <p>Port: 3100</p>
    <p>Thử gọi API:</p>
    <ul>
      <li><a href="/api/widget-config?widget_id=web_a_123">web_a_123</a></li>
      <li><a href="/api/widget-config?widget_id=web_b_456">web_b_456</a></li>
      <li><a href="/api/widget-config?widget_id=web_c_789">web_c_789</a></li>
    </ul>
  `);
});

app.listen(3100, () => {
  console.log("✅ Backend API chạy tại http://localhost:3100");
  console.log(
    "👉 Thử truy cập: http://localhost:3100/api/widget-config?widget_id=web_a_123"
  );
});
