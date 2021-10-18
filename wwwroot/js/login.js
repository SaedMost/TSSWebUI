

function btnNext() {
    let $captcha = $('#recaptcha'), response = grecaptcha.getResponse();
    let isValid = true;
    if (response.length === 0) {
        $('.msg-error').text("reCAPTHCA doğrulamasını doğru yapmadınız, lütfen tekrar deneyiniz.");
        if (!$captcha.hasClass("error")) {
            $captcha.addClass("error");
            TC_No_Kaydet();
        }
        isValid = false;
    }




    let forms = document.getElementsByClassName('needs-validation')
    Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated')
            isValid = false;
            TC_No_Kaydet();
        }
    });


    /*TC Valid */
    let parTC = $("#tcno").val();
    let blnSonuc = true;
    let strTC = String(parTC);
    if (desen_tc.test(strTC) === false) {
        blnSonuc = false;
        $("#tcno").focus();
        $(".tco").show();
    }
    let int1 = parseInt(strTC.substr(0, 1));
    let int2 = parseInt(strTC.substr(1, 1));
    let int3 = parseInt(strTC.substr(2, 1));
    let int4 = parseInt(strTC.substr(3, 1));
    let int5 = parseInt(strTC.substr(4, 1));
    let int6 = parseInt(strTC.substr(5, 1));
    let int7 = parseInt(strTC.substr(6, 1));
    let int8 = parseInt(strTC.substr(7, 1));
    let int9 = parseInt(strTC.substr(8, 1));
    let int10 = parseInt(strTC.substr(9, 1));
    let int11 = parseInt(strTC.substr(10, 1));

    if ((int1 + int3 + int5 + int7 + int9 + int2 + int4 + int6 + int8 + int10) % 10 != int11) {
        blnSonuc = false;
        $("#tcno").focus();
        $(".tco").show();
    }
    if (((int1 + int3 + int5 + int7 + int9) * 7 + (int2 + int4 + int6 + int8) * 9) % 10 != int10) {
        blnSonuc = false;
        $("#tcno").focus();
        $(".tco").show();
    }
    if (((int1 + int3 + int5 + int7 + int9) * 8) % 10 != int11) {
        blnSonuc = false;
        $("#tcno").focus();
        $(".tco").show();
    }
    if (blnSonuc === false) {
        $("#tcno").focus();
        $(".tco").show();
    }
    if (isValid === true && blnSonuc === true) {
        postCheckForm();
    }
}

function postCheckForm() {
    document.getElementById("loaderBG").style.display = "block";
    let checkPersonRequest = {
        "data": $('#tcno').val(),
        "birthDate": $('#dogumtar').val()
    };

    $.ajax({
        url: window.baseUrl + '/tss/api/checkperson',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(checkPersonRequest),
        beforeSend: function () {
            $('#loaderBG').css('display', 'block')
        },
        success: function (response) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("customer", response.data.name + ' ' + response.data.surname);
            window.advance(response.data.proposalId, '/Bupa/IletisimBilgileri');
        },
        error: function (data) {
            document.getElementById("loaderBG").style.display = "none";
            $("#devam-edemiyoruz1").modal();
            $('.UyariMesaj').html(data.responseText);
        }
    });
}


////////////////////////////////////////////////////////////

let firstSectionData = {
    "idNumber": "",
    "birthDate": "",
    "email": "",
    "gsm": "",
    "contactConsent": false,
    "otpcode": ""
};


