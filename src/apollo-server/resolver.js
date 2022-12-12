import ExchangeInfo from "../models/exchangeInfo.js";

const resolvers = {
    Query: {
        getExchangeRate(root, {src, tgt}){
            return ExchangeInfo.findOne({src, tgt}).sort({date: -1}).exec();
        }
    },
    Mutation: {
        postExchangeRate(root, {info}){
            // date 가 없으면, 최신일자로 등록
            info.date = info.date || new Date().toISOString().slice(0, 10);
            // upsert
            let query = {src: info.src, tgt: info.tgt, date: info.date};
            ExchangeInfo.findOneAndUpdate(query, info, {upsert: true, new: true}).exec().then(r => console.log(r));
            return {src: info.src, tgt: info.tgt, rate: info.rate, date: info.date};
        },
        deleteExchangeRate(root, {info}){
            return {src: info.src, tgt: info.tgt, rate: info.rate, date: info.date}
        }
    }
}

export default resolvers;