import "./App.css";
import { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  async componentDidMount() {
    const users = await fetch("https://jsonplaceholder.typicode.com/users");
    this.setState({ monsters: await users.json() });
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return (
      (document.title = "Monsters"),
      (
        <div className="App">
          <h1> Monsters Rolodex </h1>
          <SearchBox
            placeholder="search monsters"
            onChangeHandler={async (e) => {
              await this.setState({ searchField: e.target.value });
            }}
          ></SearchBox>
          <CardList monsters={filteredMonsters}></CardList>
        </div>
      )
    );
  }
}

export default App;
