import {Link, useParams} from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Spinner from "../components/Spinner.jsx";
import Navbar from "../components/Navbar.jsx";

const PerEpisodePage = () => {
    const { id } = useParams();
    const GET_EPISODE = gql`
        query GET_EPISODE($episodeId: ID!) {
          episode(id: $episodeId) {
            air_date
            episode
            name
            characters {
              name
              image
              id
            }
          }
        }

    `;

    const { loading, error, data } = useQuery(GET_EPISODE, {
        variables: { episodeId: id }
    });

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.episode) return <p>No data available</p>;


    return (
        <div >
            <Navbar/>
            <div className="flex w-full flex-wrap justify-center items-center text-center">
                <div className="w-full">
                    <div>{data.episode.name}</div>
                    <div>{data.episode.episode}</div>
                    <div>{data.episode.air_date}</div>
                </div>
                <div className="w-full">
                    <div className="flex flex-wrap w-full gap-2 justify-center items-center mt-4">
                        {data.episode.characters.map(({ id, name, image }) => (
                            <Link to={`/${id}`} key={id}>
                                <div className="p-2 bg-gray-800 text-white rounded-xl cursor-pointer">
                                    <img src={image} alt={name} className="rounded-xl" />
                                    <div className="card-details">
                                        <h3 className="w-full text-center font-mono">{name}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerEpisodePage;
