Cache = function(m) {
    this.store = {};
    this.max = m;
};

Cache.prototype = {
    set: function(value) {
        var d = new Date().toISOString();
        this.store[d] = value;
        this.clearCache();
    },
    get: function() {
        return this.store;
    },
    remove: function(key) {
        var value = this.store[key];
        delete this.store[key];
    },
    clear: function() {
        this.store = {};
    },
    clearCache: function() {
        for (var key in this.store) {
            var now = new Date();
            var t = new Date(key);
            var ms = now.getMilliseconds();
            var elapsed = (now.getTime() - t.getTime()) / 1000;
            if (this.max < elapsed) {
                this.remove(key);
            }
        };
    }
};

if (typeof exports !== "undefined") {
    module.exports = Cache;
}