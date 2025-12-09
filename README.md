# 창작 도서 관리 시스템 "걷기가 서재" (프론엔드)
> **백엔드 깃허브 링크** : [https://github.com/Y9957/demo]

## 1. 프로젝트 소개
걷기가 서재의 “작가의 산책” 서비스는 누구나 작가가 되어 자유롭게 글을 집필하고 공개할
수 있는 창작 플랫폼 입니다. 본 깃허브 프로젝트는 걷기가 서재의 인터페이스, 화면이동, 서버와의 연결을 제공하는 UX단을 담당하고 있습니다

## 2. 주요 기능
- 서버 api 연결
- 화면 상호작용
- 화면 전환
- 오픈 AI api 연결
   
## 3. 기술 스택
- SpringBoots
- RESTful API
- Spring Security
- Cookie & JWT
- H2-console
- JPA Repository

## 4. 시스템 아키텍처 구조
<대에에충 아키텍처 이미지 모습, 브라우저 -> 리엑트 -> 에이아이, 스프링부트 >   
 
## 5. 프로젝트 디렉터리 <간략>
```
src
└── main
    └── java
        └── com.example.demo
            ├── config
            │   └── WeConfig.java
            ├── configuration
            │   └── SecurityConfig.java
            ├── controller
            │   ├── BookController.java
            │   ├── CommentController.java
            │   ├── MemberController.java
            │   └── MypageController.java
            ├── domain
            │   ├── Book.java
            │   ├── Comment.java
            │   ├── Likes.java
            │   └── Member.java
            ├── dto
            ├── exception
            │   └── GlobalExceptionHandler.java
            ├── repository
            ├── security
            └── service
```
## 7. 주요 API 명세 
### Book API 목록
| 기능       | Method | Endpoint                        |
| -------- | ------ | ------------------------------- |
| 도서 등록    | POST   | `/api/books/register`           |
| 도서 인기 목록 조회 | GET    | `/api/books/list`               |
| 좋아요 표시    | PUT    | `/api/books/update`             |
| 이미지 저장    | DELETE | `/api/books/delete?id={bookId}` |
   
### Comment API 목록
| 기능       | Method | Endpoint                        |
| -------- | ------ | ------------------------------- |
| 도서 등록    | POST   | `/api/books/register`           |
| 도서 목록 조회 | GET    | `/api/books/list`               |
| 도서 상세 조회 | GET    | `/api/books/detail?id={bookId}` |
| 도서 수정    | PUT    | `/api/books/update`             |
| 도서 삭제    | DELETE | `/api/books/delete?id={bookId}` |
   
### Member API 목록
| 기능       | Method | Endpoint                        |
| -------- | ------ | ------------------------------- |
| 도서 등록    | POST   | `/api/books/register`           |
| 도서 목록 조회 | GET    | `/api/books/list`               |
| 도서 상세 조회 | GET    | `/api/books/detail?id={bookId}` |
| 도서 수정    | PUT    | `/api/books/update`             |
| 도서 삭제    | DELETE | `/api/books/delete?id={bookId}` |
  
### MyPageAPI 목록
| 기능       | Method | Endpoint                        |
| -------- | ------ | ------------------------------- |
| 도서 등록    | POST   | `/api/books/register`           |
| 도서 목록 조회 | GET    | `/api/books/list`               |
| 도서 상세 조회 | GET    | `/api/books/detail?id={bookId}` |
| 도서 수정    | PUT    | `/api/books/update`             |
| 도서 삭제    | DELETE | `/api/books/delete?id={bookId}` |

## 8. 프로젝트 설계 문서 링크 (optional)
## 9. 개발 진행중 배운 점 및 개선점 (optional)
