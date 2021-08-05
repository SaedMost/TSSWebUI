function advance(proposalId, redirectUrl) {
    let advanceRequest = {
        "proposalId": proposalId,
        "token": localStorage.getItem("token")
    };
    $.ajax({
        url: window.baseUrl+'/tss/api/advance',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(advanceRequest),
        success: function (data) {
            localStorage.setItem('proposalId', proposalId);
            $('#loaderBG').css('display', 'none');
            window.location.href = redirectUrl;
        },
        error: function (data) {
            alert('İşleminize devam edemiyoruz');
            console.log(data);
        }
    });
}