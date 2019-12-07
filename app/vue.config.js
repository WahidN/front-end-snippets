module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
            @import "@/assets/styles/1-helpers/_variables.scss";
            @import "@/assets/styles/2-tools/_mixins.scss";
            `
            }
        }
    }
};