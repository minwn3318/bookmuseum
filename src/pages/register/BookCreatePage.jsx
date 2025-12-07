// src/pages/register/BookCreatePage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Box, Grid, Typography, TextField, Button, Card, CardActionArea, CardMedia,} from "@mui/material";

function BookCreatePage() {
    const navigate = useNavigate();
    const location = useLocation();

    // AI 페이지에서 돌아올 때 넘겨준 값들을 초기값으로 사용
    const initialTitle = location.state?.title || "";
    const initialAuthor = location.state?.author || "";
    const initialDescription = location.state?.description || "";
    const initialBookId = location.state?.bookId || Date.now(); // 임시 book_id

    // 입력 폼 상태
    const [title, setTitle] = useState(initialTitle);
    const [author, setAuthor] = useState(initialAuthor);
    const [description, setDescription] = useState(initialDescription);
    const [bookId] = useState(initialBookId); // 고정

    // AI 이미지 페이지에서 돌아오면서 넘겨준 이미지 정보
    const coverImage = location.state?.coverImage || null;
    const coverImageId = location.state?.imageId || null;

    // 버튼 활성화 조건
    const isFormValid =
        title.trim().length > 0 &&
        author.trim().length > 0 &&
        description.trim().length > 0 &&
        !!coverImage;

    const goToAiImagePage = () => {
        if (!title.trim() || !author.trim() || !description.trim()) {
            alert("제목, 저자, 책 내용을 먼저 모두 입력해주세요!");
            return;
        }

        navigate("/ai-image", {
            state: {
                book: {
                    book_id: bookId,
                    title: title.trim(),
                    author: author.trim(),
                    description: description.trim(),
                },
                currentImageId: coverImageId || null,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("제목, 저자, 책 내용, 표지 이미지를 모두 채워주세요!");
            return;
        }

        const payload = {
            title: title.trim(),
            author: author.trim(),
            description: description.trim(),
            coverImage,
            coverImageId,
            // bookId는 실제 DB등록 시엔 백엔드에서 생성
        };

        console.log("도서 등록 데이터:", payload);
        alert("도서 등록이 완료되었습니다! (지금은 콘솔에만 찍힘)");
    };

    return (
        <Box
            sx={{
                width: "100%",
                paddingTop: "218px",  // .detail-container
                paddingLeft: "280px", // .detail-container
                boxSizing: "border-box",
            }}
        >
            {/* 타이틀 */}
            <Typography
                sx={{
                    fontSize: "30px",   // .detail-title
                    fontWeight: 700,
                    marginBottom: "20px",
                }}
            >
                도서 등록
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container columnSpacing={10}>
                    {/* 왼쪽: 표지 이미지 영역 */}
                    <Grid item>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            {/* 이미지 카드 */}
                            <Card
                                sx={{
                                    width: 500,
                                    height: 550,
                                    borderRadius: 2,
                                    border: "1px dashed #d3d3d3",
                                    boxShadow: "none",
                                    bgcolor: "#fafafa",
                                }}
                            >
                                <CardActionArea
                                    onClick={goToAiImagePage}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {coverImage ? (
                                        <CardMedia
                                            component="img"
                                            image={coverImage}
                                            alt="book-cover"
                                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: "50%",
                                                border: "2px solid #e0e0e0",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: 40,
                                                color: "#d0d0d0",
                                            }}
                                        >
                                            +
                                        </Box>
                                    )}
                                </CardActionArea>
                            </Card>

                            {/* 이미지 설명 / 버튼 */}
                            {coverImage ? (
                                <>
                                    <Typography sx={{ fontSize: 15, color: "#555" }}>
                                        표지 이미지가 선택되었습니다.
                                    </Typography>
                                    {coverImageId && (
                                        <Typography sx={{ fontSize: 11, color: "#999" }}>
                                            이미지 ID: {coverImageId}
                                        </Typography>
                                    )}
                                    <Button
                                        variant="outlined"
                                        onClick={goToAiImagePage}
                                        sx={{
                                            mt: 0.5,
                                            width: 500,
                                            height: 32,
                                            fontSize: 13,
                                            borderColor: "#ddd",
                                            color: "#222",
                                        }}
                                    >
                                        이미지 변경하기
                                    </Button>
                                </>
                            ) : (
                                <Typography sx={{ fontSize: 12, color: "#777" }}>
                                    클릭해서 AI로 표지 이미지를 생성하세요.
                                </Typography>
                            )}
                        </Box>
                    </Grid>

                    {/* 오른쪽: 입력 폼 */}
                    <Grid item xs={6}>
                        <Box sx={{ maxWidth: 600 }}>

                            {/* 제목 */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 5,
                                }}
                            >
                                <Box sx={{ width: 60, mr: 1 }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>제목</Typography>
                                </Box>

                                <TextField
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="등록할 제목을 입력해주세요."
                                    sx={{
                                        width: "500px", // 🔥 우리가 조절하는 가로 길이
                                        "& .MuiInputBase-root": {
                                            height: "42px", // 🔥 전체 높이 조절
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: "8px", // 내부 padding
                                        },
                                    }}
                                />
                            </Box>


                            {/* 저자 */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 5,
                                }}
                            >
                                <Box sx={{ width: 60, mr: 1 }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>저자</Typography>
                                </Box>

                                <TextField
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="등록할 저자를 입력해주세요."
                                    sx={{
                                        width: "500px", // 🔥 우리가 조절하는 가로 길이
                                        "& .MuiInputBase-root": {
                                            height: "42px", // 🔥 입력칸 세로 높이
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: "8px",
                                        },
                                    }}
                                />
                            </Box>

                            {/* 내용 */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    mb: 3,
                                }}
                            >
                                <Box sx={{ width: 60, mr: 1, pt: 1 }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>내용</Typography>
                                </Box>

                                <TextField
                                    multiline
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="등록할 설명을 입력해주세요."
                                    sx={{
                                        width: "500px",    // 🔥 가로 길이 조절
                                        "& .MuiInputBase-root": {
                                            padding: 0,
                                        },
                                        "& textarea": {
                                            minHeight: "350px", // 🔥 원하는 만큼 세로 길이 조절
                                            padding: "10px",
                                        },
                                    }}
                                />
                            </Box>

                            {/* 등록 버튼 + 안내 문구 */}
                            <Box
                                sx={{
                                    mt: 2,
                                    width: "580px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    gap: 1,
                                    // ml: "100px",
                                    // mr: "50px",
                                }}
                            >
                                <Typography sx={{ mt: 1, fontSize: 12, color: "#999" }}>
                                    * 제목, 저자, 책 내용, 표지 이미지가 모두 입력되어야 등록할 수 있어요.
                                </Typography>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!isFormValid}
                                    sx={{
                                        width: 100,
                                        height: 40,
                                        fontSize: 14,
                                        bgcolor: isFormValid ? "#222" : "#aaa",
                                        "&:hover": {
                                            bgcolor: isFormValid ? "#333" : "#aaa",
                                        },
                                    }}
                                >
                                    등록
                                </Button>


                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default BookCreatePage;
