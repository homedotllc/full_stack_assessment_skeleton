import { AppDataSource } from "./data-source";
import { extractData } from "./data-extractor";
import { User } from "./entities/User";
import { Home } from "./entities/Home";

export const seedData = async() => {
    // get the repos
    const userRepository = AppDataSource.getRepository(User);
    const homeRepository = AppDataSource.getRepository(Home);

    // extract data 
    const userHomeData = await extractData();
    console.log('userHomeData:', userHomeData);

    const homeMap = new Map<string, Home>();

    for (const data of userHomeData) {
        let home = homeMap.get(data.street_address);
        if (!home) {
            // find if a home with teh same street name exists or not
            home = await homeRepository.findOneBy({ streetAddress: data.street_address });
            
            if (!home) {
                // creating a new home if it does not exists
                home = new Home();
                home.streetAddress = data.street_address;
                home.state = data.state;
                home.zip = data.zip;
                home.sqft = data.sqft;
                home.beds = data.beds;
                home.baths = data.baths;
                home.listPrice = data.list_price;
                await homeRepository.save(home);
            }
            // add the home to the map
            homeMap.set(data.street_address, home);
        }

        let user = await userRepository.findOne({ where: { username: data.username } });
        if (!user) {
            user = new User();
            user.username = data.username;
            user.email = data.email;
            await userRepository.save(user);
        }

        // Add home to user's homes if not already added
        if (!user.homes || !user.homes.some(h => h.id === home.id)) {
            user.homes = user.homes || [];
            user.homes.push(home);
            await userRepository.save(user);
        }
    }
}
