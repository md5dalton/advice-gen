import React from "react"

export default ({ advice, id }) => (
    <div id="advice">
        <div>
            <div id="caption">advide #{id}</div>
            <div id="text">"{advice}"</div>
        </div>
    </div>
)