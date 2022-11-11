import React from "react";
import PropTypes from "prop-types";

const Hit = ({ hit, handleDeleteHit }) => {
  return (
    <div className="col-12 col-md-6 mb-3">
      <div className="card h-100 p-3 shadow-sm bg-body rounded">
        <div className="fs-5 text-dark">{hit.title}</div>
        <div className="mt-2 fw-light text-muted fs-6">
          {hit.points} by {hit.author} | {hit.num_comments} comments
        </div>
        <div className="mt-2 d-flex align-items-center">
          <a href={hit.url} className="link-info me-2">
            Read More
          </a>
          <button
            className="btn btn-outline-danger border-0"
            onClick={() => handleDeleteHit(hit.objectID)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export const HitType = PropTypes.shape({
  objectID: PropTypes.string.isRequired,
  title: PropTypes.string,
  points: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  num_comments: PropTypes.number,
  url: PropTypes.string,
});

Hit.propTypes = {
  hit: HitType,
};

export default Hit;
