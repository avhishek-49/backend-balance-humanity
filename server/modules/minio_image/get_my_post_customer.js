(()=>
{
    const httpStatus = require("http-status");
    const mysqlHelper =require("./../../helpers/database_helper");
module.exports = async(call,res)=>
    {
        try {

            let userId = call.body.user.uuid
            let query = await mysqlHelper.format(`
        
            select
            p.description,
            p.image_minio_url as image,
            concat(bu.first_name," ", bu.last_name) as fullName,
            bu.email,
            bu.mobile_number as mobileNumber,
            d.name as districtName
        from db_balance_humanity.balance_humanity_blog_post p
        
        left join db_balance_humanity.balance_humanity_users bu
        on p.customer_id = bu.uuid
        left join db_balance_humanity.latitude_longitude_district_info d
        on d.id = p.district_name
        where uuid = "${userId}"
            
            `)
        
            let [postQueryResult] = await mysqlHelper.query(query);

         
        
            if(postQueryResult && postQueryResult.length >0)
            {
                return res.status(200).json({message:"data fetched successfully!",data:postQueryResult}); 
            }
            else{
                return res.status(400).json({message:"Empty post for customer!",data:postQueryResult}); 

            }
            
        } catch (error) {
            return res.status(200).json({message:"error occured"}); 
        }
    }

})
()