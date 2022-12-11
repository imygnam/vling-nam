import mongoose from "mongoose";

const ExchangeInfoSchema = new mongoose.Schema({
    src: 'string',
    tgt: 'string',
    rate: 'number',
    date: 'string'
});

const ExchangeInfo = mongoose.model('ExchangeInfo', ExchangeInfoSchema);

export default ExchangeInfo;