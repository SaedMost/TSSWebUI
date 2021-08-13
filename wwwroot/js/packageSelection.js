const nameMapping = [
    {
        key: "TSS Y (T1)",
        value: "Yatarak Tedavi",
        class: ['Yatarak']
    },
    {
        key: "TSS Y (T2)",
        value: "Yatarak Tedavi",
        class: ['Yatarak']
    },
    {
        key: "TSS Y+A Doğum (T1)",
        value: "Yatarak ve Ayakta Tedavi ve Doğum",
        class: ['Yatarak', 'Ayakta', 'Dogum']
    },
    {
        key: "TSS Y+A Doğum (T2)",
        value: "Yatarak ve Ayakta Tedavi ve Doğum",
        class: ['Yatarak', 'Ayakta', 'Dogum']
    },
    {
        key: "TSS Y+A+Doğum (T2)",
        value: "Yatarak ve Ayakta Tedavi ve Doğum",
        class: ['Yatarak', 'Ayakta', 'Dogum']
    },
    {
        key: "TSS Y+A (T1)",
        value: "Yatarak ve Ayakta Tedavi",
        class: ['Yatarak', 'Ayakta']
    },
    {
        key: "TSS Y+A (T2)",
        value: "Yatarak ve Ayakta Tedavi",
        class: ['Yatarak', 'Ayakta',]
    },
    {
        key: "TSS Y+A+Doğum (T1)",
        value: "Yatarak ve Ayakta Tedavi ve Doğum",
        class: ['Yatarak', 'Ayakta', 'Dogum']
    },
    {
        key: "TSS Y+A+Doğum (T2)",
        value: "Yatarak ve Ayakta Tedavi ve Doğum",
        class: ['Yatarak', 'Ayakta', 'Dogum']
    },
    {
        key: "TSS Y+Doğum (T1)",
        value: "Yatarak Tedavi ve Doğum",
        class: ['Yatarak', 'Dogum']
    },
    {
        key: "TSS Y+Doğum (T2)",
        value: "Yatarak Tedavi ve Doğum",
        class: ['Yatarak', 'Dogum']
    }
];


const benefitDescMap = [
    {
        key: "Ameliyat",
        desc: "Cerrahi ve ortopedik müdahalelere ilişkin sağlık giderleri bu teminat kapsamında değerlendirilir."
    }, {
        key: "Hastanede Tedavi",
        desc: "Ameliyat gerektirmeyen ancak tedavinin sağlık kurumunda en az 24 saat yatış gerektirmesi durumunda, yatış tanısı ile ilgili tüm sağlık giderleri bu teminat kapsamında değerlendirilir."
    }, {
        key: "Suni Uzuv Giderleri",
        desc: "Sigortalılık süresi içinde meydana gelen kaza veya hastalık sonucu gerekli olabilecek protez ve cerrahi uygulamasına ait giderler bu teminat kapsamında değerlendirilir. "
    }, {
        key: "Günübirlik Tedavi",
        desc: "Sağlık kurumlarında yatış ve taburcu işlemi yapılmadan 24 saatlik zaman dilimi içinde yapılan ve SUT kapsamında günübirlik tedaviler kategorisinde belirlenen işlemler bu teminat kapsamında değerlendirilir. Detaylar için Özel Şartlar geçerlidir."
    }, {
        key: "Tıbbi Malzeme",
        desc: "Poliçe süresi içerisinde meydana gelen bir kaza veya hastalık sonucu uygulanan tedavinin bir parçası olarak kullanılan malzemeler poliçede belirtilen teminat limiti ve ödeme yüzdesi bu teminat kapsamında değerlendirilir."
    }, {
        key: "Evde Bakım Hizmetleri",
        desc: "Yatarak tedavi sonrasında, tedavinin devamı için yapılan tıbbi bakım ve tedavilere ilişkin sağlık giderleri ve tıbbi malzeme giderleri bu teminat kapsamında değerlendirilir."
    }, {
        key: "Acil Ulaşım",
        desc: "Hayati tehlike gösteren acil hallerde yerinde müdahale ve/veya en yakın sağlık kurumuna nakil için yapılan masraflar  bu teminat kapsamında değerlendirilir."
    }, {
        key: "Ayakta Tedavi",
        desc: "Tanı işlemleri, teşhis ve tedavinin hastanede yatmayı gerektirmediği hallerde, sağlık kurumlarında yapılan işlemler bu teminat kapsamında değerlendirilir."
    }, {
        key: "Fizik Tedavi ve Rehabilitasyon",
        desc: "Hastalığın tedavisi için tıbben gerekli görülen fizik tedavi ve rehabilitasyon giderleri fizik tedavi uzmanı tarafından düzenlenen tedavi planı ve rapor incelenerek teminat tablosunda belirtilen oran ve limitlerle bu teminat kapsamında değerlendirilir."
    }, {
        key: "Annelik (Doğum)",
        desc: "Normal doğum veya sezaryen işlemlerine ait doktor ve hastane giderleri ile hamilelik döneminde tıbbi gereklilik halinde amniosentez işlemi, hamilelik, küretaj, doğum ve sezaryen komplikasyonlarına bağlı yatışlar poliçede belirtilmiş olan teminat limitleriyle bu teminat kapsamında değerlendirilir."
    },
    {
        key: "Annelik (Rutin Kontrol)",
        desc: "Hamileliği ilgilendiren her türlü kontrol, muayene, rutin tetkik ve ilaçlar teminat tablosunda belirtilen oran ve limitlerle bu teminat kapsamında değerlendirilir."
    }
];

