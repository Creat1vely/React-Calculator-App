import PropTypes from 'prop-types';
import './creatively.css';

function CreativelyTitle({ title }) {
    return ( 
      <h1 className="creatively-title">
        { title } <small>( from creat1vely )</small>
      </h1>
    );
}

// add prop types for props type-checking and intellisense
CreativelyTitle.propTypes = {
   title: PropTypes.string.isRequired
}

export default CreativelyTitle;