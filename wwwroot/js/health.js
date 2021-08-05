(function () {
    $("#btn-ileri").on('click', function () {
        let checkBox = document.getElementById("saglik-beyan");
        let forms = document.getElementsByClassName('needs-validation')
        Array.prototype.filter.call(forms, function (form) {

            if (form.checkValidity() === false) {
                event.preventDefault()
                event.stopPropagation()
                form.classList.add('was-validated')
            }
           
            else {
                if (checkBox.checked == false) {
                    $("#beyan-etmediniz").modal({ backdrop: 'static', keyboard: false }) 
                }
                else {
                    postHealthInfoForm();
                }
                
            }
        })
    })
    $("#btn-ileriModal").on('click', function () {
        let forms = document.getElementsByClassName('needs-validation')
        Array.prototype.filter.call(forms, function (form) {

            if (form.checkValidity() === false) {
                event.preventDefault()
                event.stopPropagation()
                form.classList.add('was-validated')
            }
            else {
                postHealthInfoForm();
            }
        })
    })

})()


function postHealthInfoForm() {

    let checkBox = document.getElementById("saglik-beyan");
    let healthInfo = {
        "ProposalId": localStorage.getItem('proposalId'),
        "Height": $("#boy").val(),
        "Weight": $("#kilo").val(),
        "IsHealthy": checkBox.checked,
        "token": localStorage.getItem("token")
    }
    document.getElementById("loaderBG").style.display = "block";
    $.ajax({
        url: window.baseUrl+'/tss/api/HealthInfo',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(healthInfo),
        success: function (data) {
            localStorage.setItem("mainPolicy", data.data.mainPolicyId);
            advance(localStorage.getItem('proposalId'), '/Bupa/PaketSecimi');
        },
        error: function (data) {
            document.getElementById("loaderBG").style.display = "none";
            $("#devam-edemiyoruz1").modal({ backdrop: 'static', keyboard: false }) 
            $('.UyariMesaj').html(data.responseText); 
            
            //alert(data.responseText)
            console.log(data);
            //setTimeout(function () { window.location = "./"; }, 3000);
        }
    })
}
window.onload = function () {
    document.onkeydown = function (e) {
        return (e.which || e.keyCode) != 116;
    };
}  