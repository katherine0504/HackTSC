$(document).ready(function(){
    var winHeight = $(window).height();
    var jHeight = $('.jumbotron').height();
    $('.jumbotron').css({
        marginTop: (winHeight / 3) - (jHeight / 2) + 'px'
    });
    $('#intro').fadeIn(1000);
})

function startOnclick() {
    $('#intro').hide();
    $('#form').fadeIn(1000);
}

function submitClick() {
    var hometown;
    switch($('#homeInput').val()) {
        case 1:
            hometown = "highest"
            break;
        case 2:
            hometown = "high"
            break;
        case 3:
            hometown = "low"
            break;
        case 4:
            hometown = "lowest"
            break;
        default:
            hometown = "foreign"
            break;
    }
    var data = {
        "Inputs": {
            "input1": {
            "ColumnNames": [
                "City",
                "Nights Stayed",
                "Days Prior",
                "Age(modified)",
                "Time of day",
                "Hometown",
                "Time of week"
            ],
            "Values": [
                [
                $('#cityInput').val(),
                $('#nightInput').val(),
                Math.round(Math.random() * 10 + 1),
                Math.log(parseInt($('#ageInput').val())+1),
                "afternoon",
                hometown,
                $('#weekInput').val()
                ]
            ]
            }
        },
        "GlobalParameters": {
            "Append score columns to output": ""
        }
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:1234/check",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        error: function() { console.log("No data found."); },
        success: function (response) {
            console.log('response:' + JSON.stringify(response));
            console.log(Math.floor(response["Results"]["output1"]["value"]["Values"][0][0]))
            $('#priceval').html(Math.floor(response["Results"]["output1"]["value"]["Values"][0][0]))
        
            console.log(hotels[$('#cityInput').val()])
            var html = ""
            var hotel = hotels[$('#cityInput').val()]
            var ran = 0
            if(hotel.length > 1) {
                ran = Math.floor(Math.random() * hotel.length)
                html = `<h1 class="display-6">推薦您${hotel[ran]["name"]}</h1>
                <p>價格為 ${hotel[ran]["price"][$('#weekInput').val() == "weekend" ? 1 : 0]} / 晚</p>
                <div style="text-align: center;">
                    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img class="d-block w-100" src="${hotel[ran]["images"][0]}">
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="${hotel[ran]["images"][1]}">
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="${hotel[ran]["images"][2]}">
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="${hotel[ran]["images"][3]}">
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="${hotel[ran]["images"][4]}">
                            </div>
                        </div>
                    </div>
                </div>`
            } else {
                html = `<h1 class="display-6">推薦您${hotel["name"]}</h1>
                <p>價格為 ${hotel["price"][$('#weekInput').val() == "weekend" ? 1 : 0]} / 晚</p>
                <div style="text-align: center;">
                    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img class="d-block w-100" src="${hotel["images"][0]}">
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="${hotel["images"][1]}">
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="${hotel["images"][2]}">
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="${hotel["images"][3]}">
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100" src="${hotel["images"][4]}">
                            </div>
                        </div>
                    </div>
                </div>`
            }
            $('#msg').html(html)
            $('#form').hide()
            $('#result').fadeIn(1000)
            $('.carousel').carousel({
                interval: 2000
            })
        }
    })
}


var hotels = {
    "taipei": {
        "name": "台糖台北會館",
        "price": [2999, 5630],
        "images": [
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00013/TH00013_02.jpg",
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00013/TH00013_03.jpg",
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00013/TH00013_04.jpg",
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00013/TH00013_05.jpg",
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00013/TH00013_06.jpg"
        ]
    },
    "taichung": {
        "name": "台中中科大飯店",
        "price": [3100, 5600],
        "images": [
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00004/TH00004_02.jpg",
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00004/TH00004_03.jpg",
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00004/TH00004_04.jpg",
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00004/TH00004_05.jpg",
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00004/TH00004_06.jpg"
        ]
    },
    "hualien": [
        {
            "name": "花蓮觀光糖廠",
            "price": [2520, 4200],
            "images": [
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00006/TH00006_02.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00006/TH00006_03.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00006/TH00006_04.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00006/TH00006_05.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00006/TH00006_06.jpg"
            ]
        },
        {
            "name": "麗格休閒飯店",
            "price": [2310, 4620],
            "images": [
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00014/TH00014_02.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00014/TH00014_03.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00014/TH00014_04.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00014/TH00014_05.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00014/TH00014_06.jpg"
            ]
        },
        {
            "name": "麗軒國際飯店",
            "price": [2580, 5720],
            "images": [
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00015/TH00015_02.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00015/TH00015_03.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00015/TH00015_04.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00015/TH00015_05.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00015/TH00015_06.jpg"
            ]
        }
    ],
    "tainan": [
        {
            "name": "台糖長榮酒店",
            "price": [4999, 6800],
            "images": [
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00001/TH00001_02.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00001/TH00001_03.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00001/TH00001_04.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00001/TH00001_05.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00001/TH00001_06.jpg"
            ]
        },
        {
            "name": "尖山埤江南渡假村",
            "price": [4000, 6700],
            "images": [
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00002/TH00002_02.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00002/TH00002_03.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00002/TH00002_04.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00002/TH00002_05.jpg",
                "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00002/TH00002_06.jpg"
            ]
        }
    ],
    "taitung": {
        "name": "池上牧野渡假村",
        "price": [3800, 6200],
        "images": [
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00003/TH00003_02.jpg",
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00003/TH00003_03.jpg",
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00003/TH00003_04.jpg",
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00003/TH00003_05.jpg",
            "https://www.ez-lohas.com.tw/THClient/images/Hotel/TH00003/TH00003_06.jpg"
        ]
    }
}