const allSections = ['Yatarak', 'Ayakta', 'Dogum'];

(function () {
    'use strict'
    $(document).ready(function () {

        $('#modalBtn').on('show.bs.modal', function (event) {
            let avaliableSections = $(event.relatedTarget).data("class").split(",");
            console.log(avaliableSections);
            $("h2.ModalBs").html($(event.relatedTarget).data("title"));

            //let hidingSections = allSections.filter(function (x) { return !_.some(avaliableSections, x); });
            let hidingSections = allSections.filter(function (x) {
                return avaliableSections.indexOf(x) == -1;
            });
            console.log(hidingSections);

            hidingSections.forEach(function (t) {
                $(event.target.getElementsByClassName(t)).hide();
            });
        });

        $('#modalBtn').on('hidden.bs.modal', function (event) {
            allSections.forEach(function (t) { $(event.target.getElementsByClassName(t)).show(); });
            $("h2.ModalBs").html('');
        });
        let planListRequest = {
            "proposalId": localStorage.getItem('proposalId'),
            "token": localStorage.getItem("token")
        };
        $.ajax({
            url: window.baseUrl + '/tss/api/PlanList',
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(planListRequest),
            success: function (data) {
                let planIds = [];
                let planNames = [];

                data.data.forEach(function (element) {
                    if (element.planGroup == "T1") {
                        planIds.push({ "T1": element.planId });
                        planNames.push({ "NameT1": element.planName });
                        $('#btn-t1').text('Anlaşmalı Kurum Ağı (' + element.planGroup + ')');
                    }

                    if (element.planGroup == "T2") {
                        planNames.push({ "NameT2": element.planName });
                        $('#btn-t2').text('Anlaşmalı Kurum Ağı (' + element.planGroup + ')');
                        planIds.push({ "T2": element.planId })
                    }

                });
                let T1Datas = [];
                let T2Datas = [];
                planIds.forEach(function (item) {
                    Object.keys(item).forEach(function (key) {
                        if (key === 'T1') {
                            T1Datas.push(item[key])
                        } else {
                            T2Datas.push(item[key])
                        }
                    });
                });


                let T1DatasName = [];
                let T2DatasName = [];
                planNames.forEach(function (item) {
                    Object.keys(item).forEach(function (key) {
                        if (key === 'NameT1') {
                            T1DatasName.push(item[key])
                        } else {
                            T2DatasName.push(item[key])
                        }
                    });
                });

                $('#btn-t1').attr('plan-id', T1Datas);
                $('#btn-t2').attr('plan-id', T2Datas);

                $('#btn-t1').attr('plan-name', T1DatasName);
                $('#btn-t2').attr('plan-name', T2DatasName);

                $('.loading').css('display', 'none');

                $('#btn-t1').css('display', '');
                $('#btn-t2').css('display', '');
                $('#btn-ileri').css('display', '');
            },
            error: function (data) {
                $("#paketSecimi-devam-edemiyoruz").text(data.responseText);
                $('#devam-edemiyoruz').modal('show');
            }
        });

    });

})()

