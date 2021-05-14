import React from "react";

export default function ProgressBar(props) {

  return (
    <div className="row align-items-center">
      <div className="col-12 col-md-3">{props.name}</div>
      <div className="col-12 col-md-9">
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${props.stats}%`,
            }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <small>{props.stats}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
