import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/CharacterBasics.scss';

function CharacterBasics() {
	const currentChar = useSelector((state) => state.characters[state.session.currentChar]);
	return (
		<div className='stats border'>
			<header>Character Details</header>
			<p>
				<b>Name:</b> {currentChar.name}
			</p>
			<p>
				<b>Level:</b> {currentChar.level}
			</p>
			<p>
				<b>Faction:</b> <span className={currentChar.faction}>{currentChar.faction}</span>
			</p>
			<p>
				<b>Gender:</b> {currentChar.gender}
			</p>
			<p>
				<b>Race:</b> {currentChar.race}
			</p>
			<p>
				<b>Spec:</b> <span className={currentChar.class}>{currentChar.spec}</span>
			</p>
			<p>
				<b>Class:</b> <span className={currentChar.class}>{currentChar.class}</span>
			</p>
			<p>
				<b>Equipped Item Level:</b>{' '}
				<span className={currentChar.ilvl > 158 ? currentChar.ilvl > 183 ? 'Epic' : 'Rare' : 'Uncommon'}>
					{currentChar.ilvl}
				</span>
			</p>
			<p>
				<b>Guild:</b> {currentChar.guild}
			</p>
			<p>
				<b>Last Login:</b> {currentChar.lastLogin}
			</p>
		</div>
	);
}

export default CharacterBasics;
