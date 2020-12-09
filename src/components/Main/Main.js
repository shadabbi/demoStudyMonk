import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";

import { fetchQuestionsAsync } from "../../redux/reducers/quetionsReducer/actions/actions";
import classes from "./Main.module.scss";
import QuestionCard from "../QuestionCard/QuestionCard";
import Spinner from "../Spinner/Spinner";
import Input from "../SearchInput/SearchInput";
import Modal from "../Modal/Modal";

export class Main extends Component {
  state = {
    quetions: [],
    page: 1,
    spinner: false,
    openModal: false,
    modalData: null,
    searchData: null,
  };

  filterHandler = (searchTerm) => {
    console.log(searchTerm);
    if (searchTerm.length > 2) {
      const filtered = this.props.questions.filter((item) => {
        return item.title.includes(searchTerm);
      });
      console.log(filtered);
      this.setState({ searchData: [...filtered] });
    } else {
      this.setState({ searchData: null });
    }
  };

  fechDataHandler = () => {
    // this.setState({ spinner: true });
    // axios
    //   .get(
    //     `https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow&page=${
    //       this.state.page + 1
    //     }`
    //   )
    //   .then((res) => {
    //     const data = res.data.items;
    //     console.log(data);
    //     this.setState({
    //       quetions: [...data, ...this.state.quetions],
    //       spinner: false,
    //     });
    //   });
    this.props.getQuestions(this.state.page);
    this.setState({ page: this.state.page + 1 });
  };

  modalHandler = (data) => {
    this.setState({ modalData: data, openModal: true });
  };

  closeModalHandler = () => {
    this.setState({ openModal: false });
  };

  componentDidMount() {
    this.fechDataHandler();
  }
  render() {
    console.log(this.props.questions);
    const quetions = (
      <InfiniteScroll
        dataLength={this.props.questions.length}
        next={() => {
          this.fechDataHandler();
        }}
        hasMore={true}
        className={classes.quetionsContainer}
      >
        {this.props.questions.map((quetion) => {
          return (
            <QuestionCard
              key={quetion.title + quetion.question_id + quetion.creation_date}
              quetion={quetion}
              modalHandler={this.modalHandler}
            />
          );
        })}
      </InfiniteScroll>
    );

    const modal = this.state.openModal ? (
      <Modal
        closeModalHandler={this.closeModalHandler}
        quetion={this.state.modalData}
      />
    ) : null;

    return (
      <div className={classes.main}>
        {modal}
        <Input filterHandler={this.filterHandler} />
        {/* {this.state.quetions.length === 0 ? <Spinner /> : null} */}
        {this.state.searchData ? (
          this.state.searchData.map((quetion) => {
            return (
              <QuestionCard
                key={
                  quetion.title + quetion.question_id + quetion.creation_date
                }
                quetion={quetion}
                modalHandler={this.modalHandler}
              />
            );
          })
        ) : (
          <main>{quetions}</main>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.data.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getQuestions: (page) => dispatch(fetchQuestionsAsync(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
