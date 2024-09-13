import React, { useState } from "react";

const DynamicForm = ({ defaultSetCount, exercise }) => {
  // State to handle dynamic input values
  const [formData, setFormData] = useState(
    Array(defaultSetCount).fill({ reps: "", weight: "" }) // Initialize formData with empty sets
  );

  // Handle changes for each input in each set
  const handleChange = (index, event) => {
    console.log(event.parentElement);
    const { name, value } = event.target;
    const updatedFormData = [...formData]; // Copy the current form data
    updatedFormData[index] = {
      ...updatedFormData[index],
      [name]: value, // Update the specific field (reps/weight) for the corresponding set
    };
    setFormData(updatedFormData); // Update state with the new data
    console.log(updatedFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); /* The event here is the form Submit */
    try {
      const response = await fetch("http://localhost:8000/test", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("No API response");
      }
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <div className="inputForm">
        <form onSubmit={handleSubmit}>
          <label>{exercise}</label>
          <br />
          {formData.map((set, index) => (
            <div key={index}>
              <h3>Set {index + 1}</h3>
              <label htmlFor={`reps${index}`}>Reps</label>
              <input
                type="text"
                id={`reps${index}`}
                name="reps"
                value={set.reps}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor={`weight${index}`}>Weight</label>
              <input
                type="text"
                id={`weight${index}`}
                name="weight"
                value={set.weight}
                onChange={(e) => handleChange(index, e)}
              />
              <br />
            </div>
          ))}
          <button type="submit">Submit</button>
          {/* Submit button, or enter, triggers the onSubmit form action.  */}
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
