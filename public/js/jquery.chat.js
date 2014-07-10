(function ($) {
    $.fn.chat = function (options) {
        plug = $.fn.chat;

        o = $.extend({},
            plug.defaults,
            options);

        return this.each(function () {
            var c = new _chat();
            $('.colorbox').click(function() {
                c.colorChooser(this);
            });

            $(this).find('#chatForm').on('submit', function (e) {
                c.submitMsg(this, e);
            });
        });
    };

    var _chat = function () {
        this.socket = io();
        this.user = 'anonym';
        this.color = 'blue';

        this.initUser();
        this.colorChooser();
        this.initChat();
    };

    _chat.prototype = {
        submitMsg: function (f, event) {
            event.preventDefault();
            this.socket.emit('chat message', {
                time: this.getTimeString(new Date()),
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
                        .text(data.msg)
                    )
                );
            });
        },
        initUser: function () {
            if ('anonym' === this.user) {
                $('#user-wrapper').show();
                $('#userForm').on('submit', $.proxy(function (event) {
                    event.preventDefault();
                    this.user = $('#name').val();
                    $('#user-wrapper').hide();
                }, this));
            }
        },
        getTimeString: function (time) {
            var t = new Date(time);
            return '[' +
                (t.getHours() < 10 ? '0' + t.getHours() : t.getHours()) + ':' +
                (t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes()) + '] ';
        },
        colorChooser: function(ele) {
                this.color = $(ele).css('background-color');
                $('.bold').removeClass('bold');
                $(ele).addClass('bold');
        }
    };

    // Default Optionen
    $.fn.chat.defaults = {
        io: null
    };
})(jQuery);