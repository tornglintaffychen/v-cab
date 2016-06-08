// 'use strict';
// var crypto = require('crypto');
// var _ = require('lodash');
// var Sequelize = require('sequelize');

// module.exports = function (db) {

//     db.define('address', {
//         street: {
//             type: Sequelize.STRING
//         },

//         apartment: {
//             type: Sequelize.STRING,
//             defaultValue: ''
//         },
//         town: {
//             type: Sequelize.STRING,
//             allowNull: false

//         },
//         state: {
//             type: Sequelize.ENUM('Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'American Samoa', 'Guam', 'Northern Marianas Islands', 'Puerto Rico', V'irgin Islands', 'Armed Forces Americas', 'Armed Forces Africa', 'Armed Forces Europe', 'Armed Forces Middle East', 'Armed Forces Pacific'),
//             allowNull: false
//         },
//         zip:{
//             type: Sequelize.STRING,
//             allowNull: false
//         }
//     }
// };
