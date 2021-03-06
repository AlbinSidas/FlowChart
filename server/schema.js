const datatype = require('./datatype.js');

const Schema = {
    validate: async function (data, schema) {
        const keys = Object.keys(schema);

        for (const key of keys) {
            const schemaValue = schema[key];
            const value = data[key];
            const targetType = schemaValue.type;
            if (value && typeof value == targetType) {
                if (targetType == 'object' && schemaValue.innerSchema) {
                    this.validate(value, schemaValue.innerSchema);
                }
                continue;
            }
            throw new Error(`Invalid type for key "${key}" in the input data`);
        }
        return;
    },
    jsonSchemas: {
        funcDefSchema: {
            name: { type: datatype.String, innerSchema: null },
            description: { type: datatype.String, innerSchema: null },
            functionVariables: { type: datatype.Array, innerSchema: null },
        },
    },
};

module.exports = Schema;
