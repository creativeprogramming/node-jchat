(function ($) {
    $.fn.chat = function (options) {
        plug = $.fn.chat;

        o = $.extend({},
            plug.defaults,
            options);

        return this.each(function() {
            var c = new _chat();
            $(this).find('#chatForm').on('submit', function(e) {
                c.submitMsg(this, e);
            });
        })
    };

    var _chat = function() {
        this.socket = io();
        this.user = null;

        this.socket.on('chat message', function(msg, user){
            $('#messages').append($('<li>').text(msg));
        });
    }

    _chat.prototype = {
        submitMsg: function(f, event) {
            event.preventDefault();
            this.socket.emit('chat message', $('#m').val());
            $('#m').val('');

            return false;
        }
    }

    // Default Optionen
    $.fn.chat.defaults = {}
})(jQuery);