$(".akurum").on("click", function (data) {
    document.getElementById("loaderBG").style.display = "block";
    let pageData = []
    $(".akurum").removeClass("active");
    if (!$(this).hasClass("active")) {
        $(this).addClass("active");
    }
    $(this).attr("plan-id").split(',').forEach(function (t) { pageData.push({ planId: t }); });
    $(this).attr("plan-name").split(',').forEach(function (t, i) {
        pageData[i]['name'] = t;
        let variable = nameMapping.filter(function (x) { return (x.key === t); })[0]
        pageData[i]['displayName'] = variable === null ? null : variable.value;
    });

    pageData.forEach(function (plan) {
        $.ajax({
            url: window.baseUrl + '/tss/api/BenefitDetails',
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ "Data": parseInt(plan.planId), "token": localStorage.getItem("token") })
        }).done(function (result) {
            plan['benefitDetails'] = result.data;
            let calculatePremiumRequest = {
                "planId": parseInt(plan.planId),
                "proposalId": parseInt(localStorage.getItem('proposalId')),
                "token": localStorage.getItem("token")
            }
            $.ajax({
                url: window.baseUrl + '/tss/api/CalculatePremium',
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(calculatePremiumRequest),
                async: false
            })
                .done(function (result) { plan['premium'] = result.data.premium; })
                .fail(function (err) {
                });
        })
            .fail(function (err) {
                alert(err);
            });
    });
    $(document).ajaxStop(function () {
        $('#paket-icerik').html('');
        pageData.sort(function (first, second) { return (first.premium - second.premium); }).forEach(function (plan) {
            $('#paket-thumb .tedavi-adi ').text(plan.displayName ? plan.displayName : "Tedavi Hizmeti");
            if (_.some(plan.displayName, 'Ayakta')) {
                $('#paket-thumb .HediyeCeki .hediyeceki-tutar').html("Güvencenize ek Boyner’den 100 TL’lik HEDİYE ÇEKİ");
            } else {
                $('#paket-thumb .HediyeCeki .hediyeceki-tutar').html("Güvencenize ek Boyner’den 50 TL’lik HEDİYE ÇEKİ");
            }
            $("#paket-thumb .teminatlist").html('');
            let oname = nameMapping.filter(function (x) { return (x.key === plan.name); })[0];
            $('#paket-thumb #detay-modals p a').attr('data-target', '#modalBtn');
            $('#paket-thumb #detay-modals p a').attr('data-class', oname === null ? null : oname.class.join(','));
            $('#paket-thumb #detay-modals p a').attr('data-title', oname === null ? null : oname.value);
            $('#paket-thumb .tedavi-ucret').attr('data-planid', plan.planId);
            $('#paket-thumb .tedavi-ucret').attr('data-price', plan.premium);
            $('#paket-thumb .tedavi-ucret').html(plan.premium + '<small>,00</small> ₺<small>/yıllık</small>');
            plan.benefitDetails.forEach(function (bd) {
                let teminatlist = $('#paket-thumb .teminatlist');
                teminatlist.append('<strong>' + bd.benefitGroupName + '</strong>');
                teminatlist.append('<ul id=' + bd.benefitGroupId + '></ul>')
                bd.benefits.forEach(function (benefit) {
                    teminatlist.children('#' + bd.benefitGroupId).append('<li>' + benefit.name + '</li>')
                });
            });
            $('#paket-icerik').append($('#paket-thumb').html());
            $('[data-toggle="tooltip"]').tooltip();
        });
        packageSelection();
        document.getElementById("loaderBG").style.display = "none";
    });
});

function packageSelection() {
    $("#btn-ileri").attr('disabled', false);
    $(".btn.SecBtn").on("click", function () {
        $("#detay-modals button").removeClass("SecimBtn");
        $("#detay-modals button").addClass("SecBtn");
        $(".packet").addClass("PakeThumb");
        $(".packet").removeClass("PakeThumbS");
        $(this).removeClass("SecBtn");
        $(this).addClass("btn SecimBtn");
        if ($(this).hasClass("SecimBtn")) {
            $('button.SecBtn').html('Seçiniz');
            $(this).html('Paket Seçiminiz');
        }
        $(this).parents(".packet").removeClass("PakeThumb");
        $(this).parents(".packet").addClass("PakeThumbS");
        localStorage.setItem('price', $(this).parents('.packet').find('.tedavi-ucret').data('price'));
        localStorage.setItem('planId', $(this).parents('.packet').find('.tedavi-ucret').data('planid'));
        localStorage.setItem('hediyeceki-tutar', $(this).parents('.packet').find('.hediyeceki-tutar').text());
        if (_.some(localStorage.getItem('hediyeceki-tutar'), '100')) {
            localStorage.setItem('hediyeceki-TL', '100');
        } else if (_.some(localStorage.getItem('hediyeceki-tutar'), '50')) {
            localStorage.setItem('hediyeceki-TL', '50');
        }
        let paketIcerik = [];
        let liList = $(this).parents(".packet").children(".teminatlist").find("ul li")
        let paketAdi = $(this).parents(".packet").find(".tedavi-adi").text();
        for (let i = 0; i < liList.length; i++) {
            paketIcerik.push(liList[i].innerHTML);
        }

        localStorage.removeItem("paketAdi");
        localStorage.setItem("paketAdi", paketAdi);
        localStorage.removeItem("packetSelected");
        localStorage.setItem("packetSelected", paketIcerik.join(", "));
    });
    document.getElementById("loaderBG").style.display = "none";
}

$("#btn-ileri").on("click", function (data) {
    let updatePolicy = {
        "proposalId": localStorage.getItem('proposalId'),
        "planId": localStorage.getItem('planId'),
        "token": localStorage.getItem("token")
    }
    document.getElementById("loaderBG").style.display = "block";
    $.ajax({
        url: window.baseUrl + '/tss/api/UpdatePolicy',
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(updatePolicy),
        success: function (result) {
            advance(localStorage.getItem('proposalId'), '/Bupa/Odeme');
        },
        error: function (err) {
            document.getElementById("loaderBG").style.display = "none";
        },
        async: false
    })
});