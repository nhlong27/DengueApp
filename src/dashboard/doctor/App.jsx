import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center selection:bg-green-900">
      Doctor is working
    </div>
  );
}

export default App;
