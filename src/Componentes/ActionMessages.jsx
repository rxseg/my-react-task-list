import React from "react";

function ActionMessages({ isDelete, deleted }) {
  console.log(isDelete);
  return <>{deleted ? <>{isDelete}</> : null}</>;
}

export default ActionMessages;
