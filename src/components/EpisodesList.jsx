import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Spinner from "./Spinner.jsx";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/debounce.js";
import Pagination from "./Pagination.jsx";

// eslint-disable-next-line react/prop-types
const EpisodesList = ({ search }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSearch = useDebounce(search, 500);

    const GET_EPISODES = gql`
        query GET_EPISODES($filter: FilterEpisode, $page: Int) {
            episodes(filter: $filter, page: $page) {
                results {
                  air_date
                  episode
                  id
                  name
                }
                info {
                  count
                  pages
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_EPISODES, {
        variables: { filter: { name: debouncedSearch }, page: currentPage }
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.episodes) return <p>No data available</p>;

    return (
        <>
            <div className="flex flex-wrap w-full gap-2 justify-center items-center mt-4">
                {data.episodes.results.map(({ id,air_date,name,episode }) => (
                    <Link to={`/episodes/${id}`} key={id}>
                        <div className="p-2 bg-gray-800 text-white rounded-xl cursor-pointer">
                            <div className="card-details">
                                <h3 className="w-full text-center font-mono">Name: {name}</h3>
                                <h3 className="w-full text-center font-mono">Air Date: {air_date}</h3>
                                <h3 className="w-full text-center font-mono">Episode: {episode}</h3>

                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={data.episodes.info.pages}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default EpisodesList;
