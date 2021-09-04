import gql from 'graphql-tag';

export default {
	// we make sure to use the `mutation` key word when creating our frontend mutations
	// just like we would in GraphiQL
	DELETE_GOD: gql`
		mutation DeleteGod($id: ID) {
			deleteGod(id: $id) {
				id
			}
		}
	`,
	NEW_GOD: gql`
		mutation NewGod($name: String, $type: String, $description: String) {
			newGod(name: $name, type: $type, description: $description) {
				id
				name
				description
			}
		}
	`,
	NEW_EMBLEM: gql`
		mutation NewEmblem($name: String) {
			newEmblem(name: $name) {
				id
				name
			}
		}
	`,
	NEW_ABODE: gql`
		mutation NewAbode($name: String, $coordinates: String) {
			newAbode(name: $name, coordinates: $coordinates) {
				id
				name
				coordinates
			}
		}
	`,
	UPDATE_GOD: gql`
		mutation updateGod($id: ID, $name: String, $type: String, $description: String) {
			updateGod(id: $id, name: $name, type: $type, description: $description) {
				id
				name
				type
				description
			}
		}
	`,
	ADD_GOD_DOMAIN: gql`
		mutation addGodDomain($id: ID, $domain: String) {
			addGodDomain(godId: $id, domain: $domain) {
				id
				name
				domains
			}
		}
	`,
	REMOVE_GOD_DOMAIN: gql`
		mutation removeGodDomain($id: ID, $domain: String) {
			removeGodDomain(godId: $id, domain: $domain) {
				id
				name
				domains
			}
		}
	`
};