function btnFirstNext() {

    //let $captcha = $('#recaptcha'), response = grecaptcha.getResponse();
    let isValid = true;
    //if (response.length === 0) {
    //    $('.msg-error').text("reCAPTHCA doğrulamasını doğru yapmadınız, lütfen tekrar deneyiniz.");
    //    if (!$captcha.hasClass("error")) {
    //        $captcha.addClass("error");
    //        TC_No_Kaydet();
    //    }
    //    isValid = false;
    //}

    let forms = document.getElementsByClassName('needs-validation')
    Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated')
            isValid = false;
            TC_No_Kaydet();
        }
    });

    /*TC Valid */
    let parTC = $("#tcno").val();
    let blnSonuc = true;
    let strTC = String(parTC);
    if (desen_tc.test(strTC) === false) {
        blnSonuc = false;
        $("#tcno").focus();
        $(".tco").show();
    }
    let int1 = parseInt(strTC.substr(0, 1));
    let int2 = parseInt(strTC.substr(1, 1));
    let int3 = parseInt(strTC.substr(2, 1));
    let int4 = parseInt(strTC.substr(3, 1));
    let int5 = parseInt(strTC.substr(4, 1));
    let int6 = parseInt(strTC.substr(5, 1));
    let int7 = parseInt(strTC.substr(6, 1));
    let int8 = parseInt(strTC.substr(7, 1));
    let int9 = parseInt(strTC.substr(8, 1));
    let int10 = parseInt(strTC.substr(9, 1));
    let int11 = parseInt(strTC.substr(10, 1));

    if ((int1 + int3 + int5 + int7 + int9 + int2 + int4 + int6 + int8 + int10) % 10 != int11) {
        blnSonuc = false;
        $("#tcno").focus();
        $(".tco").show();
    }
    if (((int1 + int3 + int5 + int7 + int9) * 7 + (int2 + int4 + int6 + int8) * 9) % 10 != int10) {
        blnSonuc = false;
        $("#tcno").focus();
        $(".tco").show();
    }
    if (((int1 + int3 + int5 + int7 + int9) * 8) % 10 != int11) {
        blnSonuc = false;
        $("#tcno").focus();
        $(".tco").show();
    }
    if (blnSonuc === false) {
        $("#tcno").focus();
        $(".tco").show();
    }

    if (isValid === true && blnSonuc === true) {

        firstSectionData.idNumber = $('#tcno').val();
        firstSectionData.birthDate = $('#dogumtar').val();
        firstSectionData.email = $('#eposta').val();
        firstSectionData.gsm = $('#ceptelefonu').val().replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "").replace(' ', '').replace(' ', '').replace(' ', '');
        firstSectionData.contactConsent = $('#elektronik-ileti').is(':checked');

        postSendOtp(1);
    }
    //
}

function postSendOtp(type) {

    let sendOtpRequest = {
        "Gsm": firstSectionData.gsm,
        "IdNumber": firstSectionData.idNumber
    };

    $.ajax({
        url: window.baseUrl + '/tss/api/sendotp',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(sendOtpRequest),
        beforeSend: function () {
            $('#loaderBG').css('display', 'block')
        },
        success: function (response) {
            document.getElementById("loaderBG").style.display = "none";
            if (response.isSuccess == true) {
                firstSectionData.otpcode = response.data;
                if (type == 1) {
                    $('#sms-dogrulama-modal').modal({ backdrop: 'static', keyboard: false, show: true });
                }

                minCounter();
            }
            else {
                if (response.errorMessage == "Tek Kullanımlık Şifre talebi limitinizi aştınız, lütfen tekrar giriş yapınız.") {
                    clearFirstSectionData();
                    $('#home-msg').text(response.errorMessage);
                    $('#anasayfa-modal').modal('toggle');
                }
                else if (response.errorMessage == 'Günlük tek kullanımlık şifre limitine ulaştınız. Dilerseniz 0216 570 55 55 numaralı dijital satış kanalımız ile iletişime geçebilirsiniz. İlginize teşekkür eder, sağlıklı günler dileriz.') {
                    clearFirstSectionData();
                    $('#home-msg').text(response.errorMessage);
                    $('#anasayfa-modal').modal('toggle');
                }
                else {
                    showSendAgainBtn();
                }
            }
        },
        error: function (data) {
            document.getElementById("loaderBG").style.display = "none";
            $('#btnTekrarGonder').removeClass('d-none');
        }
    });
}

function codeVerify() {
    if (!firstSectionData.otpcode) return;

    var code = $('#otpCode').val();
    if (!code) {
        alert('Kod giriniz!');
        return;
    }

    var currentCode = firstSectionData.otpcode;
    if (code == currentCode) {
        $('#sms-dogrulama-modal').modal('toggle');
        $('#sms-dogrulama-basarili-modal').modal({ backdrop: 'static', keyboard: false, show: true });
    }
    else {
        setErrMessage('Geçersiz tek kullanımlık şifre girdiniz.')
    }

}

function btnContinue() {
    allProccess();
}

