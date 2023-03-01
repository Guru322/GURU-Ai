module.exports = {

    /**
     * Gets variables and types
     * @param {object} prefix The type of variable
     * @param {object} variable The variable to change
     * @returns The variable formatted
     */
    formatVariable(prefix, variable){
        const formattedVariable = variable.toLowerCase()
        .split("-").map((word) => word.charAt(0).toUpperCase()+word.substr(1, word.length).toLowerCase()).join("");
        return prefix+formattedVariable;
    },
    
    /**
     * Gets variables and types
     * @param {object} canvas The canvas
     * @param {object} text The text
     * @param {object} defaultFontSize The default font pixel size
     * @param {object} width The max width of the text
     * @param {object} font The text font
     * @returns The variable formatted
     */
    applyText(canvas, text, defaultFontSize, width, font){
        const ctx = canvas.getContext("2d");
        do {
            ctx.font = `${(defaultFontSize -= 1)}px ${font}`;
        } while (ctx.measureText(text).width > width);
        return ctx.font;
    }

};
