//sv
app.factory("AddressFactory", function () {
    //sv (str, str) => string
    function getFullName(firstname, lastname) {
        return capatilize(firstname) + " " + capatilize(lastname);
    }

    function capatilize(str) {
        return str[0].toUpperCase() + str.slice(1, str.length);
    }

    function getStates() {
        return ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'American Samoa', 'Guam', 'Northern Marianas Islands', 'Puerto Rico', 'Virgin Islands', 'Armed Forces Americas', 'Armed Forces Africa', 'Armed Forces Europe', 'Armed Forces Middle East', 'Armed Forces Pacific'];
    }
    //sv (str) => obj
    function formatAddress(str) {
        //write
    }
    return {
        getFullName: getFullName,
        getStates: getStates,
        formatAddress: formatAddress
    }
});
