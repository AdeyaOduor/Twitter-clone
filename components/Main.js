import React, { useContext, lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import LoginPrompt from "./LoginPrompt";
import LoaderContainer from "./reusables/LoaderContainer";
import Menu from "./Menu";
import Search from "./reusables/Search";
import SearchResults from "./SearchResults";
import LoginCard from "./reusables/LoginCard";
import FollowSuggests from "./reusables/FollowSuggests";
import TOS from "./reusables/TOS";
import UserContext from "./context/userContext.js";
import DeviceContext from "./context/deviceContext.js";

const Home = lazy(() => import("./Home"));
const ProfileRoutes = lazy(() => import("./ProfileRoutes"));
const Explore = lazy(() => import("./Explore"));
const Notifications = lazy(() => import("./Notifications"));
const TweetAndReplies = lazy(() => import("./TweetAndReplies"));
const Hashtag = lazy(() => import("./Hashtag"));

const Main = () => {
	const { userID } = useContext(UserContext);
	const { device } = useContext(DeviceContext);
	const location = useLocation();

	return (
		<div className="main">
			<Menu />

			{userID === -1 && <LoginPrompt />}

			{userID && userID !== -1 ? (
				<Suspense fallback={<LoaderContainer />}>
					<Switch>
						<Route exact path="/explore">
							<Explore />
						</Route>

						<Route exact path="/notifications">
							<Notifications />
						</Route>
						<Route path="/search/:searchTerm">
							<SearchResults />
						</Route>
						<Route path="/hashtag/:tag">
							<Hashtag />
						</Route>
						<Route path="/tweet/:tweetID">
							<TweetAndReplies />
						</Route>

						<Route path="/:profile">
							<ProfileRoutes />
						</Route>
						<Route exact path="/">
							<Home />
						</Route>
					</Switch>
				</Suspense>
			) : (
				<Suspense fallback={<LoaderContainer />}>
					<Switch>
						<Route path="/explore">
							<Explore />
						</Route>
						<Route path="/search/:searchTerm">
							<SearchResults />
						</Route>
						<Route path="/hashtag/:tag">
							<Hashtag />
						</Route>
						<Route path="/tweet/:tweetID">
							<TweetAndReplies />
						</Route>
						<Route path="/notifications">
							<Explore />
						</Route>
						<Route path="/:profile">
							<ProfileRoutes />
						</Route>
						<Route>
							<Explore />
						</Route>
					</Switch>
				</Suspense>
			)}
			{device === "comp" && (
				<div className="sidebar">
					{location.pathname !== "/explore" && <Search />}
					{userID === -1 && <LoginCard />}
					{userID !== -1 && userID && <FollowSuggests />}
					<TOS />
				</div>
			)}
		</div>
	);
};

export default Main;
