module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
            @import "@/assets/styles/1-helpers/_variables.scss";
            `
            }
        }
    }
};