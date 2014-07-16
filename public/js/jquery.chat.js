
(function ($) {
    $.fn.chat = function (options) {
        plug = $.fn.chat;

        o = $.extend({},
            plug.defaults,
            options);

        return this.each(function () {
            var c = new Chat();
            console.log($('#colorChooser span'));
            $('#colorChooser span').click(function() {
                $('.colorbox').show();
            });
            $('.colorbox').click(function() {
                c.colorChooser(this);
            });

            $(this).find('#chatForm').on('submit', function (e) {
                c.submitMsg(this, e);
            });
        });
    };

    var Chat = function () {
        this.socket = io();
        this.user = null;
        this.color = 'blue';

        this.initUser();
        this.initChat();
        this.disconnect();
    };

    Chat.prototype = {
        submitMsg: function (f, event) {
            event.preventDefault();
            this.socket.emit('chat message', {
                time: new Date(),
                user: this.user,
                msg: $('#m').val(),
                color: this.color
            });
            $('#m').val('');

            return false;
        },
        initChat: function () {
            this.socket.on('chat message', function (data) {
                $('#messages').append($('<li></li>')
                    .append($('<span>')
                        .text(data.time), $('<b>')
                        .text(typeof(data.user) != 'undefined' ? data.user + ': ' : ''), $('<span>')
                        .attr('style', 'color:' + data.color)
                        .html(data.msg)
                    )
                );
                $('html, body').scrollTop($(document).height() - $(window).height(), 'slow');
            });
        },
        initUser: function () {
            if (null === this.user) {
                $('#user-wrapper').show();
                $('#userForm').on('submit', $.proxy(function (event) {
                    event.preventDefault();
                    if ('' === $('#name').val()) {
                        $('.error').show();
                        return false;
                    }
                    this.user = $('#name').val();
                    $('#user-wrapper').hide();
                    this.socket.emit('connected', {
                        user: this.user
                    });
                }, this));
            }
        },
        colorChooser: function(ele) {
            this.color = $(ele).css('background-color');
            $('#m').css('color', this.color);
            var w = $(ele).width();
            var h = $(ele).height();
            $(ele).animate({
                width: w + 2,
                height: h + 2
            }, {
                duration: 200
            }).animate({
                width: w,
                height: h
            }, 200);
        },
        disconnect: function() {
            $(window).on('beforeunload' ,function() {
                this.socket.emit('disconnected', {
                    user: this.user
                });
            });
        }
    };

    // Default Optionen
    $.fn.chat.defaults = {
        io: null
    };
})(jQuery);