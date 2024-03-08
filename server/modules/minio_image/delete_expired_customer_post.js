(()=>
{
    const httpStatus = require("http-status");
    const mysqlHelper =require("./../../helpers/database_helper");
module.exports = async(call,res)=>
    {
        try {

            let query = await mysqlHelper.format(`  
            DELETE FROM db_balance_humanity.balance_humanity_blog_post
            WHERE FROM_UNIXTIME(to_date / 1000) < NOW();
            `);
        
            let [deleteResult] = await mysqlHelper.query(query);

         
        
            if(deleteResult && deleteResult.affectedRows >0)
            {
                return console.log("Successfully deleted expired post!")

            }
            else{
                return console.log("Empty Expired post!!!!")

            }
            
        } catch (error) {
            return console.error("error from delete expired post")
        }
    }

})
()