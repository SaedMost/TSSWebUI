function formatMyMoney(price) {

    var currency_symbol = "₺"

    var formattedOutput = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2,
    });

    return formattedOutput.format(price).replace(currency_symbol, '')
}
let paketAdi = localStorage.getItem('paketAdi');
let packetSelected = localStorage.getItem('packetSelected');

$('#hediyeceki-tutar').text(localStorage.getItem('hediyeceki-tutar'));

$(".Baslik").text(paketAdi);
$(".YatarakT").append("<span>" + paketAdi + " </span>");
$(".YatarakT").append(packetSelected);

$('.fiyat').html('');
$('.fiyat1').hide();
$('.fiyat').html(formatMyMoney(localStorage.getItem('price')) + ' ₺ <small>/ yıllık</small><img src="/img/bilgi-beyaz.png" width="20" data-toggle="tooltip" data-placement="top" title data-original-title="Peşin ödemelerde %5 indirim fırsatı!" />');
let lsCustomer = localStorage.getItem('customer');
$(".customer-name").text(lsCustomer == null ? '' : lsCustomer.toUpperCase());
let paymetCustomer = lsCustomer==null?'':lsCustomer.toUpperCase().split(" ");
$.each(paymetCustomer, function (index, deger) {
    let changePaymetCustomer = paymetCustomer[index].slice(1);
    $.each(changePaymetCustomer.split(""), function (number, element) {
        changePaymetCustomer = changePaymetCustomer.replace(element, "*")
    });
    paymetCustomer[index] = paymetCustomer[index].replace(paymetCustomer[index].slice(1), changePaymetCustomer)
});
$("#PaymentCustomer").append(paymetCustomer == null ? '' : _.join(paymetCustomer,' '));

$("#input-cardnumber").on("keyup", function (data) {
    if ($('#input-cardnumber').val().replace('-', '').length >= 10) {
        var paymentPlanList = {
            "proposalId": localStorage.getItem('proposalId'),
            "bincode": $('#input-cardnumber').val().replace('-', '').substring(0, 6).toString(),
            "token": localStorage.getItem("token")
        }
        $.ajax({
            url: window.baseUrl+'/tss/api/PaymentPlanList',
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(paymentPlanList),
            success: function (result) {
               
                let selectHtml = "<option value='0'>Seçiniz</option>";
                result.data.forEach(function(element) {
                    selectHtml += "<option value='" + element.paymentPlanId + "'>" + element.paymentPlanName + "</option>";
                });
                $('#OdemeTuru').html(selectHtml);
            },
            error: function (err) {
                console.log(err);
            },
        })
    }
});

function paymentPlanDetails(bincode, paymentPlanId) {
    let paymentPlanDetailsObject = {
        "binCode": bincode,
        "proposalId": localStorage.getItem('proposalId'),
        "paymentPlanId": paymentPlanId,
        "token": localStorage.getItem("token")
    };
    $.ajax({
        url: window.baseUrl+'/tss/api/PaymentPlanDetails',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(paymentPlanDetailsObject),
        success: function (result) {
            if ($('#OdemeTuru option:selected').html() == "6 Taksit" || $('#OdemeTuru option:selected').html()=="8 Taksit") {
                $('.fiyat1').hide();
            } else {
                $('.fiyat1').show();
            }

            $('.fiyat').html(formatMyMoney(result.totalPremium) + ' ₺ <small>/ yıllık</small><img src="/img/bilgi-beyaz.png" width="20" data-toggle="tooltip" data-placement="top" title data-original-title="Peşin ödemelerde %5 indirim fırsatı!" />');
            $('.fiyat1').html(formatMyMoney(localStorage.getItem('price'))+ ' ₺ <small>/ yıllık</small>');
            $('.taksitTablo').show();
            var tr = "";
            result.data.forEach(function(x) {
                var td = "<tr><td>" + x.paymentDesc + "</td><td>" + x.premium + "</td></tr>";
                tr += td;
            });
            $('#tbody-taksitTablo').html(tr);
        },
        error: function (err) {
            console.log(err);
        },
    })
}

