import {ApolloServer, gql} from "apollo-server";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/test");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Connected to MongoDB");
});

const ExchangeInfoSchema = new mongoose.Schema({
    src: 'string',
    tgt: 'string',
    rate: 'number',
    date: 'string'
});

const ExchangeInfo = mongoose.model('ExchangeInfo', ExchangeInfoSchema);

const typeDefs = gql`
  type Query {
    "환율조회"
    getExchangeRate(src:String!, tgt:String!): ExchangeInfo
  }

  type Mutation {
    "환율등록, src, tgt, date에 대해서 upsert"
    postExchangeRate(info: InputUpdateExchangeInfo): ExchangeInfo
    "환율삭제, 해당일자의 해당 통화간 환율을 삭제"
    deleteExchangeRate(info: InputDeleteExchangeInfo): ExchangeInfo
  }

  "환율업데이트정보 Input"
  input InputUpdateExchangeInfo {
    "소스통화, krw, usd"
    src: String!
    "타겟통화"
    tgt: String!
    "환율"
    rate: Float!
    "기준일, 값이 없으면, 최신일자로 등록"
    date: String
  }

  "환율삭제 Input"
  input InputDeleteExchangeInfo {
    "소스통화"
    src: String!
    "타겟통화"
    tgt: String!
    "기준일"
    date: String!
  }

  "환율정보"
  type ExchangeInfo{
    "소스통화"
    src: String!
    "타겟통화"
    tgt: String!
    "환율"
    rate: Float!
    "기준일, 값이 없으면, 최신일자의 환율을 응답"
    date: String!
  }
`;

const resolvers = {
    Query: {
      getExchangeRate(root, {src, tgt}){
        return ExchangeInfo.findOne({src, tgt}).sort({date: -1}).exec();

      }
    },
    Mutation: {
        postExchangeRate(root, {info}){
            const newExchangeInfo = new ExchangeInfo(info);
            newExchangeInfo.save(function (error, data) {
                if(error){
                    console.log(error);
                }else{
                    console.log(data)
                }
            });
            return {src: info.src, tgt: info.tgt, rate: info.rate, date: info.date}
        },
        deleteExchangeRate(root, {info}){
            return {src: info.src, tgt: info.tgt, rate: info.rate, date: info.date}
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen(5110).then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});