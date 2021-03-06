// Strips the large character and media objects down to data that will be used by the app
export function selectCharInfo(region, charData, media) {
	const assets = {};
	media.assets.forEach((asset) => {
		assets[asset.key] = asset.value;
	});
	return {
		name: charData.name,
		region,
		realm: {
			name: charData.realm.name,
			slug: charData.realm.slug
		},
		level: charData.level,
		faction: charData.faction.name,
		gender: charData.gender.name,
		race: charData.race.name,
		spec: charData.active_spec.name,
		class: charData.character_class.name,
		ilvl: charData.equipped_item_level,
		guild: charData.guild ? charData.guild.name : 'No Guild',
		lastLogin: new Date(charData.last_login_timestamp).toLocaleString(),
		assets
	};
}

// Returns an array of simplified character data for each item in charHistory
// The simplified data is used to make history buttons in CharacterHistory component
export function selectIndexData(state) {
	return state.session.charHistory.map((charKey) => {
		const iteratingChar = state.characters[charKey];
		return {
			charKey: charKey,
			name: iteratingChar.name,
			avatarHref: iteratingChar.assets.avatar,
			realm: iteratingChar.realm.name,
			region: iteratingChar.region,
			class: iteratingChar.class
		};
	});
}

// Strips the large object of gear data to only that which will be used by the app
export function selectGearData(body) {
	const gearData = {};
	body.equipped_items.forEach((item) => {
		gearData[item.slot.name] = {
			id: item.item.id,
			ilvl: item.level.value,
			name: item.name,
			quality: item.quality.name
		};
	});
	return gearData;
}

// Strips the large object of mount data to only that which will be used by the app
export function selectCharMountData(body) {
	return body.mounts.map(({ mount, is_useable }) => ({
		id: mount.id,
		name: mount.name,
		is_useable
	}));
}

//  Strips, reformats, and combines mount details and media to relevent data
export async function selectMountDetails(mountData, mediaData) {
	return {
		id: mountData.id,
		name: mountData.name,
		description: mountData.description,
		faction: mountData.faction ? mountData.faction.name : 'NoFaction',
		media: {
			id: mountData.creature_displays[0].id,
			href: mediaData.assets[0].value
		}
	};
}

// Strips the large object of pet data to only that which will be used by the app
export function selectCharPetData(body) {
	return body.pets.map((pet) => ({
		id: pet.id,
		speciesId: pet.species.id,
		creatureDisplayId: pet.creature_display ? pet.creature_display.id : null,
		speciesName: pet.species.name,
		nickname: pet.name,
		level: pet.level,
		quality: pet.quality.name,
		isFavorite: pet.is_favorite
	}));
}

// Strips, reformats, and combines pet details and media to relevent data
// A defaultPet is created due to some requests for character pets results in 404s
// from Blizzard API. If that data doesn't exist we still want to have the keys
// present in our returned object.
export async function selectPetDetails(petData, mediaData) {
	let selected = { ...defaultPet };
	if (petData) {
		selected = {
			...selected,
			id: petData.id,
			name: petData.name,
			type: {
				id: petData.battle_pet_type.id,
				name: petData.battle_pet_type.name
			},
			description: petData.description,
			media: {
				id: petData.media.id,
				icon: petData.icon
			}
		};
	}
	if (mediaData) {
		selected.media.href = mediaData.assets[0].value;
	}

	return selected;
}

const defaultPet = {
	id: null,
	name: null,
	type: {
		id: null,
		name: null
	},
	description: null,
	media: {
		id: null,
		icon: null
	}
};

// Strips realm data object to dev-friendly array of objects representing the name and slug
export function selectAvailableRealms(realmData) {
	const availableRealms = realmData.realms.map((realm) => {
		return { name: realm.name, slug: realm.slug };
	});
	// Add default unselected state
	availableRealms.push({ name: '--Select Realm--', slug: '' });
	// Sort realms alphabetically by name instead of the default id
	return availableRealms.sort((a, b) => (a.name < b.name ? -1 : 1));
}
