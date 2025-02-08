import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

const Favorite = sequelize.define('Favorite', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  bookId: { type: DataTypes.UUID, allowNull: false },
});

export default Favorite;
