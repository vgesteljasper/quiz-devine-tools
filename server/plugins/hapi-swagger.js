// because `hapi-swagger` doesn't provide `.register.attributes.pkg.name`
// it can't be loaded in the `plugins` array for `hapi-devine-autoload`

module.exports = require(`hapi-swagger`);
