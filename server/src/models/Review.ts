import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

const Review = sequelize.define('Review', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  bookId: { type: DataTypes.UUID, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT },
});

export default Review;
