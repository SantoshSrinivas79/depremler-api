import Users from '../imports/collections/users';
import Earthquakes from '../imports/collections/earthquakes';

const Api = new Restivus({
	useDefaultAuth: true,
	prettyJson: true
});

// Register Users
Api.addCollection(Users, {
  excludedEndpoints: ['getAll', 'put', 'patch'],
  routeOptions: { authRequired: true },
  endpoints: {
    post: { authRequired: false },
    delete: { roleRequired: 'admin' }
  }
});

Api.addCollection(Earthquakes, {
  excludedEndpoints: ['put', 'patch', 'delete'],
  routeOptions: { authRequired: false },
  endpoints: {
    getAll: {
      action() {
        const earthquakes = Earthquakes.find({ }, {
          sort: {
            date: -1
          }
        });

        return {
          status: 'success',
          data: earthquakes.fetch()
        }
      }
    }
  }
});