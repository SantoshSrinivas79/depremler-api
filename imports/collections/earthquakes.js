import { Mongo } from 'meteor/mongo';

const Earthquakes = new Mongo.Collection('earthquakes');

Earthquakes.attachSchema(
	new SimpleSchema({
		hash: { type: String },
		lat: { type: Number, decimal: true },
		lon: { type: Number, decimal: true },
		depth: { type: Number, decimal: true },
		force: { type: Number, decimal: true },
		updatedForce: { type: Number, decimal: true },
		location: { type: String },
		date: { type: Date }
	})
);

// HELPERS
Earthquakes.helpers({ });

// MUTATIONS
Earthquakes.mutations({ });

Earthquakes.after.insert((userId, doc) => {
  console.log('DEPREM OLDU');
});

export default Earthquakes;