function postCheckPerson() {

    let checkPersonRequest = {
        "data": firstSectionData.idNumber,
        "birthDate": firstSectionData.birthDate
    };

    if (new RegExp('[0-9]{11}').test(checkPersonRequest.data) == false || new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}').test(checkPersonRequest.birthDate) == false) {
        $('#sms-dogrulama-basarili-modal').modal('toggle');
        document.getElementById("loaderBG").style.display = "none";
        $("#devam-edemiyoruz1").modal();
        $('.UyariMesaj').html('Hatalı veri girişi!');
        return;
    }

    $.ajax({
        url: window.baseUrl + '/tss/api/checkperson',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(checkPersonRequest),
        beforeSend: function () {
            $('#loaderBG').css('display', 'block');
        },
        async: false,
        success: function (response) {
            $('#loaderBG').css('display', 'block');
            if (response.isSuccess == true) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("customer", response.data.name + ' ' + response.data.surname);
                window.advenceNotRedirect(response.data.proposalId);
            }
            else {
                clearFirstSectionData();
                $('#sms-dogrulama-basarili-modal').modal('toggle');
                document.getElementById("loaderBG").style.display = "none";
                $("#devam-edemiyoruz1").modal();
                $('.UyariMesaj').html(data.responseText);

                return;
            }

        },
        error: function (data) {
            clearFirstSectionData();
            $('#sms-dogrulama-basarili-modal').modal('toggle');
            document.getElementById("loaderBG").style.display = "none";
            $("#devam-edemiyoruz1").modal();
            $('.UyariMesaj').html(data.responseText);
            return;
        }
    });
}

function postContactInfo() {

    let contactInfo = {
        "Email": firstSectionData.email,
        "GSM": firstSectionData.gsm.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "").replace(' ', '').replace(' ', '').replace(' ', ''),
        "ProposalId": localStorage.getItem('proposalId'),
        "ContactConsent": firstSectionData.contactConsent,
        "Token": localStorage.getItem("token")
    };

    var emailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailValid.test(contactInfo.Email) == false || new RegExp('[0-9]{10}').test(contactInfo.GSM) == false || !contactInfo.ProposalId || contactInfo.contactConsent == '' || contactInfo.ContactConsent == null || !contactInfo.Token) {
        $('#sms-dogrulama-basarili-modal').modal('toggle');
        document.getElementById("loaderBG").style.display = "none";
        $("#devam-edemiyoruz1").modal();
        $('#UyariMesaji').html('Hatalı veri girişi!');
        return;
    }

    $.ajax({
        url: window.baseUrl + '/tss/api/contactInfo',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(contactInfo),
        beforeSend: function () {
            //document.getElementById("loaderBG").style.display = "block";
        },
        async: false,
        success: function (response) {
            if (response.errorMessage == '') {
                document.getElementById("loaderBG").style.display = "none";
                localStorage.setItem("customer-email", firstSectionData.email);
                advance(localStorage.getItem('proposalId'), '/Bupa/SaglikBilgileri');
            }
            else {
                $('#sms-dogrulama-basarili-modal').modal('toggle');
                document.getElementById("loaderBG").style.display = "none";
                $("#devam-edemiyoruz1").modal();
                $('#UyariMesaji').html(response.errorMessage);

                return;
            }

        },
        error: function (data) {
            $('#sms-dogrulama-basarili-modal').modal('toggle');
            document.getElementById("loaderBG").style.display = "none";
            $("#devam-edemiyoruz1").modal();
            $('#UyariMesaji').html(data.responseText);

            return;
        }
    });
}

function sendAgain() {
    clearErrMessage();
    hiddenSendAgainBtn();
    postSendOtp(2);
}

function setErrMessage(message) {
    $('#errMessage').text('');
    $('#errMessage').text(message);
}

function clearErrMessage() {
    $('#errMessage').text('');
}

function showSendAgainBtn() {
    $('#btnTekrarGonder').removeClass('d-none');
}

function hiddenSendAgainBtn() {
    $('#btnTekrarGonder').addClass('d-none');
}

function clearFirstSectionData() {
    firstSectionData.idNumber = "";
    firstSectionData.birthDate = "";
    firstSectionData.email = "";
    firstSectionData.gsm = "";
    firstSectionData.contactConsent = false;
    firstSectionData.otpcode = "";

}

