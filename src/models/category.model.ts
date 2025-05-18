import { DataTypes, Sequelize } from 'sequelize';
import { CategoryInstance } from '~/types/interface';

export default (sequelize: Sequelize) => {
    const Category = sequelize.define<CategoryInstance>('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
    });

    return Category;
};
