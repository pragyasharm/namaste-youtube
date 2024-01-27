import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import store from "../utils/store";
import { cacheResults } from "../utils/searchSlice";


const Head = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const dispatch = useDispatch();

    const searchCache = useSelector((store) => store.search);

    /**
     * searchCache = {
     *  "iphone": ["iphone 11", "iphone12"]
     * }
     * searchQuery = iphone
     */


    useEffect(() => {
        //API call
        //console.log(searchQuery);
        //make an api call after every key press
        // but if the difference between 2 api calls is <200ms
        // decline the API call
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else { getSearchSuggestion() }
        },
            200);

        return () => {
            clearTimeout(timer);
        };

    }, [searchQuery])

    /**
     *  key -i
     * it will render the component
     * useEffect()
     * - start the timer -> make api call after 200ms
     * 
     * key ip
     *  destroy the componet ( useEffect return method)
     * - render the component
     * - useEffect()
     * - start the timer -> make api call after 200ms - new timer
     *  setTimeOut(200) - make an API call
     * 
     * 
     * 
     *  timer gets cleared
     */

    const getSearchSuggestion = async () => {
        console.log("API call with " + searchQuery);
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        setSuggestions(json[1]);
        dispatch(
            cacheResults({
            [searchQuery]: json[1],
        }))

        //console.log(json[1])
    }

    const toggleSidebar = () => {
        dispatch(toggleMenu());
    };

    return (
        <div className="grid grid-flow-col p-2 m-2 shadow-lg">
            <div className="flex col-span-1">
                <img className="h-8 cursor-pointer" alt="menu" src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hamburger_icon.svg" onClick={() => toggleSidebar()} />
                <a href="/"><img className="h-8 mx-4" alt="youtube-log" src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" /></a>
            </div>
            <div className="col-span-10 px-10">
                <div>
                    <input value={searchQuery} onFocus={() => setShowSuggestions(true)} onBlur={() => setShowSuggestions(false)} onChange={(e) => setSearchQuery(e.target.value)} className="w-1/2 border border-gray-500 p-2 rounded-l-full" type="text" />
                    <button className="border border-gray-500 p-2 rounded-r-full bg-gray-200">🔍</button>
                </div>
                {showSuggestions && <div className="fixed bg-white px-2 py-2 w-[25rem] rounded-lg shadow-lg border-gray-400">
                    <ul>
                        {suggestions.map(suggestion => <li key={suggestion} className="py-2 px-3 shadow-sm hover:bg-gray-200 cursor-pointer">🔍 {suggestion}</li>)}
                    </ul>
                </div>}
            </div>
            <div className="col-span-1">
                <img className="h-8" alt="user-icon" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />
            </div>
        </div>
    );
};

export default Head;