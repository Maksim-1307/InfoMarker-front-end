const $ = require('jquery');

function rm_px(value, toFloat=true){
    const val = value.slice(0, -2);
    if (toFloat){
        return parseFloat(val);
    } else {
        return Math.round(val);
    }
}


function nice_border(){
    $('.nice-border').each(function(){

        $(this).append("\
        <div class='nice-border__element'>\
            <div class='nice-border__top'>\
                <div class='nice-border__edge'></div>\
                <div class='nice-border__horizontal'></div>\
                <div class='nice-border__edge'></div>\
            </div>\
            <div class='nice-border__middle'>\
                <div class='nice-border__vertical'></div>\
                <div class='nice-border__vertical'></div>\
            </div>\
            <div class='nice-border__bottom'>\
                <div class='nice-border__edge'></div>\
                <div class='nice-border__horizontal'></div>\
                <div class='nice-border__edge'></div>\
            </div>\
        </div>");

        let borderWidth = 3;
        let element = $(this).find('.nice-border__element');
        let width = parseFloat($(this).css("width").slice(0, -2)) + borderWidth * 2;
        let height = parseFloat($(this).css("height").slice(0, -2)) + borderWidth * 2;
        element.css({
            "top" : -borderWidth + "px",
            "left": -borderWidth + "px",
            "width":  width + "px",
            "height":  height + "px",
        });

        let i = 0;
        $('.nice-border__edge').each(function(){
            let rotate = 0;
            switch(i % 4){
                case 0: rotate = 0;
                case 1: rotate = 90;
                case 2: rotate = 270;
                case 3: rotate = 180;
            }
            $(this).css("transform", "rotate(" + (90 * (i%4)) + "deg)")
            i++;
        });

        const lineLen = 40.0; // width gap
        $('.nice-border__horizontal').each(function(){
            $(this).empty();
            width = $(this).css('width');
            const linesCount = Math.round(rm_px(width, true) / lineLen);
            $(this).append(('<div class="nice-border__h-line"></div>').repeat(linesCount));
        });
        $('.nice-border__vertical').each(function () {
            $(this).empty();
            height = $(this).css('height');
            const linesCount = Math.round(rm_px(height, true) / lineLen);
            $(this).append(('<div class="nice-border__v-line"></div>').repeat(linesCount));
        });
    })
}


function open_user_card(container){
    if (container.attr('state') == 'opened') return;
    const duration = 300;
    const text = container.find(".user-card__text");
    if (!text) {
        throw new Error(".user-card__text not found in .user-card-opened > .user-card (user-card-animation.js)");
    }
    container.animate({
        opacity: 1,
        padding: "8px",
        top: "-8px",
        right: "-8px"
    }, duration, 'swing');
    let width = text.css("width").slice(0, -2);
    width = parseFloat(width) + 8;
    text.css("width", "0");
    text.css("display", "flex");
    text.animate({
        width: width + "px",
        opacity: 1,
        'padding-left': "12px"
    }, duration, 'swing');
    container.attr('state', 'opened');
}

function close_user_card(container) {
    if (container.attr('state') == 'closed') return;
    const duration = 300;
    let text = container.find(".user-card__text");
    if (!text) {
        throw new Error(".user-card__text not found in .user-card-opened > .user-card (user-card-animation.js)");
    }
    container.animate({
        opacity: 0,
        padding: "0px",
        top: "0px",
        right: "0px"
    }, duration, 'swing');
    let width = text.css("width").slice(0, -2);
    width = parseFloat(width - 8);
    text.animate({
        width: "0px",
        opacity: 0,
        'padding-left': "0px"
    }, duration, 'swing', function(){
        text.css("display", "none");
        text.css("width", width);
    });

    container.attr('state', 'closed');
}




// $(".upload-field").on("dragover", function (event) {
//     event.preventDefault();
//     event.stopPropagation();
// });

// $(".upload-field").on("dragleave", function (event) {
//     event.preventDefault();
//     event.stopPropagation();
// });

// $(".upload-field").on("drop", function (event) {
//     event.preventDefault();
//     event.stopPropagation();
//     const files = Array.from(event.originalEvent.dataTransfer.files);
//     if (!files) return new Error('Drag and drop file is missing');
//     $('#upload-file').files = files[0];
//     console.log($('#upload-file').files);
//     console.log(files[0]);
//     formData = new FormData($('form')[0]);
//     formData.set('file', files[0]);
//     alert('Файл успено загружен. Отправка на сервер будет реализована с помощью фреймворка React');
// });


function reload_user_card(){

    $(document).on('click', function (e) {
        var container = $('.user-card-opened');
        if (container.attr('state') == 'closed') return;
        if ($(e.target).closest(container).length) return;
        close_user_card(container);
    });
    $(".user-card__avatar").on("click", function () {

        if (parseFloat($('body').css('width').slice(0, -2)) >= 600) return;

        let container = $(this).closest(".user-card-opened");
        if (!container) {
            throw new Error(".user-card-opened not found (user-card-animation.js)");
        }
        if ($(container).is(':animated')) return;

        let state = container.attr('state');
        if (state == 'opened') {
            close_user_card(container);
        } else if (state == 'closed') {
            open_user_card(container);
        }

    });
}


function reload_nice_border(){
    $(window).on('resize', function () {
        nice_border();
    });

    $(function () {
        nice_border();
    });
}

export {reload_user_card, reload_nice_border};