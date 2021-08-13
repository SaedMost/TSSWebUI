function btnNext() {
    //let $captcha = $('#recaptcha'),
    //    response = grecaptcha.getResponse();
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
        url: window.baseUrl+'/tss/api/checkperson',
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
