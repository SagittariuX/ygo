import axios from "axios";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./SearchBar.css";

const CARDTYPE = ["All", "Monster", "Spell", "Trap"];
const SEARCHBY = {
  "Search by Name": "fname",
  "Search by Exact Name": "name",
  "Search by Archtype": "archetype",
};
const MAX = 10;
const OFFSET = 0;

const endpointCards = process.env.REACT_APP_YGO_DB_CARDS;


class SearchBar extends Component {
  state = {
    searchString: "",
    searchBy: "Search by Name",
    cardType: "All",
    maxReturn: MAX,
    offset: OFFSET,
    advancedOptions: false,
    isHidden: true,
    isPanelBtnInside: false,
  };

  render() {
    return (
      <div id="search-menu" className={this.state.isHidden ? "hide" : "show"}>
        <div
          id="search-panel-btn-wrapper"
          className={this.state.isPanelBtnInside ? "inside" : "outside"}
        >
          <button
            type="button"
            id="search-panel-btn"
            className={
              this.state.isPanelBtnInside
                ? "btn btn-secondary"
                : "btn btn-primary"
            }
            aria-label="Close"
            onClick={this.handleHiddenToggle}
          >
            {this.state.isPanelBtnInside ? (
              <span>&times;</span>
            ) : (
              <span>&#8614;</span>
            )}
          </button>
        </div>
        <Form  onSubmit={(e) => e.preventDefault()}>
          <Form.Row>
            <Col>
              <Form.Control
                placeholder="Search Here..."
                onChange={(e) =>
                  this.setState({ searchString: e.target.value })
                }
                onKeyUp={(e)=> this.handleEnter(e)}
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                as="select"
                onChange={(e) => this.setState({ searchBy: e.target.value })}
              >
                {Object.keys(SEARCHBY).map((by) => (
                  <option key={by}>{by}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                as="select"
                onChange={(e) => this.setState({ cardType: e.target.value })}
              >
                {CARDTYPE.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Button variant="primary" onClick={this.handleSearch}>
            Search
          </Button>
        </Form>
      </div>
    );
  }

  //When user presses enter while focus on the search bar
  handleEnter = (e) =>{
    if(e.key === 'Enter'){
      this.handleSearch();
    }
  }

  handleHiddenToggle = () => {
    this.setState({
      isHidden: !this.state.isHidden,
      isPanelBtnInside: !this.state.isPanelBtnInside,
    });
  };

  handleSearch = () => {
    const {onSuccessSearch} = this.props;
    axios
      .get(endpointCards, { params: this.buildParam() })
      .then((res) => onSuccessSearch(res.data))
      .catch((error) => console.log(error.response.data)); //make toast messages later
  };

  buildParam = () => {
    let params = {};
    if (this.state.searchString.trim())
      params[SEARCHBY[this.state.searchBy]] = this.state.searchString.trim();

    if (this.state.cardType !== "All") params["type"] = this.state.cardType;

    params["num"] = this.state.maxReturn;
    params["offset"] = this.state.offset

    return params;
  };
}

export default SearchBar;
