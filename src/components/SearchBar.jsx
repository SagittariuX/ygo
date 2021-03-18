import axios from "axios";
import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./SearchBar.css";

const CARDTYPE = ["All", "Monster", "Spell", "Trap"];
const SEARCHBY = {
  "Search by Text": "fname",
  "Search by Exact Name": "name",
  "Search by Archtype": "archetype",
};
const MAX = 20;
const OFFSET = 0;

const endpointCards = process.env.REACT_APP_YGO_DB_CARDS;
const lorem = "https://random-word-api.herokuapp.com/word?number=20";

class SearchBar extends Component {
  state = {
    searchString: "",
    searchBy: "Search by Text",
    cardType: "All",
    maxReturn: MAX,
    offset: OFFSET,
    advancedOptions: false,

    //Deals with hiding the search area
    isHidden: false,
    isPanelBtnInside: true,

    //Deals with AsyncSearch bar
    typingTimeout: null,
    value: null,
    options: null,
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
        <Form onSubmit={(e) => console.log(e)}>
          <Form.Row>
            <Col>
              <AsyncSelect
                placeholder="Search Here"
                inputValue={this.state.searchString}
                value={this.state.value}
                onInputChange={this.handleOnInputChange}
                onCloseResetsInput={false}
                onChange={this.handleOnChange}
                defaultOptions={this.state.options}
                loadOptions={this.getOptions}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                cacheOptions
                blurInputOnSelect={false} //set by default, but to be sure
                closeMenuOnSelect={false} //prevents menu close after select, which would also result in input blur
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

  handleHiddenToggle = () => {
    this.setState({
      isHidden: !this.state.isHidden,
      isPanelBtnInside: !this.state.isPanelBtnInside,
    });
  };

  getOptions = async (input) => {
    const { typingTimeout } = this.state;
    if (typingTimeout) clearTimeout(typingTimeout);

    if (!input) return;

    const data = await new Promise((resolve) => {
      this.setState({
        typingTimeout: setTimeout(() => {
          resolve(axios(lorem).then((res) => res.data));
        }, 1000),
      });
    });

    const options = data
      .filter((word) => word.toLowerCase().includes(input.toLowerCase()))
      .map((d) => {
        return {
          label: d,
          value: d,
        };
      });

    this.setState({ options: options });
    return options;
  };

  handleOnInputChange = (str, { action }) => {
    // console.log(action);
    if (action === "input-change" || action === "set-value")
      this.setState({ searchString: str});
  };

  handleOnChange = (option, { action }) => {
    this.setState({ 
      searchString: option.label ,
      value: option
    });
  };

  handleSearch = () => {
    const { onSuccessSearch } = this.props;
    axios
      .get(endpointCards, { params: this.buildParam() })
      .then((res) => onSuccessSearch(res.data))
      .catch((error) => console.log(error.response.data)); //make toast messages later
  };

  buildParam = () => {
    let params = {};
    if (this.state.searchString.trim())
      params[SEARCHBY[this.state.searchBy]] = this.state.searchString.trim();
      params["desc"] = this.state.searchString.trim();

    if (this.state.cardType !== "All") params["type"] = this.state.cardType;

    params["num"] = this.state.maxReturn;
    params["offset"] = this.state.offset;

    return params;
  };
}

export default SearchBar;
