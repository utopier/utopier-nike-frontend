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
0. Docs
- https://www.apollographql.com/docs/react/
    - **Introduction**
        1. 소개
            - Graphql로 로컬, 원격 데이터를 관리 하는 상태 관리 라이브러리
                - UI 자동 업데이트 & 데이터 가져오기,캐시,수정
        2. Apllo Client 장점
            - 모든 요청주기 처리(로딩,오류 추적 등)
            - 데이터 관리와 관련된 불필요한 코드가 필요없음
            - 다른 상태 관리 라이브러리와 달리 캐시 기능 사용 가능
                - __typename & id 속성이 있는 결과의 각 객체를 Apollo 캐시에서 관리
                - id가 있는 mutation에서 값을 반환하면 동일 id를 가진 객체를 가져오는 쿼리가 자동 업데이트 됨
                - 동일 데이터를 반환하는 두개의 쿼리가 항상 동기화
            - 로컬 및 원격 데이터 결합
            - 생태계 규모
    - **Fetching**
        1. Queries
            - useQuery
            - gql 함수에서 Query 문자열 래핑 -> useQuery Hook에 쿼리 문자열 전달 -> loading, error, data 반환
            - 결과 캐싱
                - 서버에서 쿼리 결과를 가져올때 마다 자동으로 해당 결과를 로컬로 캐시해서 동일 쿼리 후속 실행이 빠름.
            - 캐시 결과 업데이트
                - 캐시된 데이터가 서버에서 최신 상태인지 확인 할때 폴링 & 리페칭
                - 폴링
                    - 주기적으로 쿼리 실행, 서버와 실시간 동기화
                    - pollInterval
                    - startPolling & stopPolling으로 동적으로 시작 및 중지
                - 리페칭
                    - 주기적 실행대신 특정 사용자 작업에 대한 응답으로 쿼리 결과 업데이트
                    - refetch
            - 로딩 상태 검사
                - NetworkStatus 
                - networkStatus 
                - notifyOnNetworkStatusChange
            - 오류 상태 검사
                - errorPolicy로 사용자 정의 오류 처리
            - 수동 쿼리 실행
                - useLazyQuery
                - 쿼리 실행 함수 반환
            - 가져오기 정책 설정
                - fetchPolicy
                    - cache-first(기본값)
                        - 기본적으로 useQuery는 Apollo Client 캐시를 확인해 이미 로컬에서 사용가능한지 확인
                    - cache-only
                    - cache-and-network
                    - network-only
                    - no-cache
                    - standby
        2. Mutations
            - useMutation으로 데이터 업데이트 및 실행 후 Apollo Client 캐시 업데이트 및 로드 및 오류 상태 추적
            - 변형 후 캐시 업데이트
                - 단일 기존 엔티티 업데이트
                    - 기본적으로 적용되어 있음
                    - Mutation이 반환될 때 캐시에서 해당 엔티티 값을 자동 업데이트 
                    - Mutation이 id가 수정된 필드 값과 함께 반환됨
                - 기타 모든 캐시 업데이트
                    - 여러 엔티티 수정 or 엔티티 생성 및 삭제하는 경우 Apollo Client 캐시는 변형 결과를 반영하도록 자동 업데이트 되지 않음
                    - useMutation에 update 함수 포함
            - 로딩 및 오류 상태 추적
        3. Subscriptions
            - 서버에서 WebSocket을 통해 실시간 업데이트 받기
            - Subscription을 사용하는 경우
                - 대부분의 경우 최신 상태로 유지하기 위해 구독을 사용하면 안됨 간헐적 폴링 or 리페칭
                - 사용해야 하는 경우
                    - 큰 객체에 대한 작은 점진적 변경
                    - 지연 시간이 짧은 실시간 업데이트 : 채팅
            - 전송 설정
                - Query 및 Mutation을 사용하는 기본 HTTP 전송대신 subscriptions-transport-ws를 통해 WebSocket으로 통신
                1. npm i subscriptions-transport-ws
                2. WebSocketLink 초기화
                3. 작업 별 통신 분할
                    - split로 Query 및 Mutation은 HTTP로 Subscription은 WebSocket 사용.
                4. Apollo Client에 link 제공
                5. WebSocket을 통한 Authentication
                    - connectionParams
            - Subscription 실행
                - useSubscription
            - 쿼리 업데이트 구독
                - subscibeToMore 함수로 쿼리 결과에 업데이트를 푸시하는 후속 구독 실행
                    - fetchMore과 구조 유사
                    - document, variables, updateQuery
        4. Fragments
            - Fragment를 사용해 여러 Query & Mutation 사이에서 공유
        5. Error handling
            - 오류 유형
                - GraphQL 오류
                - Network 오류
            - GraphQL 오류 정책
                - 오류 정책 설정
            - Apollo Link를 통한 고급 오류 처리
                - 작업 재시도
                - 오류 무시
                - onError 링크 옵션
    - **Caching**
        1. Configuration
        2. Reading & Writing
        3. Garbage collection & eviction
        4. Customizing field behavior
        5. Advaned topics
    - **Pagination**
        1. Overview
        2. Core API
        3. Offset-based
        4. Cursor-based
        5. ketArgs
    - **LocalState**
        1. Overview
        2. Local-only fields
        3. Reactive variables
        4. Client-side schema
    - **Development&Testing**
        1. Developer tools
        2. Using TypeScript
        3. Testing React Components
        4. Mocking schema capabilities
    - **Performance**
        1. Improving performance
        2. Optimistic UI
        3. Server-side rendering
        4. Compling queries with Babel
    - **Networking**
        1. Basic HTTP networking
        2. Advanced HTTP networking
        3. Authentication
1. Client    
    - [O] /apollo/Client.ts
        - [O] index.tsx에서 ApolloProvider로 Apollo Client App전체에 적용. 
2. LocalState
## 4. AppLayout
1. [O]Header
2. [O]Footer
3. Routes index.tsx
## 5. Home Page
[]
## 6. SignUp Page
[]
## 7. Login Page
[]
## 8. Products Page
[]
## 9. Product Page
[]
## 10. Cart Page
[]
---
## 11. Test
## 12. Refactoring
## 13. UIUX, Responsive
## 14. Performance
## 15. Security