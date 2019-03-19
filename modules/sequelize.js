const cred = require("../config/mysql.json");

let Sequelize = require("sequelize");

let sequelize = new Sequelize(cred.database, cred.user, cred.password, {
    host: cred.host,
    dialect: "mysql",
    logging: false,
    port: cred.port,
    operatorsAliases: false
});

sequelize.run = {
    select: function(column, table, statement, rep) {
        let col = column;

        if (!statement) {
            statement = "1";
        }

        if (typeof column == "object") {
            col = column.join(", ");
        }

        return sequelize.query("SELECT " + col + " FROM " + table + " WHERE " + statement, {
            type: sequelize.QueryTypes.SELECT,
            replacements: rep
        });
    },

    insert: function(table, column, value, rep) {
        let columnStr = column;
        if (typeof column == "object") {
            columnStr = column.join(", ");
        }

        let valueStr = value;
        if (typeof value == "object") {
            valueStr = value.join(", ");
        }

        return sequelize.query("INSERT INTO " + table + " (" + columnStr + ") VALUES (" + valueStr + ")", {
            type: sequelize.QueryTypes.INSERT,
            replacements: rep
        });
    },

    update: function(table, set, statement, rep) {
        let col = column;

        if (!statement) {
            statement = "1";
        }

        return sequelize.query("UPDATE  " + table + " SET " + set + " WHERE " + statement, {
            type: sequelize.QueryTypes.UPDATE,
            replacements: rep
        });
    },

    delete: function(table, statement, rep) {
        if (!statement) {
            statement = "1";
        }

        return sequelize.query("DELETE FROM  " + table + " WHERE " + statement, {
            type: sequelize.QueryTypes.DELETE,
            replacements: rep
        });
    }
};

module.exports = sequelize;
