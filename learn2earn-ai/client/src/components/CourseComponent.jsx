import { useState } from "react";

function CourseComponent() {
    const [completed, setCompleted] = useState(false);
    return(
        <div>
            <h1>React Basic</h1>
            <button onClick = { () => setCompleted(true)}>
                {completed ? "Completed " : "Lets Start"}
            </button>
        </div>
    );
}

export default CourseComponent;