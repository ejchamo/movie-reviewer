import React, { useState } from "react";
import castVote from "../services/castVote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const VotingButtons = (props) => {
  const [voteCount, setVoteCount] = useState(props.review.voteCount || 0);

  const upVoteClick = async (event) => {
    event.preventDefault();
    castVote(1, props.review.id).then((newVote) => {
      setVoteCount(voteCount + newVote.vote);
    });
  };

  const downVoteClick = async (event) => {
    event.preventDefault();
    castVote(-1, props.review.id).then((newVote) => {
      setVoteCount(voteCount + newVote.vote);
    });
  };

  return (
    <div className="vote-count">
      <FontAwesomeIcon className="thumb-buttons" onClick={upVoteClick} icon={faThumbsUp} />
      <FontAwesomeIcon className="thumb-buttons" onClick={downVoteClick} icon={faThumbsDown} />
      <div className="vote-count-num">{voteCount}</div>
    </div>
  );
};

export default VotingButtons;
