import React, { useState } from "react";

export default function Child() {
  const [count, setCount] = useState(1);
  const [name, setName] = useState("name");
  return (
    <div>
      Child
      <div
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Child count: {count}
      </div>
      <div>name</div>
    </div>
  );
}
