const CommandQueue = function CommandQueue(delay) {
    this.delay = delay;
    this._queue = [];
    this._interval = setInterval(this.process.bind(this), this.delay);
}

CommandQueue.prototype.queue = function queue(func) {
    this._queue.push(func);
}

CommandQueue.prototype.process = function process() {
    var command = this._queue.splice(0, 1);

    if (command[0]) {
        command[0]();
    }
}

module.exports = CommandQueue;