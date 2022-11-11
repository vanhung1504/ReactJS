import { useState } from "react";
import Hit, { HitType } from "../hit/Hit";
import PropTypes from "prop-types";

const HitList = ({ hits }) => {
  const [hitsList, setHitsList] = useState(hits);

  const handleDeleteHit = (id) => {
    setHitsList((prev) => {
      const indexOfObject = prev.findIndex((hit) => {
        return hit.objectID === id;
      });
      prev.splice(indexOfObject, 1);
      return [...prev];
    });
  };

  return (
    <>
      {hitsList.map((hit) => (
        <Hit key={hit.objectID} hit={hit} handleDeleteHit={handleDeleteHit} />
      ))}
    </>
  );
};

export const HitListType = {
  hits: PropTypes.arrayOf(HitType),
};

export default HitList;
