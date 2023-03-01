const Greeting = require("./Base");

module.exports = class Welcome extends Greeting {
    constructor() {
        super();
        this.textTitle = "WELCOME";
        this.textMessage = "{server}";
        this.colorTitle = "#03A9F4";
        this.assent = "https://i.ibb.co/h8Lxzq2/welcome.png";
    }
};
