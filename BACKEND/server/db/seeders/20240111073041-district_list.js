'use strict';
const { v4: uuid } = require('uuid');
let id = 0;

const list = [

{
  id: ++id,
  uuid: uuid(),
  district_code: "Bhoj",
  district: "Bhojpur"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Dhank",
  district: "Dhankuta"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Ilam",
  district: "Ilam"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Jhapa",
  district: "Jhapa"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Khotan",
  district: "Khotang"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Moran",
  district: "Morang"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Okhal",
  district: "Okhaldhunga"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Pancht",
  district: "Panchthar"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Sankhu",
  district: "Sankhuwasabha"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Solukh",
  district: "Solukhumbu"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Suns",
  district: "Sunsari"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Taple",
  district: "Taplejung"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Terha",
  district: "Terhathum"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Udaya",
  district: "Udayapur"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Bara",
  district: "Bara"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Dhanu",
  district: "Dhanusa"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Mahot",
  district: "Mahottari"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Parsa",
  district: "Parsa"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Raut",
  district: "Rautahat"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Sap",
  district: "Saptari"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Sarla",
  district: "Sarlahi"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Siraha",
  district: "Siraha"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Bkt",
  district: "Bhaktapur"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Chtw",
  district: "Chitwan"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Dhad",
  district: "Dhading"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Dolak",
  district: "Dolakha"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Ktm",
  district: "Kathmandu"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Kavre",
  district: "Kavrepalanchok"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Lalitpur",
  district: "Lalitpur"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Makwa",
  district: "Makwanpur"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Nuwak",
  district: "Nuwakot"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Ramechhap",
  district: "Ramechhap"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Rasuwa",
  district: "Rasuwa"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Sindhuli",
  district: "Sindhuli"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Sindhu",
  district: "Sindhupalchok"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Baglung",
  district: "Baglung"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Gorkha",
  district: "Gorkha"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Kaski",
  district: "Kaski"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Lamjung",
  district: "Lamjung"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Manang",
  district: "Manang"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Mustang",
  district: "Mustang"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Myagdi",
  district: "Myagdi"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Nawal",
  district: "Nawalpur"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Parbat",
  district: "Parbat"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Syang",
  district: "Syangja"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Tanah",
  district: "Tanahun"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Arghak",
  district: "Arghakhanchi"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Banke",
  district: "Banke"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Bardiya",
  district: "Bardiya"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Dang",
  district: "Dang"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "E Rukum",
  district: "Eastern Rukum"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Gulmi",
  district: "Gulmi"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Kapilvastu",
  district: "Kapilvastu"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Palpa",
  district: "Palpa"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Parasi",
  district: "Parasi"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Pyuth",
  district: "Pyuthan"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Rolpa",
  district: "Rolpa"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Rupan",
  district: "Rupandehi"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Dailekh",
  district: "Dailekh"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Dolpa",
  district: "Dolpa"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Humla",
  district: "Humla"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Jajar",
  district: "Jajarkot"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Jumla",
  district: "Jumla"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Kalikot",
  district: "Kalikot"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Mugu",
  district: "Mugu"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Salyan",
  district: "Salyan"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Surkhet",
  district: "Surkhet"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "W Rukum",
  district: "Western Rukum"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Achham",
  district: "Achham"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Baitadi",
  district: "Baitadi"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Bajhang",
  district: "Bajhang"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Bajura",
  district: "Bajura"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Dadel",
  district: "Dadeldhura"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Darch",
  district: "Darchula"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Doti",
  district: "Doti"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Kailali",
  district: "Kailali"
},
{
  id: ++id,
  uuid: uuid(),
  district_code: "Kanchan",
  district: "Kanchanpur"
}
];

module.exports = {
up: async (queryInterface, Sequelize) => {
  try {
    await queryInterface.sequelize.query(`start transaction;`);
    await queryInterface.bulkDelete('district', null, {});
    await queryInterface.bulkInsert('district', list, {});
    await queryInterface.sequelize.query(`commit;`);
  } catch (error) {
    console.log(error);
    await queryInterface.sequelize.query(`rollback;`);
  }
  return Promise.resolve();
},

down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('district', null, {});
}
};
