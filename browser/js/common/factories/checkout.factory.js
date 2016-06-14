app.factory("CheckOutFactory", function ($http, $state, CartFactory) {
    var mailOptions = {};

    function sendConfirmation(products) {
        mailOptions.products = products;
        return $http.post("/send/orderConfirmation",
                mailOptions)
            .then(function (res) {
                if (res.status === 200) {
                    CartFactory.getItems()
                    $state.go('home')
                }
                return res.data;
            })
    }

    function setName(name) {
        mailOptions.name = name;
    }

    function setEmail(email) {
        mailOptions.email = email;
    }

    function setAddress(address) {
        mailOptions.address = address;
    }

    function getMailOptions() {
        return mailOptions;
    }

    return {
        sendConfirmation: sendConfirmation,
        setAddress: setAddress,
        setEmail: setEmail,
        setName: setName,
        getMailOptions: getMailOptions
    };
});
