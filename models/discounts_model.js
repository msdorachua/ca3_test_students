const { query } = require('../database');
const { EMPTY_RESULT_ERROR, SQL_ERROR_CODE, UNIQUE_VIOLATION_ERROR } = require('../errors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.testRoute = async function () {
    const sql = `SELECT id, code, description, discount_value AS "discountValue", max_usage_count AS "maxUsageCount", usage_count AS "usageCount", valid_from AS "validFrom", valid_until AS "validUntil", is_active AS "isActive" FROM discount_code`;
    try {
        const result = await query(sql, []);
        const rows = result.rows;

        if (rows.length === 0) {
            throw new EMPTY_RESULT_ERROR(`Discounts not found!`);
        }

        return rows; // Return all rows, not just the first one
    } catch (err) {
        console.error('Error retrieving discount codes:', err);
        throw err;
    }
};