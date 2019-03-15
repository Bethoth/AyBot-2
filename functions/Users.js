module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		cash: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		bank: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
}