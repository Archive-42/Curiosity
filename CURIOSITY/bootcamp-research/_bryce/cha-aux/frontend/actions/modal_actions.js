export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL = 'OPEN_MODAL';

export const closeModal = () => ({
	type: CLOSE_MODAL
});

export const openModal = form => ({
	type: OPEN_MODAL,
	form
});
