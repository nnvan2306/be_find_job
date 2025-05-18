import { DataTypes, Sequelize } from 'sequelize';
import { CategoryInstance } from '~/types/interface';

export default (sequelize: Sequelize) => {
    const Category = sequelize.define<CategoryInstance>('Category', {
        name: DataTypes.STRING,
    });

    return Category;
};
