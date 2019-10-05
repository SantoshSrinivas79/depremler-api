import Queue from 'bull';
import Request from 'request';
import chalk from 'chalk';
import Earthquakes from '../imports/collections/earthquakes';
import { parseBody, getFields, sliceList } from '../imports/utils/shortcuts';
import notification from '../imports/utils/notifications';

const log = console.log;
const { REDIS_URL, DEP_API_URL } = process.env;

// Queues
EarthquakesQueue = Queue('earthquakes', REDIS_URL);

// Process
EarthquakesQueue.process(
	Meteor.bindEnvironment((job, done) => {
		log(chalk.blue('EarthquakesQueue - ÇALIŞTI'));

		Request(
			DEP_API_URL,
			Meteor.bindEnvironment((err, res, body) => {
				if (err) {
					return log(chalk.red('Request - ULAŞAMADI!'));
				}

				// parse body.
				const list = parseBody(body);

				sliceList(list).map(
					Meteor.bindEnvironment((doc) => {
						const data = getFields(doc);
						const earthquake = Earthquakes.findOne({ hash: data.hash });

						if (_.isUndefined(earthquake)) {
							return Earthquakes.insert(data, (error, result) => {
								return notification(`${data.location} üzerinde ${doc.depth} km derinliğinde ${doc.force} büyüklüğünde deprem oldu!`);
							});
						}
					})
				);
			})
		);
	})
);

// add process
EarthquakesQueue.add({}, { repeat: { cron: '*/1 * * * *' } });