function minCounter() {
    var dk = 02, sn = 00;
    var sayac = setInterval(function () {
        if (dk > 0) {
            if (sn == 0) {
                sn = 59;
                dk = dk - 1;
            }
            else {
                sn = sn - 1;
            }
        }
        else {
            sn = sn - 1;
        }

        dk = dk.toString().length == 1 ? "0" + dk : dk;
        sn = sn.toString().length == 1 ? "0" + sn : sn;

        $('#dk').text(dk);
        $('#sn').text(sn);

        if (dk == 0 && sn == 0) {
            clearInterval(sayac);
            firstSectionData.otpcode = "";
            setErrMessage('Tek kullanımlık şifrenizin süresi dolmuştur.');
            showSendAgainBtn();
        }
    }, 1000);
}

function allProccess() {
    let checkPersonRequest = {
        "data": firstSectionData.idNumber,
        "birthDate": firstSectionData.birthDate
    };

    if (new RegExp('[0-9]{11}').test(checkPersonRequest.data) == false || new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}').test(checkPersonRequest.birthDate) == false) {
        openInfoModal('Bilgilendirme', 'Hatalı veri girişi!');
        return;
    }

    //CheckPerson
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(checkPersonRequest),
        url: window.baseUrl + '/tss/api/checkperson',
        beforeSend: function () {
            document.getElementById("loaderBG").style.display = "block";
        },
        success: function (result) {

            if (result.isSuccess) {
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("customer", result.data.name + ' ' + result.data.surname);

                //Advance
                let advanceRequest = {
                    "proposalId": result.data.proposalId,
                    "token": localStorage.getItem("token")
                };

                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(advanceRequest),
                    url: window.baseUrl + '/tss/api/advance',
                    success: function () {
                        localStorage.setItem('proposalId', advanceRequest.proposalId);

                        //Contact Info
                        let contactInfo = {
                            "Email": firstSectionData.email,
                            "GSM": firstSectionData.gsm.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "").replace(' ', '').replace(' ', '').replace(' ', ''),
                            "ProposalId": localStorage.getItem('proposalId'),
                            "ContactConsent": firstSectionData.contactConsent,
                            "Token": localStorage.getItem("token")
                        };

                        var emailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                        if (emailValid.test(contactInfo.Email) == false || new RegExp('[0-9]{10}').test(contactInfo.GSM) == false || !contactInfo.ProposalId || contactInfo.contactConsent == '' || contactInfo.ContactConsent == null || !contactInfo.Token) {
                            openInfoModal('Bilgilendirme', 'Hatalı veri girişi!');
                            return;
                        }

                        $.ajax({
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify(contactInfo),
                            url: window.baseUrl + '/tss/api/contactInfo',
                            success: function (result) {
                                if (result.errorMessage == '') {
                                    localStorage.setItem("customer-email", firstSectionData.email);

                                    //Advance
                                    let advanceSecondRequest = {
                                        "proposalId": localStorage.getItem('proposalId'),
                                        "token": localStorage.getItem("token")
                                    };

                                    $.ajax({
                                        type: 'POST',
                                        contentType: 'application/json',
                                        data: JSON.stringify(advanceSecondRequest),
                                        url: window.baseUrl + '/tss/api/advance',
                                        success: function (result) {
                                            localStorage.setItem('proposalId', advanceSecondRequest.proposalId);
                                            window.location.href = '/Bupa/SaglikBilgileri';
                                        },
                                        error: function (err) {
                                            console.log(err);
                                            openInfoModal('Bilgilendirme', err.responseText);
                                            return;
                                        }
                                    });
                                    //Advance
                                }
                                else {
                                    openInfoModal('Bilgilendirme', result.errorMessage);
                                    return;
                                }
                            },
                            error: function (err) {
                                console.log(err);
                                openInfoModal('Bilgilendirme', err.responseText);
                                return;
                            }
                        });
                        //Contact Info
                    },
                    error: function (err) {
                        console.log(err);
                        openInfoModal('Bilgilendirme', err.responseText);
                        return;
                    }
                });
                //Advance
            }
            else {
                openInfoModal('Bilgilendirme', result.errorMessage);
                return;
            }
        },
        error: function (result) {
            console.log(result);
            openInfoModal('Bilgilendirme', err.responseText);
            return;
        }
    });
    //CheckPerson
}

function openInfoModal(title, message) {
    $('#sms-dogrulama-basarili-modal').modal('toggle');
    document.getElementById("loaderBG").style.display = "none";
    $('.info-modal-title').text(title)
    $('#info-modal-message').html(message);
    $("#info-modal").modal('toggle');
}

