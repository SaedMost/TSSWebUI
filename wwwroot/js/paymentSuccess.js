(function () {
    'use strict'

    window.addEventListener('load', function () {
        makePolicy();
    }, false)
})()

function makePolicy() {
    let makePolicy = {
        "proposalId": localStorage.getItem('proposalId'),
        "paymentPlanId": localStorage.getItem('paymentPlanId'),
        "token": localStorage.getItem("token")
    }
    $.ajax({
        url: window.baseUrl+'/tss/api/makepolicy',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(makePolicy),
        success: function (result) {
            if (result.isSuccess) {
                payment();
            }
        },
        error: function (err) {
            console.log(err);
        },
    })
}

function payment() {
    let payment = {
        "proposalId": localStorage.getItem('proposalId'),
        "paymentPlanId": localStorage.getItem('paymentPlanId'),
        "token": localStorage.getItem("token")
    }
    $.ajax({
        url: window.baseUrl+'/tss/api/payment',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(makePolicy),
        success: function (result) {
            if (result.isSuccess) {

            }
        },
        error: function (err) {
            console.log(err);
        },
    })
}