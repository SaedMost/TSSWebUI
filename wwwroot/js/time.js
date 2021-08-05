var d = new Date();
var gun = d.getDate();
var ay = (d.getMonth() + 1);
var yil = d.getFullYear();
var nowDate = gun + "." + ay + "." + yil;
var afterDate = gun + "." + ay + "." + (yil + 1);
$("#basBitTar").text(nowDate + " - " + afterDate);

d.setDate(d.getDate() + 14);
ay = (d.getMonth() + 1);
gun = d.getDate();
switch (ay) {
    case 1:
        ay = "Ocak";
        break;
    case 2:
        ay = "Şubat";
        break;
    case 3:
        ay = "Mart";
        break;
    case 4:
        ay = "Nisan";
        break;
    case 5:
        ay = "Mayıs";
        break;
    case 6:
        ay = "Haziran";
        break;
    case 6:
        ay = "Temmuz";
        break;
    case 6:
        ay = "Ağustos";
        break;
    case 6:
        ay = "Eylül";
        break;
    case 6:
        ay = "Ekim";
        break;
    case 6:
        ay = "Kasım";
        break;
    case 6:
        ay = "Aralık";
}
$("#gecerlilikTarih").text(gun + " " + ay);

