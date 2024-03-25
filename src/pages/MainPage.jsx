import InfoList from "../components/InfoList.jsx";
import Navbar from "../components/Navbar.jsx";
import InputSearch from "../components/InputSearch.jsx";
import {useState} from "react";



const MainPage = () => {
    const [search, setSearch] = useState(""); // search


    const handleSearch = (value) => {
        console.log(value)
        setSearch(value);
    };

    return (
        <div>
            <Navbar/>
            <div className="grid grid-cols-6 gap-2 p-2">
                <div className="col-start-1 col-span-1 bg-blue-600">
                    asd
                </div>
                <div className="col-start-2 col-span-4 bg-amber-700">
                    <InputSearch onSearch={handleSearch}/>
                    <InfoList search={search}/>

                </div>
                <div className="col-start-6 col-span-1 bg-red-900">
                    lkj
                </div>
            </div>
        </div>
    );
};

export default MainPage;