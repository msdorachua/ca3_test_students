const { EMPTY_RESULT_ERROR, UNIQUE_VIOLATION_ERROR, DUPLICATE_TABLE_ERROR } = require('../errors');
const discountsModel = require('../models/discounts_model');

module.exports.testRoute = async function (req, res) {
    try {
        const discountCodes = await discountsModel.testRoute();
        return res.json(discountCodes); 
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};