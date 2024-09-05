import { AppDataSource } from './data-source';

export const extractData = async() => {
    try {
        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()

        // extracting data from user_home
        const userHomeData = await queryRunner.query(`SELECT * FROM user_home;`);
        console.log('userHomeData : ' , userHomeData)
        return userHomeData
    } catch (error) {
        console.error('Error in extracting data:', error);
    }
}

