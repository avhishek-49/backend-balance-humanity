"use strict";
const httpStatus = require("http-status");
const { mysqlHelper } = require("./../../../helpers");

(() => {
    module.exports = async (call, res) => {
        try {            


            // if(!call.body.status == 1 || !call.body.status == 0)
            // {
            //     return res.status(400).json({message:"approve reject cannt be other than accept or reject!!", data: []});

            // }


            if(call && call.body && call.body.status== 1)
            {
         let details = await mysqlHelper.format(`update  db_balance_humanity.balance_humanity_kyc set is_verified =1 where uuid = "${call.body.customerId}"`)
            let [detailsResult] = await mysqlHelper.query(details);
            if(detailsResult && detailsResult.affectedRows >0)
            {

            
        
                return res.status(200).json({  message:"Kyc verified successfully!!!"});
  
            }

           


            

            }



            if (call && call.body && call.body.status== 0)
            {
                let details = await mysqlHelper.format(`delete from   db_balance_humanity.balance_humanity_kyc where uuid = "${call.body.customerId}"`)
                let [detailsResult] = await mysqlHelper.query(details);
                if(detailsResult && detailsResult.affectedRows >0)
                {
    
                
            
                    return res.status(200).json({  message:"Rejection success!!!"});
      
                }
            }

              


            return res.status(400).json({ status: httpStatus.BAD_REQUEST, message:"data not found!!!", data: []});
   
     
            // return response;
        } catch (error) {
            return res.status(200).json({ status: httpStatus.BAD_GATEWAY, message:"data not found" });

        }
    };
})();
