import ExchangeInfo from "../models/exchangeInfo.js";


const resolvers = {
    Query: {
        getExchangeRate(root, {src, tgt}){
            return ExchangeInfo.findOne({src, tgt}).sort({date: -1}).exec();

        },
        test(){
            return "test";
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

export default resolvers;