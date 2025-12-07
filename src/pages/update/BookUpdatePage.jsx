// src/pages/update/BookUpdatePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import noneImg from "../../asserts/noneimg.png";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Card,
    CardActionArea,
    CardMedia,
} from "@mui/material";

function BookUpdatePage() {
    const navigate = useNavigate();
    const location = useLocation();

    // AiImagePage에서 돌아온 경우 들어오는 값들
    const fromAi = location.state || {};

    const [book_id, setBookId] = useState(fromAi.book_id || 1);
    const [title, setTitle] = useState(fromAi.title || "고양이와 함께한 순간");
    const [author, setAuthor] = useState(fromAi.author || "이수린");
    const [description, setDescription] = useState(fromAi.description || "책 내용!");
    const [coverImage, setCoverImage] = useState(fromAi.coverImage || noneImg);
    const [coverImageId, setCoverImageId] = useState(fromAi.imageId || 1001);

    // 버튼 활성화 여부
    const isFormValid = !!(
        title.trim() &&
        author.trim() &&
        description.trim() &&
        coverImage
    );

    useEffect(() => {
        // AiImagePage에서 돌아올 때 state가 갱신된 경우 반영
        if (fromAi.coverImage) {
            setCoverImage(fromAi.coverImage);
            setCoverImageId(fromAi.imageId || null);
        }
        if (fromAi.book_id) {
            setBookId(fromAi.book_id);
        }
        if (fromAi.title) setTitle(fromAi.title);
        if (fromAi.author) setAuthor(fromAi.author);
        if (fromAi.description) setDescription(fromAi.description);
    }, [fromAi]);

    const goToAiImage = () => {
        navigate("/ai-image", {
            state: {
                mode: "edit",   // ✅ 수정 모드
                book: {
                    book_id,
                    title,
                    author,
                    description,
                },
                currentImageId: coverImageId,
            },
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("모든 정보를 입력해야 수정할 수 있어!");
            return;
        }

        const payload = {
            book_id,
            title,
            author,
            description,
            coverImage,
            coverImageId,
        };

        console.log("수정 데이터:", payload);
        alert("수정 완료!");
    };

    return (
        <Box
            sx={{
                width: "100%",
                paddingTop: "218px",
                paddingLeft: "280px",
                boxSizing: "border-box",
            }}
        >
            {/* 타이틀 */}
            <Typography
                sx={{
                    fontSize: "30px",
                    fontWeight: 700,
                    marginBottom: "20px",
                }}
            >
                도서 수정
            </Typography>

            <Box component="form" onSubmit={handleEdit}>
                <Grid container columnSpacing={10}>
                    {/* LEFT - 이미지 영역 */}
                    <Grid item>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Card
                                sx={{
                                    width: 500,
                                    height: 550,
                                    borderRadius: 2,
                                    border: "1px dashed #ccc",
                                    boxShadow: "none",
                                    bgcolor: "#fafafa",
                                }}
                            >
                                <CardActionArea
                                    onClick={goToAiImage}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={coverImage || noneImg}
                                        alt="book-cover"
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </CardActionArea>
                            </Card>

                            <Button
                                type="button"
                                variant="outlined"
                                onClick={goToAiImage}
                                sx={{
                                    mt: 2.0,
                                    width: 150,
                                    height: 36,
                                    fontSize: 14,
                                    bgcolor: "#000",
                                    color: "#fff",
                                    ml: "340px",
                                    "&:hover": {
                                        bgcolor: "#222",
                                    },
                                }}
                            >
                                이미지 재생성
                            </Button>
                        </Box>
                    </Grid>

                    {/* RIGHT - 입력 영역 */}
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                maxWidth: 600,
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                                pt: "20px",
                            }}
                        >
                            {/* 제목 */}
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box sx={{ width: 60, mr: 3 }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                                        제목
                                    </Typography>
                                </Box>

                                <TextField
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="등록할 제목을 입력해주세요."
                                    sx={{
                                        width: "500px",
                                        "& .MuiInputBase-root": {
                                            height: "42px",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: "8px",
                                        },
                                    }}
                                />
                            </Box>

                            {/* 저자 */}
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box sx={{ width: 60, mr: 3 }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                                        저자
                                    </Typography>
                                </Box>

                                <TextField
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="등록할 저자를 입력해주세요."
                                    sx={{
                                        width: "500px",
                                        "& .MuiInputBase-root": {
                                            height: "42px",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: "8px",
                                        },
                                    }}
                                />
                            </Box>

                            {/* 내용 */}
                            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                <Box sx={{ width: 60, mr: 3, pt: 1 }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                                        내용
                                    </Typography>
                                </Box>

                                <TextField
                                    multiline
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="등록할 설명을 입력해주세요."
                                    sx={{
                                        width: "500px",
                                        "& .MuiInputBase-root": {
                                            padding: 0,
                                        },
                                        "& textarea": {
                                            minHeight: "350px",
                                            padding: "10px",
                                        },
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    width: "580px",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    mt: 0.5,
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!isFormValid}
                                    sx={{
                                        width: 90,
                                        height: 40,
                                        fontSize: 14,
                                        bgcolor: isFormValid ? "#222" : "#aaa",
                                        "&:hover": {
                                            bgcolor: isFormValid ? "#333" : "#aaa",
                                        },
                                    }}
                                >
                                    수정
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default BookUpdatePage;
