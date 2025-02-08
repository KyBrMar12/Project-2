import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

const Book = sequelize.define('Book', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  apiId: { type: DataTypes.STRING, allowNull: false, unique: true },
});

export default Book;
