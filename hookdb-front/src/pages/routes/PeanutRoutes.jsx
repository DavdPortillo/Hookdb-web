import { Route, Routes } from "react-router-dom"
import { MainPage } from "../mainPage/MainPage"
import { GameProfilePage } from "../gameProfilePage/GameProfilePage"
import { ListPage } from "../listPage/ListPage"
import { NewsPage } from "../newsPage/NewsPage"
import { ScoresPage } from "../scoresPage/ScoresPage"
import { SearchResultsPage } from "../searchResultsPage/SearchResultsPage"
import { UserProfilePage } from "../userProfilePage/UserProfilePage"
import { PrivateRoute } from "../../router/PrivateRoute"
import { FeedPage } from "../feedPage/FeedPage"
import { FollowingGamesPage } from "../followingGamesPage/FollowingGamesPage"


export const PeanutRoutes = () => {




    return (
        <Routes>
            <Route path="/" element={<MainPage />} />

            <Route path="games/:id/:nameGame" element={<GameProfilePage />} />

            <Route path="news/:id/:title" element={<NewsPage />} />
            <Route path="search/:searchText" element={<SearchResultsPage />} />

            <Route path="news/:newsTitle" element={<NewsPage />} />
            <Route path="/followingGames/:group" element={<FollowingGamesPage />} />


            <Route path="profile/:username"
                element={
                    <PrivateRoute>
                        <UserProfilePage />
                    </PrivateRoute>
                }
            />


            <Route path="myFeed"
                element={
                    <PrivateRoute>
                        <FeedPage />
                    </PrivateRoute>
                }
            />

            <Route path="lists"
                element={
                    <PrivateRoute>
                        <ListPage />
                    </PrivateRoute>
                }
            />
            <Route path="scores"
                element={
                    <PrivateRoute>
                        <ScoresPage />
                    </PrivateRoute>
                }
            />




        </Routes>
    )
}
