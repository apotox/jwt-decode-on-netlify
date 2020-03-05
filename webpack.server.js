//webpack.config.js
require('dotenv').config()
const pkg = require('./package')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')


const externals = [
    'lodash',
    'mongoose',
    '@sendgrid/mail',
    'node-fetch'
]

const genPackage = () => ({
    name: 'netlify-functions',
    private: true,
    main: 'hello.js',
    author:"@saphidev",
    license: 'MIT',
    dependencies: externals.reduce(
    (acc, name) =>
        Object.assign({}, acc, {
        [name]:
            pkg.dependencies[name]
        }),
    {}
    )
})


module.exports = {
    target: 'node',
    resolve: {
        mainFields: ['module', 'main']
    },
    externals: externals.reduce(
        (acc, name) => Object.assign({}, acc, { [name]: true }),
        {}
    ),
    plugins: [new GenerateJsonPlugin('package.json', genPackage())]
}