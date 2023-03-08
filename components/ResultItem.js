import { useState, useEffect } from 'react';
import Image from "next/image";

const ResultItem = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false)
  
    const toggleExpand = () => {
      setIsExpanded(!isExpanded)
    }
  
    return (
      <div className="border-b border-gray-300 flex flex-row mt-4 space-x-5">
        <div>
          <Image
            src={item.image_url}
            alt={`Image of ${item.title}`}
            width={150}
            height={150}
            className="rounded-md"
          />
        </div>
        <div>
          <div className="mb-2">
            <h3 className="text-lg font-medium mr-2 text-gray-900 dark:text-white">{item.title}</h3>
          </div>
          <p className="text-gray-900 dark:text-gray-100 mb-2">{item.artist_firstname} {item.artist_lastname} </p>
          <p className="text-gray-900 dark:text-gray-100 mb-2">{item.date} </p>
          <p className="text-gray-900 dark:text-gray-100 mb-2">Similarity Score: {item.similarity_score.toFixed(2)}</p>
          <button
            className="text-blue-500 underline mb-2"
            onClick={toggleExpand}
          >
            {isExpanded ? 'Hide' : 'Show more'}
          </button>
          {isExpanded && (
            <div className='m-4 text-gray-700 dark:text-gray-100'>
                <p>({item.artist_nationality})</p>
                <p>{item.description}</p>
                <p className="text-gray-900 dark:text-gray-100 mr-2">Catalog ID: {item.catalog_id}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

export default ResultItem;