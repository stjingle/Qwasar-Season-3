import React from 'react';

const List = props => {
    return (
      <div>
        <div className="coolHeader">{props.title}</div>
        <ul>
          {props.list.map((listItem, index) => (
            <li key={index} className="coolListItem">
              {listItem}
            </li>
          ))}
        </ul>
      </div>
    );
}

export default List;
