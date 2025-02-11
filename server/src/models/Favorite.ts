import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connection";
// Define an interface for Favorite attributes
interface FavoriteAttributes {
  id: string;
  userId: string;
  bookId: string;
}
// Define an interface for optional fields when creating a new Favorite
interface FavoriteCreationAttributes extends Optional<FavoriteAttributes, "id"> {}
// Extend Sequelize Model
class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> implements FavoriteAttributes {
  public id!: string;
  public userId!: string;
  public bookId!: string;
}
Favorite.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize, // :white_check_mark: Use imported sequelize instance
    tableName: "favorites", // Explicitly set table name
    timestamps: true, // :white_check_mark: Keeps track of created_at & updated_at
  }
);
export default Favorite;