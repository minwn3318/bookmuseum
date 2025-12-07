// src/pages/aiImg/AiImagePage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import noneImg from "../../asserts/noneimg.png";
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardMedia,
    CardContent,
    Stack,
    CircularProgress,
} from "@mui/material";

function AiImagePage() {
    const location = useLocation();
    const navigate = useNavigate();

    // 등록에서 왔는지(create) / 수정에서 왔는지(edit)
    const mode = location.state?.mode ?? "create";

    // BookCreatePage 또는 BookUpdatePage에서 넘겨준 도서 정보
    const rawBook = location.state?.book;

    if (!rawBook) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#f5f5f5",
                    p: 3,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    잘못된 접근입니다.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    도서 등록/수정 화면에서 다시 시도해주세요.
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate("/register")}
                >
                    도서 등록으로 돌아가기
                </Button>
            </Box>
        );
    }

    // 프론트에서 book_id로 통일
    const book_id = rawBook.book_id ?? null;
    const book_title = rawBook.title ?? "";
    const book_author = rawBook.author ?? "";
    const book_description = rawBook.description ?? "";

    //  OpenAI API 키 (연습이라 화면에서 받도록)
    const [apiKey, setApiKey] = useState("");

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null); // { imgId, book_id, imgUrl }
    const [error, setError] = useState(null);

    // ==============================
    // 🔷 OpenAI 이미지 생성 호출부
    // ==============================
    const handleGenerateImage = async () => {
        if (!apiKey.trim()) {
            alert("OpenAI API 키를 먼저 입력해줘!");
            return;
        }
        if (!prompt.trim()) {
            alert("이미지 설명을 입력해줘!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. fetch 헤더 (Headers)
            const response = await fetch(
                "https://api.openai.com/v1/images/generations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiKey}`, // 'Bearer ' 꼭 포함
                    },
                    // 2. fetch 바디 (Body)
                    body: JSON.stringify({
                        prompt: prompt,           // 도서 제목/내용 기반 설명
                        model: "dall-e-3",        // 또는 "dall-e-2"
                        n: 1,                     // 생성 이미지 개수
                        size: "1024x1024",        // 슬라이드 예시
                        quality: "standard",      // "standard" | "hd"
                        style: "vivid",           // "vivid" | "natural"
                        response_format: "url",   // URL로 받기
                    }),
                }
            );

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                console.error("OpenAI error:", errData);
                throw new Error(errData.error?.message || "OpenAI 요청 실패");
            }

            // 🔍 OpenAI 응답(JSON) 파싱
            const data = await response.json();

            // data.data 배열의 0번째 url 추출 (슬라이드와 동일)
            const imageUrl = data.data?.[0]?.url;
            if (!imageUrl) {
                throw new Error("이미지 URL이 응답에 없습니다.");
            }

            console.log("생성된 이미지 URL:", imageUrl);

            // React 상태에 저장해서 미리보기 + 다음 단계로 넘기기
            setImage({
                imgId: Date.now(), // 프론트 임시 id
                book_id,
                imgUrl: imageUrl,
            });

            // 여기서 바로 Spring Boot로 보내고 싶으면 (슬라이드 3번 단계)
            // await bookService.updateBookCoverUrl(book_id, imageUrl);
        } catch (e) {
            console.error(e);
            setError(e.message || "이미지 생성 중 오류가 발생했어.");
        } finally {
            setLoading(false);
        }
    };

    // 생성된 이미지 선택 → 원래 페이지로 이동
    const handleSelectImage = () => {
        if (!image) {
            alert("먼저 이미지를 생성해줘!");
            return;
        }

        const commonState = {
            coverImage: image.imgUrl,
            imageId: image.imgId,
            book_id, //

            // 기존 입력값 유지
            title: book_title,
            author: book_author,
            description: book_description,
        };

        if (mode === "edit") {
            //  도서 수정 페이지로 복귀
            navigate("/update", {
                state: commonState,
            });
        } else {
            //  도서 등록 페이지로 복귀
            navigate("/register", {
                state: commonState,
            });
        }
    };

    return (
        <Box
            className="detail-container"
            sx={{
                width: "100%",
                paddingTop: "218px",
                paddingLeft: "280px",
                boxSizing: "border-box",
                minHeight: "100vh",
                maxWidth: 960,
                mx: "auto",
                px: 3,
            }}
        >
            <Box
                sx={{
                    maxWidth: 960,
                    bgcolor: "#ffffff",
                    mx: "auto",
                    px: 3,
                }}
            >
                {/* 상단: 도서 정보 + 안내 */}
                <Box sx={{ mb: 4 }}>
                    {/* 도서정보: 제목 (가로 정렬) */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: 30 }}>
                            도서:
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 30 }}>
                            {book_title}
                        </Typography>
                    </Box>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 0.5, mb: 2 }}
                    >
                       ID : {book_id}
                    </Typography>

                    {/* 🔑 API 키 입력 */}
                    <TextField
                        label="OpenAI API Key"
                        type="password"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />

                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        원하는 표지 이미지를 생성해보세요.
                    </Typography>

                    <TextField
                        label="이미지 설명 (프롬프트)"
                        placeholder="예: 파스텔톤, 따뜻한 일러스트, 책 읽는 고양이 등"
                        multiline
                        minRows={3}
                        fullWidth
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </Box>

                {/* 가운데: 버튼 + 이미지 카드 */}
                <Stack spacing={3} alignItems="center">
                    {/* 이미지 생성 버튼 */}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            maxWidth: 880,
                            height: 44,
                            backgroundColor: "#000",
                            "&:hover": {
                                backgroundColor: "#333",
                            },
                        }}
                        onClick={handleGenerateImage}
                        disabled={loading}
                        startIcon={
                            loading ? <CircularProgress size={18} color="inherit" /> : null
                        }
                    >
                        {loading ? "이미지 생성 중..." : "이미지 생성하기"}
                    </Button>

                    {/* 에러 메시지 */}
                    {error && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{ maxWidth: 600, alignSelf: "stretch" }}
                        >
                            {error}
                        </Typography>
                    )}

                    {/* 이미지 카드 */}
                    <Card
                        sx={{
                            width: "100%",
                            maxWidth: 600,
                            borderRadius: 2,
                            boxShadow: 3,
                            overflow: "hidden",
                            height: 400,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "#f5f5f5",
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={image ? image.imgUrl : noneImg}
                            alt="generated-cover"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Card>

                    {/* 이미지 메타 정보 */}
                    {image && (
                        <Card
                            sx={{
                                width: "100%",
                                maxWidth: 600,
                                borderRadius: 2,
                                bgcolor: "#fafafa",
                            }}
                        >
                            <CardContent sx={{ py: 1.5 }}>
                                <Typography variant="caption" color="text.secondary">
                                    img_id : {image.imgId} / book_id : {image.book_id}
                                </Typography>
                            </CardContent>
                        </Card>
                    )}

                    {/* 이미지 등록 버튼 */}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            maxWidth: 880,
                            height: 44,
                            backgroundColor: "#000",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#222",
                            },
                            "&.Mui-disabled": {
                                backgroundColor: "#888",
                                color: "#fff",
                            },
                        }}
                        onClick={handleSelectImage}
                        disabled={!image}
                    >
                        이미지 등록
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default AiImagePage;
