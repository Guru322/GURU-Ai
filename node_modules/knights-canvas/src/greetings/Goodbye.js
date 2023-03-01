const Greeting = require("./Base");

module.exports = class Goodbye extends Greeting {
    constructor() {
        super();
        this.textTitle = "GOODBYE";
        this.textMessage = "{server}";
        this.colorTitle = "#df0909";
        this.assent = "https://i.ibb.co/d7xkSg3/goodbye.png";
    }
};
