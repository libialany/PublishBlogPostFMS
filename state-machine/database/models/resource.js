module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user: {
      allowNull: false,
      type: DataTypes.STRING
    },
    status: { // enviado
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'Initializing'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    tableName: 'resources',
    timestamps: true
  });

  Resource.prototype.fsmUpdate = function (fsm) {
    fsm.updateState(this.status);
    return fsm;
  };

  return Resource;
};
