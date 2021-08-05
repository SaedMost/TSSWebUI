var desen_tc = /^[0-9]{11}$/;
function TC_No_Kaydet() {
    var parTC = $("#tcno").val();
    var blnSonuc = true;
    var strTC = String(parTC);
    if (desen_tc.test(strTC) == false) {
        blnSonuc = false;
        $("#tcno").focus();
        $(".tco").show();
    }
    int1 = parseInt(strTC.substr(0, 1));
    int2 = parseInt(strTC.substr(1, 1));
    int3 = parseInt(strTC.substr(2, 1));
    int4 = parseInt(strTC.substr(3, 1));
    int5 = parseInt(strTC.substr(4, 1));
    int6 = parseInt(strTC.substr(5, 1));
    int7 = parseInt(strTC.substr(6, 1));
    int8 = parseInt(strTC.substr(7, 1));
    int9 = parseInt(strTC.substr(8, 1));
    int10 = parseInt(strTC.substr(9, 1));
    int11 = parseInt(strTC.substr(10, 1));

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
    if (blnSonuc == false) {
        $("#tcno").focus();
        $(".tco").show();
    }
    if (blnSonuc == true) {
        $(".tco").hide();
    }
    return blnSonuc;
}