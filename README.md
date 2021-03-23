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
---
## 5. Bundler(TypeScript, Babel, Webpack)
---
## 6. DataContainer(Apollo Client)
---
## 7. SPA
---
## 8. Figma
---
## 9. Storybook
---
## 10. CSS In Js(styled-component)
---
## 11. UIUX
---
## 12. Responsive
---
## 13. Performance
---
## 14. Security
---
## 15. Devops
---
## 16. CICD(Test,Build,Deploy)

---
