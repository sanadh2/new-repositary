import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: {},
      input: "",
    };
  }
  componentDidMount() {
    const fetchData = async () => {
      try {
        let value = await fetch("https://pokeapi.co/api/v2/pokemon");
        let data = await value.json();
        this.setState({
          display: data,
        });
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    fetchData();
  }

  search = (char) => {
    this.setState({ input: char.target.value });
  };
  render() {
    const { input, display } = this.state;

    let names;
    if (display.results) {
      names = display.results.map((el) => el.name);
    } else {
      names = [];
    }

    return (
      <>
        <center>
          <input
            type="text"
            value={input}
            placeholder="Search"
            onChange={this.search}
          />
        </center>
        <div className="container">
          {names
            .filter((el) => el.toLowerCase().includes(input.toLowerCase()))
            .map((el, i) => (
              <div key={el} className="pokemon">
                <img
                  className="image"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${
                    i + 1
                  }.png`}
                />
                <p>{el}</p>
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default App;
