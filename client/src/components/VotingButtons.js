import React, { useState } from "react";
import castVote from "../services/castVote";

const VotingButtons = (props) => {
  const loadedVotes = props.review.voteCount || 0;
  const [voteCount, setVoteCount] = useState(loadedVotes);

  const voteClick = async (event) => {
    event.preventDefault();
    castVote(event.currentTarget.value, props.review.id).then((newVote) => {
      setVoteCount(loadedVotes + newVote.vote);
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
