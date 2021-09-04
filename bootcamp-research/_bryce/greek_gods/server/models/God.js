const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
// const Abode = mongoose.model('abode');

const GodSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	type: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	domains: [
		{
			type: String
		}
	],
	abode: {
		type: Schema.Types.ObjectId,
		ref: 'abode'
	},
	emblems: [
		{
			type: Schema.Types.ObjectId,
			ref: 'emblem'
		}
	],
	parents: [
		{
			type: Schema.Types.ObjectId,
			ref: 'god'
		}
	],
	children: [
		{
			type: Schema.Types.ObjectId,
			ref: 'god'
		}
	],
	siblings: [
		{
			type: Schema.Types.ObjectId,
			ref: 'god'
		}
	]
});

GodSchema.statics.findRelatives = function(godId, type) {
	return this.findById(godId)
		.populate(`${type}`)
		.then(god => god[type]);
};

GodSchema.statics.addRelative = (godId, relativeId, relationship) => {
	const God = mongoose.model('god');

	return God.find({
		_id: { $in: [godId, relativeId] }
	}).then(gods => {
		const god = godId === gods[0].id ? gods[0] : gods[1];
		const relative = relativeId === gods[0].id ? gods[0] : gods[1];

		switch (relationship) {
			case 'parent':
				god.parents.push(relative);
				relative.children.push(god);
				break;
			case 'child':
				god.children.push(relative);
				relative.parents.push(god);
				break;
			case 'sibling':
				god.siblings.push(relative);
				relative.siblings.push(god);
				break;
		}

		return Promise.all([god.save(), relative.save()]).then(([god, relative]) => god);
	});
};

GodSchema.statics.removeRelative = (godId, relativeId, relationship) => {
	const God = mongoose.model('god');

	return God.find({
		_id: { $in: [godId, relativeId] }
	}).then(gods => {
		const god = godId === gods[0].id ? gods[0] : gods[1];
		const relative = relativeId === gods[0].id ? gods[0] : gods[1];

		switch (relationship) {
			case 'parent':
				god.parents = god.parents.filter(parent => parent != relativeId);
				relative.children = relative.children.filter(child => child != godId);
				break;
			case 'child':
				god.children = god.children.filter(child => child != relativeId);
				relative.parents = relative.parents.filter(parent => parent != godId);
				break;
			case 'sibling':
				god.siblings = god.siblings.filter(sibling => sibling != relativeId);
				relative.siblings = relative.siblings.filter(sibling => sibling != godId);
				break;
		}

		return Promise.all([god.save(), relative.save()]).then(([god, relative]) => god);
	});
};

GodSchema.statics.addEmblem = (godId, emblemId) => {
	const God = mongoose.model('god');
	const Emblem = mongoose.model('emblem');

	return God.findById(godId).then(god => {
		return Emblem.findById(emblemId).then(emblem => {
			god.emblems.push(emblem);
			emblem.gods.push(god);
			return Promise.all([god.save(), emblem.save()]).then(([god, emblem]) => god);
		});
	});
};

GodSchema.statics.removeEmblem = (godId, emblemId) => {
	const God = mongoose.model('god');
	const Emblem = mongoose.model('emblem');

	return God.findById(godId).then(god => {
		return Emblem.findById(emblemId).then(emblem => {
			god.emblems = god.emblems.filter(existingEmblem => existingEmblem != emblemId);
			emblem.gods = emblem.gods.filter(existingGod => existingGod != godId);
			return Promise.all([god.save(), emblem.save()]).then(([god, emblem]) => god);
		});
	});
};

GodSchema.statics.findEmblems = function(godId) {
	return this.findById(godId)
		.populate('emblems')
		.then(god => god.emblems);
};

GodSchema.statics.updateAbode = (godId, abodeId) => {
	const God = mongoose.model('god');
	const Abode = mongoose.model('abode');

	return God.findById(godId).then(god => {
		return Abode.find({
			_id: { $in: [abodeId, god.abode] }
		}).then(abodes => {
			const oldAbode = abodes[0].id !== abodeId ? abodes[0] : abodes[1];
			const newAbode = abodes[0].id === abodeId ? abodes[0] : abodes[1];
			if (oldAbode) oldAbode.gods = oldAbode.gods.filter(oldGod => oldGod != godId);
			newAbode.gods.push(god);
			god.abode = newAbode;

			if (oldAbode) {
				return Promise.all([god.save(), oldAbode.save(), newAbode.save()]).then(
					([god, oldAbode, newAbode]) => god
				);
			} else {
				return Promise.all([god.save(), newAbode.save()]).then(([god, newAbode]) => god);
			}
		});
	});
};

GodSchema.statics.addDomain = (godId, domain) => {
	const God = mongoose.model('god');

	return God.findById(godId).then(god => {
		god.domains.push(domain);

		god.save().then(god => god);
	});
};

GodSchema.statics.removeDomain = (godId, domain) => {
	const God = mongoose.model('god');

	return God.findById(godId).then(god => {
		god.domains.forEach((godDomain, i) => {
			if (godDomain === domain) {
				god.domains.splice(i, 1);
			}
		});

		god.save().then(god => god);
	});
};

module.exports = mongoose.model('god', GodSchema);
