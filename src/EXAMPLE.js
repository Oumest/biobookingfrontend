import React from "React";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { movieId: 0, showMovieList: true }
    }
    onClick(id) {
        this.setState({ movieId: id, showMovieList: false })
    }
    render() {
        return (
        <div>
            { this.state.showMovieList ? (
                <MovieList onClick={this.onClick} />
            ) : (
                <MovieInformation id={this.state.movieId} />
            )}
        </div>
    }
}

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 }
    }
    componentDidMount() {
        this.getMovies();
    }
    handleClick(id) {
        this.setState({ value: id });
        this.props.onClick(id);
    }
    getMovies() {
        //Fetch from backend
        this.setState({ result: [4784, 234732, 2327, 237273] })
    }
    render() {
        return (
            <>
                {this.state.result.map(item => (
                    <ShowMovie handleClick={} id={item} />
                ))}
            </>
        )
    }
}

class ShowMovie extends Component {
    constructor(props) {
        super(props);
        this.state = { result: null }
    }
    componentDidMount {
        getMovie(this.props.id);
    }
    getMovie(id) {
        //Fetch from backen
        this.setState({ result: { id: 32443, name: "Deadpool" } })
    }
    render() {
        return (
            <div>
                name: {this.state.result.name}
                <button onClick={this.props.handleClick(this.state.result.id)}>Book</button>
            </div>
        )
    }
}