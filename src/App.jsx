// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import BookCreatePage from "./pages/register/BookCreatePage.jsx";
import AiImagePage from "./pages/aiImg/AiImagePage.jsx"; // ✅ 추가
import BookUpdatePage from "./pages/update/BookUpdatePage.jsx"; // ⭐ 추가


function App() {
    return (
        <div>
            {/* 임시 네비게이션 */}
            <nav
                style={{
                    padding: "12px 24px",
                    borderBottom: "1px solid #ddd",
                    marginBottom: "16px",
                }}
            >
                <Link to="/" style={{ marginRight: "16px" }}>
                    메인
                </Link>
                <Link to="/register" style={{ marginRight: "16px" }}>
                    도서 등록
                </Link>
                <Link to="/ai-image">AI 이미지 생성</Link>
            </nav>

            <Routes>
                <Route
                    path="/"
                    element={
                        <div style={{ padding: "40px", fontSize: "24px" }}>
                            메인 페이지 (임시)
                        </div>
                    }
                />
                <Route path="/register" element={<BookCreatePage />} />
                <Route path="/ai-image" element={<AiImagePage />} /> {/* ✅ 추가 */}
                <Route path="/book/update/:bookId" element={<BookUpdatePage />} />




            </Routes>
        </div>
    );
}

export default App;
