import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Spinner from "../components/Spinner.jsx";
import Navbar from "../components/Navbar.jsx";

const PerInfoPage = () => {
    const { id } = useParams();
    const GET_CHARACTER = gql`
        query GET_CHARACTER($characterId: ID!) {
            character(id: $characterId) {
                created
                gender
                image
                name
                species
                status
                type
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_CHARACTER, {
        variables: { characterId: id } // Directly pass the id
    });

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.character) return <p>No data available</p>;


    return (
        <div >
            <Navbar/>
            <div className="flex w-full flex-wrap justify-center items-center text-center">
                <div className="w-1/2 flex justify-center items-center ">
                    <img src={data.character.image} width={"450px"} className="absolute top-64 rounded-xl"/>
                </div>
                <div className="w-1/2">
                    <div className="absolute top-96 right-60 font-mono">
                        <div>Created: {data.character.created}</div>
                        <div>Name: {data.character.name}</div>
                        <div>Gender: {data.character.gender}</div>
                        <div>Species: {data.character.species}</div>
                        <div>Status: {data.character.status}</div>
                        <div>Type: {data ? "Type is not defined" : data.character.type}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerInfoPage;
