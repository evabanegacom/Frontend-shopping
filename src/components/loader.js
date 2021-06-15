import React from 'react';
import Loader from "react-loader-spinner";

const Loading = () => {

  const loaderStyle = { width: '100%'}
    return (
        <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        style={loaderStyle}
        
        timeout={5000} //3 secs
      />
    )
}

export default Loading
