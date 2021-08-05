(function () {
    'use strict'

    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation')
        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
    }, false)


    /*Tooltip*/
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    /*Bind*/
    $('input[id="tcno"]').bind('paste', function () { return false; })
    $('input[id="tcno"]').bind('copy', function () { return false; })
    $('input[id="input-cardnumber"]').bind('paste', function () { return false; })
    $('input[id="input-cardnumber"]').bind('copy', function () { return false; })
    
})()



/*Loader */
var myVar;
function loadinggg() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
    //document.getElementById("loader").style.display = "none";
    document.getElementById("loaderBG").style.display = "none";
}