function updatePaymentPlan(bincode, paymentPlanId) {
    let updatePaymentPlanRequest = {
        "binCode": bincode,
        "proposalId": localStorage.getItem('proposalId'),
        "paymentPlanId": paymentPlanId,
        "token": localStorage.getItem("token")
    }
    $.ajax({
        url: window.baseUrl+'/tss/api/UpdatePaymentPlan',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(updatePaymentPlanRequest),
        success: function (result) {
            if (result.isSuccess) {
                paymentPlanDetails(bincode, paymentPlanId);
            }
        },
        error: function (err) {
            console.log(err);
        },
    })
}

$('#OdemeTuru').on('change', function () {
    var bincode = $('#input-cardnumber').val().replace('-', '').substring(0, 6).toString();
    localStorage.setItem('paymentPlanId', this.value);
    updatePaymentPlan(bincode, this.value);
});

$("button.OdemeYap").on("click", function (data) {

    let forms = document.getElementsByClassName('needs-validation');
    let isValid = true;
    
    Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated')
            isValid=false;
        }
        if($("#OdemeTuru").val()==0){
            isValid = false;
            $("#odeme-select-uyari").show();
        }
        if (isValid) {
            document.getElementById("loaderBG").style.display = "block";
            makePolicy();
        }
    })
});
function makePolicy() {
    let makePolicyObject = {
        "proposalId": localStorage.getItem('proposalId'),
        "paymentPlanId": localStorage.getItem('paymentPlanId'),
        "creditCardNumber": $('#input-cardnumber').val().replace(/-/g, ''),
        "creditCardHolder": $('#input-cardowner').val(),
        "creditCardExpMonth": $('#input-cardexpiry').val().substring(0, 2),
        "creditCardExpYear": $('#input-cardexpiry').val().substring(3, 7),
        "token": localStorage.getItem("token")
    }
    $.ajax({
        url: window.baseUrl+'/tss/api/makepolicy',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(makePolicyObject),
        success: function (result) {
            sessionRequest();
        },
        error: function (err) {
            $("#odeme-devam-edemiyoruz").text(err.responseText);
            $('#devam-edemiyoruz').modal('show');
            console.log(err);
            document.getElementById("loaderBG").style.display = "none";
        },
    })
}
function sessionRequest() {
    let sessionRequestObject = {
        "amount": localStorage.getItem('price'),
        "customer": localStorage.getItem('customer'),
        "customername": localStorage.getItem('customer'),
        "customeremail": localStorage.getItem('customer-email'),
        "merchantpaymentid": localStorage.getItem('proposalId'),
        "returnurl": window.returnUrl+'/OdemeResult',
        "token": localStorage.getItem("token")
    }
    $.ajax({
        url: window.baseUrl+'/aseco/api/CreateSession',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(sessionRequestObject),
        success: function (result) {
            merchantSafeUnipay(result);
        },
        error: function (err) {
            console.log(err);
            document.getElementById("loaderBG").style.display = "none";
        },
    })
}
function merchantSafeUnipay(sessionToken) {
    var ccv = $("#input-cardexpiry").val().split("/");
    
    $('#asseco-form').attr('action', 'https://merchantsafeunipay.com/msu/api/v2/post/sale3d/'+sessionToken);
    $('#cardOwner').val($('#input-cardowner').val());
    $('#pan').val($('#input-cardnumber').val().replace(/-/g, ''));
    $('#expiryMonth option:selected').val(ccv[0].toString());
    $('#expiryYear option:selected').val(ccv[1].toString());
    $('#cvv').val($('#input-cardcvc').val());
    $('#saveCard').val(false);
    $('#cardName').val('Test Test');
    $('#installmentCount').val($('#OdemeTuru option:selected').html() === "Peşin" ? 1 : $('#OdemeTuru option:selected').html().charAt(0));
    $('#callbackUrl').val(window.returnUrl+'/OdemeResult')
    $('#asseco-cardBtn').trigger('click');
}