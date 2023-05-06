const { db, query } = require('../database')

module.exports = {
    gross: async (req, res) => {
           const { startDate, endDate } = req.body
    let getGross = 
    `SELECT SUM(p.product_price * t.transaction_quantity) AS gross_income
    FROM transactions t
    JOIN product p ON t.id_product = p.id_product
    WHERE t.transaction_date BETWEEN ${db.escape(startDate)} AND ${db.escape(endDate)}`
    let isAnyGross = await query(getGross)
    let grossValue = isAnyGross[0].gross_income
    if(grossValue === null || grossValue === 0) {
        return res.status(400).send({message: "No gross data found"})
    }
    return res.status(200).send({grossData: grossValue, message: "Gross income retrieved"})     
    },
    
    trans: async ( req, res ) => {
        const { startDate, endDate } = req.body

    let getTrans = 
    `SELECT COUNT(*) AS total_transaction
    FROM transactions
    WHERE transaction_date BETWEEN ${db.escape(startDate)} AND ${db.escape(endDate)}`
    let isAnyTrans = await query(getTrans)
    let transValue = isAnyTrans[0].total_transaction
    if(transValue === 0 || transValue === null) {
        return res.status(400).send({message: "Error occured when retrieving transaction"})
    }
    return res.status(200).send({transData: transValue, message: "Transaction data retrieved"})     
    },
    
    topOne: async ( req, res ) => {
        const { startDate, endDate } = req.body

    let getTopOne = 
    `SELECT p.product_name, SUM(t.transaction_quantity) AS total_quantity 
    FROM transactions t 
    JOIN product p ON t.id_product = p.id_product 
    WHERE t.transaction_date BETWEEN ${db.escape(startDate)} AND ${db.escape(endDate)}  
    GROUP BY p.id_product, p.product_name 
    ORDER BY total_quantity DESC 
    LIMIT 1`
    let topOne = await query(getTopOne)
    let topOneValue = topOne[0].total_quantity
    if(topOneValue === 0 || topOneValue === null) {
        return res.status(400).send({message: "No top product data retrieved"})
    }
    return res.status(200).send({topOneData: topOne, message: "Top one product retrieved successfully"})
    },

    topFive: async ( req, res ) => {
        const { startDate, endDate } = req.body;
      
    let getTopFive = `
    SELECT p.product_name, SUM(t.transaction_quantity) AS total_quantity 
    FROM transactions t 
    JOIN product p ON t.id_product = p.id_product 
    WHERE t.transaction_date BETWEEN ${db.escape(startDate)} AND ${db.escape(endDate)}  
    GROUP BY p.id_product, p.product_name 
    ORDER BY total_quantity DESC 
    LIMIT 5`;
      
    let topFive = await query(getTopFive);
    if(topFive.length === 0) {
        return res.status(400).send({ message: "No top products data retrieved" });
    }
    return res.status(200).send({ topFiveData: topFive, message: "Top 5 products retrieved successfully" });
      }    
} 

