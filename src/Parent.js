// import React from "react";

// export default function Parent() {
//   return (
//     <div>
//       Parent
//       <Child title="child" item={1} />
//     </div>
//   );
// }

import React, { Component } from "react";
import Child from "./Child";

export default class Parent extends Component {
  state = {
    status: "done",
  };
  render() {
    return (
      <div>
        Parent
        <Child />
      </div>
    );
  }
}
