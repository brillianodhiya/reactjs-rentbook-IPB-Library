import React from "react";
import { Link as RouterLink } from "react-router-dom";
import "../css/dropdown.css"
import { connect } from "react-redux";
import { getGenres } from "../../public/action/genres";

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
        }
    }

    componentDidMount = async () => {
        await this.props.dispatch(getGenres());
        this.setState({
            genres: this.props.genres.genreList
        })
    }
    render() {
        return (
            <div>
                <label className="dropdown">
                    <div className="dd-button">
                        All Categories
                    </div>
                    <input type="checkbox" className="dd-input" id="test"/>
                    <ul className="dd-menu">
                        {this.state.genres.map(result => (
                            <RouterLink to={`/explore/${result.codegenre}`}>
                                <li>{result.keterangan}</li>
                            </RouterLink>
                        ))}
                    </ul>
                </label>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        genres: state.genres
    }
}

export default connect(mapStateToProps)(Category)