# Refactoring

---

## Chapter

1. [] Linting (ESLint, Prettier)
2. [] Bulid & Deploy (scripts/build.js, package.json babel, Babel, Webpack, gp-pages)
3. [] ApolloClient + TS
4. [] React + TS + JS
5. [] MarkUp(HTML, CSS)

---

## 1. Linting (TSLint -> ESLint, Prettier)

1. Overview  
   ESLint : 코드 문법 검사 + 코드 스타일 포맷팅 (Prettier로)
   Prettier : 코드 스타일 포맷팅
   코드 가독성 및 통일성을 위해 사용
2. TSLint
   - [O]deprecated로 해당 패키지 및 tslint.json 삭제
     npm uninstall tslint tslint-config-prettier tslint-react
3. ESLint + Prettier + React + TS
   - [O] 패키지 설치
     npm i -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
     npm i -D eslint-config-airbnb eslint-config-prettier eslint-plugin-prettier
     npm i -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import
   - 패키지
     eslint : 코드 문법 검사 + 코드 스타일 포맷팅
     prettier : 코드 스타일 포맷팅
     @typescript-eslint/eslint-plugin : TS 린팅 플러그인
     @typescript-eslint/parser : TS 파싱
     eslint-config-aribnb : airbnb코딩규칙(리액트 규칙 포함됨.)
     eslint-config-prettier : prettier와 충돌을 일으키는 ESLint 규칙 비활성화
     eslint-plugin-react : React 린트 설정
     eslint-plugin-react-hooks : React Hooks 규칙 강제 설정 플러그인
     eslint-plugin-jsx-a11y : JSX 접근성 AST 린팅 피드백
     eslint-plugin-import : ES6+ import/export 구문 지원
   - [O] .eslintrc.js
   - [O] .prettierc
4. VSC 저장시 자동 포맷팅 설정
   - [O] settings.json
     ```json
      "editor.codeActionsOnSave": {
         "source.fixAll.eslint": true,
         "source.fixAll": true
         },
       "eslint.autoFixOnSave": true
     ```
   - VSC -> Preferece -> Default Formatte(Prettier로 변경)

---

## 2. Bulid & Deploy (scripts/build.js, package.json babel, Babel, Webpack, gp-pages)

---

## 3. ApolloClient + TS

---

## 4. React + TS + JS

---

## 5. MarkUp(HTML, CSS)
