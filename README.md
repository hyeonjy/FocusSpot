# Focus Spot
![Logo](https://github.com/user-attachments/assets/782d2176-53f8-440a-bc85-b4049dc55715)

![FocusSpot-Home](https://github.com/user-attachments/assets/57fd1116-482a-4a0a-968e-31cb89764cb8)

## 📖 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [팀원 및 팀소개](#팀원-및-팀소개)
3. [주요기능](#주요기능)
4. [적용 기술 및 기술적 의사결정](#적용-기술-및-기술적-의사결정)
5. [개발기간](#개발기간)
6. [기술스택](#기술스택)
7. [와이어프레임](#와이어프레임)
8. [ERD](#ERD)
9. [프로젝트 파일 구조](#프로젝트-파일-구조)

## 👨‍🏫 프로젝트 소개
집중하며 공부할 수 있는 spot을 모두 한 곳에 focus

> ### "가장 효율적인 스터디 공간을 손쉽게 찾아보세요."

FocusSpot은 카페, 스터디 카페, 도서관 등 다양한 학습 공간을 탐색하고 북마크할 수 있는 플랫폼입니다. 사용자 리뷰와 필터 기능을 통해 자신에게 딱 맞는 공간을 빠르게 발견하고 관리할 수 있습니다.

이 프로젝트는 사람들이 자주 찾는 공부 공간을 쉽고 빠르게 찾을 수 있도록 돕기 위한 목적으로 기획되었습니다. 특히, 지역별로 공부를 위한 최적의 장소를 찾고자 하는 사용자에게 유용한 정보를 제공하며, 지도 기반의 검색과 북마크 기능을 통해 나만의 공부 장소를 관리할 수 있도록 합니다.

## 팀원 및 팀소개
- 👩‍💼 완벽한 팀장 **김현지**

- ⭐ 북마크 별표하고 싶어요 **김은지**

- 🔐 안녕하세요 **박산하**

- 🛠️ CRUD는 이제 그만하고 싶어요 **박채현**

- 🎨 이제 자면 안돼요...? **양성훈**

| **김현지** | **김은지** | **박산하** | **박채현** | **양성훈** |
|:---:|:---:|:---:|:---:|:---:|
| <img src="https://avatars.githubusercontent.com/u/86361624?v=4" width="150px"> | <img src="https://avatars.githubusercontent.com/u/115481749?v=4" width="150px"> | <img src="https://avatars.githubusercontent.com/u/176360402?v=4" width="150px"> | <img src="https://avatars.githubusercontent.com/u/182470863?v=4" width="150px"> | <img src="https://avatars.githubusercontent.com/u/163554102?v=4" width="150px"> |
| **팀장** | **팀원** | **팀원** | **팀원** | **팀원** |
| 지도 API | 지도 API | 소셜 로그인 | 북마크 CRD 및 회원정보 수정 | 홈페이지, 디자인, 반응형 |

## 주요기능

### 🛡 GoogleAuth 소셜 로그인

- GoogleAuth와 Supabase를 이용한 간편한 회원가입 및 로그인 기능을 제공합니다.
- **회원가입**: 닉네임, 프로필 사진을 입력하여 간단히 계정을 생성할 수 있습니다.
- **로그인**: 기존에 가입한 이메일과 비밀번호로 안전하게 로그인할 수 있습니다.
- 소셜 로그인으로 Google 계정을 사용해 빠르고 편리하게 인증이 가능합니다.

<details>
<summary>미리보기</summary>
<div markdown="1">

![FocusSpot-Login](https://github.com/user-attachments/assets/2088c992-beee-43a4-b052-a737dc83aac8)

<br>
</div>
</details>

### 🗺️ 지도 API를 통한 장소 검색

- 지도 API를 활용하여 사용자가 가까운 스터디 공간(카페, 스터디카페, 도서관 등)을 검색할 수 있습니다.
- 검색된 장소의 이름, 위치, 상세 정보를 제공합니다.
- 현재 위치 기반 추천 기능을 지원하여 사용자 주변의 스터디 공간을 빠르게 찾을 수 있습니다.

<details>
<summary>미리보기</summary>
<div markdown="1">

![Search](https://velog.velcdn.com/images/chay140/post/7b03c154-1ec2-489c-8970-9986f20cb429/image.gif)

<br>
</div>
</details>

### 🔍 장소 카테고리 필터

- 다양한 카테고리 필터를 통해 원하는 유형의 공간을 쉽게 검색할 수 있습니다.
  - 예: 카페, 스터디 카페, 도서관 등.
- **키워드 검색**: 특정 키워드를 입력하여 스터디 공간을 빠르게 탐색할 수 있습니다.
- 태그를 기반으로 선호하는 장소 유형을 선택할 수 있습니다.

<details>
<summary>미리보기</summary>
<div markdown="1">

![SearchFilter](https://velog.velcdn.com/images/chay140/post/060aef85-0e46-4733-81c3-feec5d8ca067/image.gif)

<br>
</div>
</details>


### 📌 회원 북마크 CRUD

- **Create**: 로그인 상태에서 스터디 공간을 북마크에 추가할 수 있습니다.
- **Read**: 북마크한 공간 목록을 확인할 수 있습니다.
- **Update**: 회원정보를 업데이트 할 수 있습니다.
- **Delete**: 더 이상 필요하지 않은 북마크를 삭제할 수 있습니다.
- 사용자는 북마크한 공간을 "마이페이지"에서 손쉽게 관리할 수 있습니다.

<details>
<summary>미리보기</summary>
<div markdown="1">

![Bookmarking](https://velog.velcdn.com/images/chay140/post/951c7617-f8eb-403b-912a-85fd0e397dfd/image.gif)

<br>
</div>
</details>

## 적용 기술 및 기술적 의사결정
![Tech](https://github.com/user-attachments/assets/757c5f15-0350-41bb-9719-ac0efd40d304)

### 소셜 로그인
Google OAuth를 활용하여 사용자에게 간단하고 안전한 로그인 기능을 제공합니다.
이메일 기반 회원가입 및 로그인 외에도 Google 계정을 통해 빠르게 인증할 수 있습니다. Supabase의 보안 정책을 적용해 데이터는 안전하게 처리됩니다.

### Tanstack & Zustand 상태 관리
React 상태 관리를 위해 Tanstack Query와 Zustand를 도입했습니다.
Tanstack Query로 서버 데이터의 효율적인 캐싱과 데이터 패칭을 처리하며,
Zustand를 통해 전역 상태를 간결하게 관리하여 코드의 가독성과 유지보수성을 높였습니다.

### 카카오맵 API 아웃소싱
카카오맵 API를 활용해 스터디 공간 검색 및 지도 기반 탐색 기능을 구현했습니다.
현재 위치 기반 추천과 장소 검색 필터를 통해 사용자가 쉽게 공간을 찾을 수 있습니다.
지도 API와 연동된 상세 정보를 제공하여 사용자 경험을 향상시켰습니다.

### Supabase DB 관리
Supabase를 데이터베이스 및 인증 관리로 사용해 프로젝트의 백엔드를 간소화했습니다.
유저 정보 저장, 북마크 CRUD, 소셜 로그인 등 주요 데이터 관리에 활용됩니다.
Supabase의 강력한 보안 정책으로 데이터를 안전하게 보호하고 효율적으로 관리합니다.

## ⏲️ 개발기간

- 2024.11.29(금) ~ 2024.12.5(목)

## 📚️ 기술스택

### ✔️ Language

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### ✔️ Version Control

![Git](https://img.shields.io/badge/GIT-100000?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

### ✔️ IDE

![VSCode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

### ✔️ Framework / Library
`react: ^18.3.1`,
`react-dom: ^18.3.1`,
`react-kakao-maps-sdk: ^1.1.27`,
`react-router-dom: ^7.0.1`,
`react-slick: ^0.30.2`,
`slick-carousel: ^1.8.1`,
`styled-components: ^6.1.13`,
`styled-normalize: ^8.1.1`,
`sweetalert": ^11.14.5`,
`zustand: ^5.0.1`,
`@supabase/supabase-js: ^2.46.2`,
`@tanstack/react-query: ^5.61.5`,

### ✔️ Deploy

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### ✔️ Social Sign-On (SSO)
![Vercel](https://img.shields.io/badge/Google_Auth-4c8bf5?style=for-the-badge&logo=google&logoColor=white)

### ✔️ Database Manage System

![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=49EB7C)

## 와이어프레임

### 로그인과 홈페이지
![Login & Home](https://github.com/user-attachments/assets/38213289-15b4-43ae-9b55-1affdc0c1e2a)

### 지도페이지
![Map](https://github.com/user-attachments/assets/3d3dd849-04d6-4fa2-aba0-f38508524d16)

### 마이페이지
![BookmarkPage](https://github.com/user-attachments/assets/0c5346fc-e87c-495c-9bcd-7a6e0c759295)

## ERD
![ERD](https://github.com/user-attachments/assets/744a471e-78a3-4bb5-9bdf-7d28875d4108)

## 프로젝트 파일 구조

```
FocusSpot
├── src
│   ├── App.jsx
│   ├── main.jsx
│   ├── Router.jsx
│   ├── api
│   ├── assets
│   ├── components
│   │   ├── bookmark
│   │   ├── common
│   │   ├── home
│   │   ├── layout
│   │   ├── login
│   │   ├── map
│   │   └── middleware
│   ├── hooks
│   ├── pages
│   ├── zustand
│   └── styles
└── public

```