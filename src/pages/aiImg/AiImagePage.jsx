// src/pages/ai/AiImagePage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AiImagePage() {
    const location = useLocation();
    const navigate = useNavigate();

    // ✅ BookCreatePage에서 넘어온 도서 정보
    const rawBook = location.state?.book || {
        book_id: 23,
        title: "혼자 공부하는 파이썬",
        author: "저자 미입력",
        description: "",
    };

    const bookId = rawBook.book_id ?? rawBook.id; // 둘 중 있는 값 사용
    const bookTitle = rawBook.title ?? "제목 없음";

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ image 상태: DB 기준
    // - img_id (PK, BIGINT)
    // - book_id (FK, BIGINT)
    // - img_url (VARCHAR2)
    const [image, setImage] = useState(null); // { imgId, bookId, imgUrl }
    const [error, setError] = useState(null);

    // ✅ 이미지 생성 버튼 클릭 시
    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            alert("이미지 설명을 입력해줘!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 🔥 나중에 실제 GPT 이미지 API 호출 시에는 아래 형식으로 맞추면 됨
            /*
            const res = await fetch("/api/ai-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookId: bookId,        // -> 백엔드에서 book_id 로 매핑
                    title: bookTitle,
                    prompt,
                }),
            });

            const data = await res.json();
            // data 예시: { img_id: 10, book_id: 3, img_url: "https://..." }

            setImage({
                imgId: data.img_id,
                bookId: data.book_id,
                imgUrl: data.img_url,
            });
            */

            // 🧪 지금은 더미 이미지로 시뮬레이션
            await new Promise((r) => setTimeout(r, 800));

            const fakeImgId = Date.now(); // 임시 img_id
            const fakeImgUrl = `https://picsum.photos/seed/${fakeImgId}/600/400`;

            setImage({
                imgId: fakeImgId,
                bookId: bookId,
                imgUrl: fakeImgUrl,
            });
        } catch (e) {
            console.error(e);
            setError("이미지 생성 중 오류가 발생했어.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ 이미지 등록 버튼: 도서등록 페이지로 돌아가면서 이미지 + 기존 도서 정보 전달
    const handleSelectImage = () => {
        if (!image) {
            alert("먼저 이미지를 생성해줘!");
            return;
        }

        navigate("/register", {
            state: {
                // 표지 이미지 정보
                coverImage: image.imgUrl, // img_url
                imageId: image.imgId,     // img_id
                bookId: image.bookId,     // book_id (필요하면 사용)

                // 다시 돌아갔을 때 입력값 유지용
                title: rawBook.title,
                author: rawBook.author,
                description: rawBook.description,
            },
        });
    };

    return (
        <div style={{ padding: "40px 80px" }}>
            {/* 책 정보 영역 */}
            <div style={{ marginBottom: "32px" }}>
                <div style={{ fontSize: "14px", color: "#555", marginBottom: "4px" }}>
                    도서 :
                </div>
                <div style={{ fontSize: "20px", fontWeight: 600 }}>
                    『{bookTitle}』
                </div>
                <div
                    style={{
                        fontSize: "12px",
                        color: "#999",
                        marginTop: "4px",
                        marginBottom: "16px",
                    }}
                >
                    book_id : {bookId}
                </div>

                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
                    도서 제목 + 설명을 기반으로 표지 이미지를 생성해볼게요.
                </div>

                {/* 프롬프트 입력 */}
                <textarea
                    placeholder="어떤 스타일의 책 표지를 만들고 싶은지 자세히 적어줘요. (예: 파스텔톤, 귀여운 일러스트, 고양이가 책 읽는 모습 등)"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "100px",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        fontSize: "13px",
                        resize: "vertical",
                    }}
                />
            </div>

            {/* 이미지 생성 버튼 */}
            <button
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "40px",
                    backgroundColor: "#222",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "14px",
                    cursor: "pointer",
                    marginBottom: "32px",
                    opacity: loading ? 0.7 : 1,
                }}
                onClick={handleGenerateImage}
                disabled={loading}
            >
                {loading ? "이미지 생성 중..." : "이미지 생성하기"}
            </button>

            {/* 에러 메시지 */}
            {error && (
                <div style={{ color: "red", fontSize: "12px", marginBottom: "12px" }}>
                    {error}
                </div>
            )}

            {/* 이미지 영역 */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "280px",
                    marginBottom: "8px",
                    backgroundColor: "#f3f3f3",
                    borderRadius: "4px",
                    border: "1px solid #e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ccc",
                    fontSize: "48px",
                    overflow: "hidden",
                }}
            >
                {image ? (
                    <img
                        src={image.imgUrl}
                        alt="generated-cover"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                ) : (
                    "🖼"
                )}
            </div>

            {/* 이미지 메타 정보 (선택) */}
            {image && (
                <div
                    style={{
                        maxWidth: "600px",
                        fontSize: "12px",
                        color: "#777",
                        marginBottom: "24px",
                    }}
                >
                    img_id : {image.imgId} / book_id : {image.bookId}
                </div>
            )}

            {/* 이미지 등록 버튼 */}
            <button
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "40px",
                    backgroundColor: image ? "#222" : "#888",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "14px",
                    cursor: image ? "pointer" : "not-allowed",
                }}
                onClick={handleSelectImage}
                disabled={!image}
            >
                이미지 등록
            </button>
        </div>
    );
}

export default AiImagePage;
