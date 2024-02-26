"use strict";
((longitudeLatitudeHelper)=>
{

const mysqlHelper = require("./database_helper")
    
longitudeLatitudeHelper.fetchAll = async()=>
    {

        let response = {status:400,message:"data not found!", data:[]};

    let query = mysqlHelper.format(`select * from db_balance_humanity.latitude_longitude_district_info where true `);
    let [queryResult] = mysqlHelper.query(query);

    if(queryResult && queryResult.length>0)
    {
    
        return response = {status:400,message:"data not found!", data:queryResult}
    }
    else
    {
        return response;
    }

    };

    longitudeLatitudeHelper.fetchNearestDistricts = async (districtId, numberOfDistricts = 15) => {
        let response = { status: 400, message: "Data not found!", data: [] };
    
        // Fetch coordinates of the provided district
        let query = await mysqlHelper.format(`SELECT latitude, longitude FROM db_balance_humanity.latitude_longitude_district_info WHERE id = ?`, [districtId]);
        let [queryResult] = await mysqlHelper.query(query);
    
        if (queryResult && queryResult.length > 0) {
            let { latitude, longitude } = queryResult[0];
    
            // Fetch all districts from the database
            query = mysqlHelper.format(`SELECT * FROM db_balance_humanity.latitude_longitude_district_info`);
            [queryResult] = await mysqlHelper.query(query);
    
            if (queryResult && queryResult.length > 0) {
                // Calculate distance for each district
                let nearestDistricts = [];
                let distances = [];
    
                for (let district of queryResult) {
                    if (district.id !== districtId) {
                        let distance = calculateDistance(latitude, longitude, district.latitude, district.longitude);
                        distances.push({ district, distance });
                    }
                }
    
                // Sort the distances
                distances.sort((a, b) => a.distance - b.distance);
    
                // Retrieve the nearest districts
                nearestDistricts = distances.slice(0, numberOfDistricts).map(item => item.district);
    
                if (nearestDistricts.length > 0) {
                    response.status = 200;
                    response.message = "Nearest districts found!";
                    response.data = nearestDistricts;
                }
            }
        }
    
        return response;
    }
    

    // Function to calculate distance between two coordinates (Haversine formula)
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }


})
(module.exports);