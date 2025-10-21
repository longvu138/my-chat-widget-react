Website A ──┐
            ├─→ Nhúng widget.js + config { widget_id: "web_a_123" }
Website B ──┘
                     ↓
              Gọi API: GET /api/widget-config?widget_id=web_a_123
                     ↓
              Backend trả về: { text: "Liên hệ A", color: "#ff0000", ... }
                     ↓
              Widget render theo config của Website A