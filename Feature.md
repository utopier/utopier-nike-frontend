## Feature
---
## Chpater
1. Hooks
    - useInput
2. Styles
    - GlobalStyles
    - theme
3. Apollo Client
    - Client
    - LocalState
4. AppLayout
    - Header
    - Footer
    - Routes index.tsx
5. Home Page
6. SignUp Page
7. Login Page
8. Products Page
9. Product Page
10. Cart Page
---
## 1. Hooks
1. [O] useInput
    - /Hooks/useInput.ts
## 2. Styles
1. [O] GlobalStyles
    - [O] css reset
        - styled-reset : styled-component를 위한 Eric Meyer's Reset CSS
        - 모든 브라우저에서 각 태그에 대한 스타일 속성 기본값을 동일하게 초기화
    - [O] font
        - Google Open Sans
        - import url
    - [O] box sizing
        - content-box : 기본값, width, height 프로퍼티값은 content 영역을 의미
        - border-box : width, height 프로퍼티 값은 padding, border가 포함된 값을 의미
        - box-sizing 프로퍼티는 상속되지 않음.
            ```css
            html {
                box-sizing: border-box;
            }
            *, *:before, *:after {
                box-sizing: inherit;
            }
            ```
    - [] public style
2. [O] theme
    - public color pallate 정의 후 ThemeProvider로 App전체에 theme 주입
## 3. Apollo Client
1. Client
2. LocalState
## 4. AppLayout
1. Header
2. Footer
3. Routes index.tsx
## 5. Home Page
## 6. SignUp Page
## 7. Login Page
## 8. Products Page
## 9. Product Page
## 10. Cart Page
