import PropTypes from "prop-types";
import './creatively.css';


function CreativelyLinks({ githubLink, youtubeLink, creativelyLink }) {
    return ( 
        <div className="creatively-links">
            <a href={ githubLink } className="creatively-link">
                view code on github
            </a>
            <a href={ youtubeLink } className="creatively-link">
                learn how to create this app ( youtube )
            </a>
            <a href={ creativelyLink } className="creatively-link">
                learn web development @ creat1vely
            </a>
        </div>
    );
}


CreativelyLinks.defaultProps = {
    githubLink: "",
    youtubeLink: "",
    creativelyLink: "",
}

CreativelyLinks.propTypes = {
    githubLink: PropTypes.string.isRequired,
    youtubeLink: PropTypes.string.isRequired,
    creativelyLink: PropTypes.string.isRequired,
}


export default CreativelyLinks;