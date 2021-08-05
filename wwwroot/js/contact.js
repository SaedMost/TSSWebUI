$('#btn-ileriIletisim').on('click', function () {
    let isValid = true;
    let forms = document.getElementsByClassName('needs-validation')
    Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated')
            isValid=false;
        }
    })
    if (isValid)
        postContactInfoForm();

})

function postContactInfoForm() {
    let contactInfo = {
        "Email": $('#eposta').val(),
        "GSM": $('#ceptelefonu').val().replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "").replace(' ', '').replace(' ', '').replace(' ', ''),
        "ProposalId": localStorage.getItem('proposalId'),
        "ContactConsent": $('#kvkk-onay').is(':checked'),
        "Token": localStorage.getItem("token")
    }
    document.getElementById("loaderBG").style.display = "block";
    $.ajax({
        url: window.baseUrl+'/tss/api/contactInfo',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(contactInfo),
        success: function (data) {
            localStorage.setItem("customer-email", $('#eposta').val());
            advance(localStorage.getItem('proposalId'), '/Bupa/SaglikBilgileri');
        },
        error: function (data) {
            document.getElementById("loaderBG").style.display = "none";
            $("#devam-edemiyoruz1").modal();
            $('#UyariMesaji').html(data.responseText);
        }
    });
}