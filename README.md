# 2023 상반기 그룹바이 인턴쉽 - 구현과제
## 요구사항
- Node 16.0.0 이상
- mongoDB 6.0.0 이상
- mongoDB가 port 27017에서 실행중이어야 함
    - port 변경이 필요하다면 .env 파일의 MONGO_PORT 를 변경해주세요
- Git

## 실행방법
1. `git clone https://github.com/imygnam/vling-nam.git`
2. `cd vling-nam`
3. `npm install`
4. `npm start`

## 구현사항
- 환율조회 테스트 스크립트가 실행되도록 임의 데이터를 서버가 실행시 생성합니다.
    - 임의데이터는 ./src/baseInfo.json 에 존재합니다.