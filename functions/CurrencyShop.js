module.exports = (sequelize, DataTypes) => {
	return sequelize.define('guild_shop', {
		guild_id: DataTypes.STRING,
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
		cost: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	}, {
		timestamps: false,
	});
}