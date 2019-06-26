import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };
  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  flipCellsAround(coord) {
    console.log("Flipping cells", coord);
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    //flip initial cell
    flipCell(y, x);
    //flip neighbor cell to the left
    flipCell(y, x - 1);
    //flip neighbor cell to the right
    flipCell(y, x + 1);
    //flip neighbor to the top
    flipCell(y - 1, x);
    //flip neighbor to the bottom
    flipCell(y + 1, x);

    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({ board, hasWon });
  }

  render() {
    if (this.state.hasWon) {
      return <h1>You Won!!</h1>;
    }
    const tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            isLit={this.state.board[y][x]}
            key={coord}
            //arrow function not ideal
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr>{row}</tr>);
    }
    return (
      <div>
        <table className="Board">
          <tbody>{tblBoard}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
