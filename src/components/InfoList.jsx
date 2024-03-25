import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Spinner from "./Spinner.jsx";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/debounce.js";
import Pagination from "./Pagination.jsx";

const InfoList = ({ search }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSearch = useDebounce(search, 500);

    const GET_CHARACTERS = gql`
        query GET_CHARACTERS($filter: FilterCharacter, $page: Int) {
            characters(filter: $filter, page: $page) {
                info {
                    count
                    pages
                }
                results {
                    id
                    image
                    name
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_CHARACTERS, {
        variables: { filter: { name: debouncedSearch }, page: currentPage }
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.characters) return <p>No data available</p>;

    return (
        <>
            <div className="flex flex-wrap w-full gap-2 justify-center items-center mt-4">
                {data.characters.results.map(({ id, name, image }) => (
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
            <Pagination
                currentPage={currentPage}
                totalPages={data.characters.info.pages}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default InfoList;
