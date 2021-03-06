import React, { useState, useEffect, useContext } from "react";
import { db } from "../config/fbConfig";
import { Link, useRouteMatch, NavLink } from "react-router-dom";
import { ReactComponent as SideArrow } from "../assets/side-arrow-icon.svg";
import UserContext from "./context/userContext.js";
import AccountList from "./reusables/AccountList";

const ProfileFollows = (props) => {
	const { profileID, userProfile } = props;
	const { userName, userAt } = useContext(UserContext);

	const { params } = useRouteMatch();
	const [stuff, setStuff] = useState({});

	useEffect(() => {
		userProfile
			? setStuff({ name: userName, at: userAt })
			: db
					.collection("users")
					.doc(profileID)
					.get()
					.then((doc) => {
						const data = doc.data();
						setStuff({ name: data.name, at: data.at });
					});
	}, [profileID, userAt, userName, userProfile]);

	return (
		<>
			<div className="profile-header">
				{" "}
				<Link
					to={`/${params.profile}`}
					className="top-link"
					style={{ textDecoration: "none", color: "black" }}
				>
					<SideArrow />
					<div className="top-link-text">
						<h3 className="no-dec">{stuff.name}</h3>
						<p className="grey">@{stuff.at}</p>
					</div>
				</Link>
				<div className="profile-feed-selector-container">
					<NavLink
						to={`/${params.profile}/followers`}
						className="profile-feed-selector"
						activeClassName="p-f-s-active"
					>
						Followers
					</NavLink>
					<NavLink
						to={`/${params.profile}/following`}
						className="profile-feed-selector"
						activeClassName="p-f-s-active"
					>
						Following
					</NavLink>
				</div>
			</div>
			<AccountList profileID={profileID} name={stuff.name} />
		</>
	);
};

export default ProfileFollows;
