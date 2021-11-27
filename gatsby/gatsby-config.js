const path = require("path");

module.exports = {
    /* Your site config here */
    plugins: [
        {
            resolve: "gatsby-plugin-typescript",
            options: {
            },
        },
        {
            resolve: "gatsby-plugin-tsconfig-paths",
            options: {
                configFile: `${__dirname}/tsconfig.json`,
            },
        },
        {
            resolve: "gatsby-plugin-page-creator",
            options: {
                path: path.join(__dirname, "src", "pages"),
                ignore: ["__generated__/*"],
            }
        },
    ],
    siteMetadata: {
        title: "Gatsby Test",
        description: "Web Dev Portfolio",
        copyright: "This website is copyright 2021 Web Worrior",
    },
}