function axiosExample() {

    let checkPersonRequest = {
        "data": firstSectionData.idNumber,
        "birthDate": firstSectionData.birthDate
    };

    if (new RegExp('[0-9]{11}').test(checkPersonRequest.data) == false || new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}').test(checkPersonRequest.birthDate) == false) {
        $('#sms-dogrulama-basarili-modal').modal('toggle');
        document.getElementById("loaderBG").style.display = "none";
        $("#devam-edemiyoruz1").modal();
        $('.UyariMesaj').html('Hatalı veri girişi!');
        return;
    }

    document.getElementById("loaderBG").style.display = "block";

    axios
        .post(window.baseUrl + '/tss/api/checkperson', JSON.stringify(checkPersonRequest), { headers: { 'Content-Type': 'application/json' } })
        .then(checkPersonResponse => {
            if (checkPersonResponse.data.isSuccess) {
                localStorage.setItem("token", checkPersonResponse.data.data.token);
                localStorage.setItem("customer", checkPersonResponse.data.data.name + ' ' + checkPersonResponse.data.data.surname);

                let advanceRequest = {
                    "proposalId": checkPersonResponse.data.data.proposalId,
                    "token": localStorage.getItem("token")
                };
                axios
                    .post(window.baseUrl + '/tss/api/advance', JSON.stringify(advanceRequest), { headers: { 'Content-Type': 'application/json' } })
                    .then(advanceFirstResponse => {
                        localStorage.setItem('proposalId', advanceRequest.proposalId);

                        let contactInfo = {
                            "Email": firstSectionData.email,
                            "GSM": firstSectionData.gsm.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "").replace(' ', '').replace(' ', '').replace(' ', ''),
                            "ProposalId": localStorage.getItem('proposalId'),
                            "ContactConsent": firstSectionData.contactConsent,
                            "Token": localStorage.getItem("token")
                        };

                        var emailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                        if (emailValid.test(contactInfo.Email) == false || new RegExp('[0-9]{10}').test(contactInfo.GSM) == false || !contactInfo.ProposalId || contactInfo.contactConsent == '' || contactInfo.ContactConsent == null || !contactInfo.Token) {
                            $('#sms-dogrulama-basarili-modal').modal('toggle');
                            document.getElementById("loaderBG").style.display = "none";
                            $("#devam-edemiyoruz1").modal();
                            $('#UyariMesaji').html('Hatalı veri girişi!');
                            return;
                        }

                        axios.post(window.baseUrl + '/tss/api/contactInfo', JSON.stringify(contactInfo), { headers: { 'Content-Type': 'application/json' } })
                            .then(contactInfoResponse => {
                                if (contactInfoResponse.data.errorMessage == '') {
                                    localStorage.setItem("customer-email", firstSectionData.email);

                                    let advanceSecondRequest = {
                                        "proposalId": localStorage.getItem('proposalId'),
                                        "token": localStorage.getItem("token")
                                    };
                                    console.log(advanceSecondRequest);
                                    axios.post(window.baseUrl + '/tss/api/advance', JSON.stringify(advanceSecondRequest), { headers: { 'Content-Type': 'application/json' } })
                                        .then(advanceSecondResponse => {
                                            localStorage.setItem('proposalId', advanceSecondRequest.proposalId);
                                            window.location.href = '/Bupa/SaglikBilgileri';
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                }
                                else {
                                    $('#sms-dogrulama-basarili-modal').modal('toggle');
                                    document.getElementById("loaderBG").style.display = "none";
                                    $("#devam-edemiyoruz1").modal();
                                    $('#UyariMesaji').html(response.errorMessage);
                                    return;
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(err => {
                        clearFirstSectionData();
                        $('#sms-dogrulama-basarili-modal').modal('toggle');
                        document.getElementById("loaderBG").style.display = "none";
                        $("#devam-edemiyoruz1").modal();
                        $('.UyariMesaj').html('İşleminize devam edemiyoruz');
                        console.log(err);
                        return;
                    });
            }
            else {
                clearFirstSectionData();
                $('#sms-dogrulama-basarili-modal').modal('toggle');
                document.getElementById("loaderBG").style.display = "none";
                $("#devam-edemiyoruz1").modal();
                $('.UyariMesaj').html(data.responseText);
                return;
            }
        })
        .catch(err => {
            console.log(err);
        });
}