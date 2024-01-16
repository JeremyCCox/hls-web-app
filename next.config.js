const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["styled-components"]);

module.exports = withPlugins([withTM], {
    compiler:{
      styledComponents:true,
    },
    webpack(config, options) {
        return config;
    },
    headers: () => [
        {
            source: '/listen/',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
    ],
    output:"standalone"
});