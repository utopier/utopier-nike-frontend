# Nike Frontend

---

### Chapter

1. TS + React
2. CodeStyle(eslint, prettier, VSC, Naming)
3. Testing(jest, react-testing-library, cypress)
4. Routing(react-router-dom)
5. Bundler(TypeScript, Babel, Webpack)
6. DataContainer(Apollo Client)
7. SPA
8. Figma
9. Storybook
10. CSS In Js(styled-component)
11. UIUX
12. Responsive
13. Performance
14. Security
15. Devops
16. CICD(Test,Build,Deploy)

---

## 1. TS + React

- npm init -y
- npm i react react-dom react-scripts-ts
- npm i -D typescript @types/node @types/react @types/react-dom
- pacakge.json scripts 수정
  ```json
  {
    // ...
    "scripts": {
      "start": "react-scripts-ts start",
      "build": "react-scripts-ts build",
      "test": "react-scripts-ts test --env=jsdom",
      "eject": "react-scripts-ts eject"
    }
    // ...
  }
  ```
- mkdir public
  - index.html
- mkdir src
  - index.tsx
- tsconfig.json
- npm run start
---
## 2. CodeStyle(tslint, prettier, VSC, Naming)

1. TSLint
    - npm i -D tslint-config-prettier tslint-react
   - tslint.json
2. Prettier
   - .prettierrc
3. VSC
4. Naming
    - https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%94%EB%94%A9-%EB%B0%8F-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EC%BB%A8%EB%B2%A4%EC%85%98-1%ED%8E%B8
    - https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%ED%83%80%EC%9D%BC-%EA%B0%80%EC%9D%B4%EB%93%9C-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EC%BB%A8%EB%B2%A4%EC%85%98-%ED%8E%B8
---
## 3. Testing(jest, react-testing-library, cypress)
1. jest & react-testing-library
    - npm i -D @testing-library/react @testing-library/dom @testing-library/jest-dom jest @types/jest babel-jest
    - jest.config.js
        ```javascript
        module.exports = {
            testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
            setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
            transform: {
                "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
            }
        };
        ```
    - setupTests.js
        ```javascript
        /* eslint-disable */
        import '@testing-library/jest-dom/extend-expect';
        //import fetch from 'node-fetch';
        //global.fetch = fetch;
        ```
2. cypress
    - npm i -D cypress @testing-library/cypress start-server-and-test
    - package.json
        ```json
        "scripts": {
            //...
            "cypress": "cypress open",
            "cypress:headless": "cypress run --browser chrome --headless",
            "test:e2e": "start-server-and-test start 3000 cypress",
            "test:e2e:ci": "start-server-and-test start 300 cypress:headless"
            //...
        }
        ```
    - npm run cypress
    - npm run test:e2e
    - cypress.json
        ```json
        {
            "baseUrl": "http://localhost:3000",
            "video": false
        }
        ```
    - cypress/support/index.js
        ```javascript
        import '@testing-library/cypress/add-commands';
        ```
---
## 4. Routing(react-router-dom)
- npm i react-router-dom
- npm i -D react-router-dom
- mkdir src/Routes
- Routes 기본 코드 작성
    - index.tsx
    - Home.tsx
    - SignUp.tsx
    - Login.tsx
    - Products.tsx
    - Product.tsx
    - Cart.tsx
- src/index.tsx
    - Routes import
---
## 5. Build & Deploy
- touch tsconfig.prod.json
    ```json
    {
     "extends": "./tsconfig.json"
    }
    ```
- npm run build
- gh-pages 
    - npm i -D gh-pages
- package.json
    ```json
    {
        //..
        "scripts":{
            //..
            "predeploy": "npm run build",
            "deploy": "gh-pages -d build"
            //..
        }
        //..
        "homepage": "https://utopier.github.io/utopier-nike-front/",
        //..
    }
    ```
- npm run deploy
---
## 10. CSS In Js(styled-component)
- npm i styled-components styled-reset
- npm i -D @types/styled-components
- Styles
    - GlobalStyles.tsx
    - theme.ts
- src/Routes/index.tsx
    - GlobalStyles 적용
    - theme 적용
- npm run start
- npm run deploy
- styled-component build 적용
    - babel.config.json
        ```json
        {
            "plugins": ["babel-plugin-styled-components"]
        }
        ```
    - npm i - typescript-plugin-styled-components
    - config/webpack/webpack.config.prod.js 코드 수정
---
## 6. DataContainer(Apollo Client)
- npm i @apollo/client graphql subscriptions-transport-ws
- Apollo
    - Client.ts
    - LocalState.ts
- src/index.tsx
    - React App에 Apollo Client 적용
- npm run start
---
## 15. Devops(Git, Github, Slack, Jira)
1. [O]github
   - git config --list
   - Git Hosting Service로 github 사용
   - New Repository 생성
     - https://github.com/utopier/utopier-blog-frontend.git
   - git init
   - git add .
   - git commit -m 'First Commit'
   - git remote add origin https://github.com/utopier/utopier-blog-frontend.git
   - git push --set-upstream origin master
   - git push -u origin master
2. [O]github + jira
   - Smart Commit (JIRA + Github)
   - Jira
     - 프로젝트 만들기 (이름: utopier-blog, 키: UB, 칸반)
     - App -> Github for Jira
     - 앱관리 -> Github -> Configuration
     - 프로젝트 -> 항목추가 -> 저장소 -> https://github.com/utopier/utopier-blog-frontend.git
     - Smart Commit Test~
3. [O]github + slack
   - Slack
     - 워크스페이스 생성 (utopier-blog)
     - App -> Github
     - Github -> /github subscribe utopier/utopier-blog-frontend -> /github subscribe list -> /github subscribe list features
   - Github
     - Accout Settings -> Applications -> Slack -> Repository access
    - /github subscribe utopier/utopier-nike-frontend commits:all
4. [O]jira + Slack
   - Slack
     - App -> Jira Cloud
     - /jira connect
   - JIRA
     - Slack Integration -> Edit
   - Slack
     - App -> Jira -> /jira create
5. [O]Software Process(git-flow, agile, Slack, Jira, Software Engineering)
   - **git-flow strategy**
     - master
       - origin/master, Tag
       - 배포준비된 코드
       - 병합시 git hook 스크립트로 자동 배포
     - develop
       - origin/develop
       - 배포하기 위해 개발하는 코드
     - feature
       - 기능 개발 브랜치
       - 시작브랜치: feature
       - 병합대상 브랜치: develop
       - 브랜치 이름 규칙: feature/{issue-number}-{feature-name}
     - release
       - 실제 배포할 상태가 된 경우
       - 시작브랜치: develop
       - 병합대상 브랜치: develop, master
       - 브랜치이름 규칙: origin/release-..., Tag
     - hotfix
       - 배포된 운영버전에서 발생한 문제 해결
       - 시작브랜치: master
       - 병합대상 브랜치: develop, master
       - 브랜치이름 규칙: origin/hotfix-..., Tag
   - **Process**
     - 작업 시작전 JIRA 티켓 생성
     - 하나의 티켓은 하나의 커밋
     - 코드 리뷰 -> Pull Request 및 merge

---
## 16. CICD(Test,Build,Deploy)
---
## 7. SPA
---
---
## 8. Figma
---
## 11. UIUX
---
## 12. Responsive
---
## 13. Performance
---
## 14. Security
---
