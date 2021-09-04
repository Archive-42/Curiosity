import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

const Navigation = () => {
	const user = useSelector((store) => store.session.user);

	return (
		<div className="navigation">
			<NavLink exact to="/" className="right-nav">
				<h2 className="logo" style={{ marginLeft: "1.5rem" }}>
					skibrite
				</h2>
			</NavLink>

			<ul className="right-nav">
				<li>
					<NavLink exact to="/events">
						events{" "}
					</NavLink>
				</li>
				{!!user ? (
					<>
						<li>
							<NavLink to="/tickets">tickets</NavLink>
						</li>
						<li>
							<ProfileButton user={user} />
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink to="/login">login</NavLink>
						</li>
						<li>
							<NavLink to="/signup">sign up</NavLink>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default Navigation;
