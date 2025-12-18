import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";

function Featured() {
  const { loading } = useFetch(
    "/hotels/countByCity/cities/?cities=bangalore,mysore,tirupati"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img src="\bangalore.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Bagalore</h1>
              <h2>bangalore 4 properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mysore</h1>
              <h2>mysore 3 properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Tirupati</h1>
              <h2>tirupati 3 properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Featured;
