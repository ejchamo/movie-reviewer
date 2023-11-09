import React, { useState } from "react";
import castVote from "../services/castVote";

const VotingButtons = (props) => {
  const [voteCount, setVoteCount] = useState(props.review.voteCount || 0);

  const voteClick = async (event) => {
    event.preventDefault();
    castVote(event.currentTarget.value, props.review.id).then((newVote) => {
      setVoteCount(voteCount + newVote.vote);
    });
  };

  return (
    <div>
      Vote Count = {voteCount} VotingButtons
      <input type="submit" onClick={voteClick} value={1} />
      <input type="submit" onClick={voteClick} value={-1} />
    </div>
  );
};

export default VotingButtons;