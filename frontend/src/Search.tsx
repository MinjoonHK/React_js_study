import React, { useState } from "react";
import ComapnyList from './CompanyList';

function search(){
    const [filteredList, setFilteredList] = useState(ComapnyList);

    const filterBySearch = (event:any) => {
        // Access input value
        const query = event.target.value;
        // Create copy of item list
        var updatedList = [...ComapnyList];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
          return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        // Trigger render with updated values
        setFilteredList(updatedList);
      };

    return(
        <div className="App">
      <div className="search-header">
        <div className="search-text">Search:</div>
        <input id="search-box" onChange={filterBySearch} />
      </div>
      <div id="item-list">
        <ol>
          {filteredList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}