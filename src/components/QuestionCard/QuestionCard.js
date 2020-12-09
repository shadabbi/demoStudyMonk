import React from "react";
import { Avatar } from "@material-ui/core";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";

import classes from "./QuestionCard.module.scss";

function QuestionCard(props) {
  const { display_name, profile_image, reputation } = props.quetion.owner;
  const { title, tags } = props.quetion;
  let color = "#000";

  if (reputation > 0 && reputation < 50) {
    color = "pink";
  } else if (reputation > 50 && reputation < 100) {
    color = "blue";
  } else if (reputation > 100) {
    color = "red";
  }

  return (
    <div
      className={classes.questionCard}
      onClick={() => props.modalHandler(props.quetion)}
    >
      <div className={classes.top}>
        <div className={classes.user}>
          <div
            className={classes.avatarContainer}
            style={{ borderColor: color }}
          >
            <Avatar src={profile_image} />
          </div>
          <strong className={classes.name}>{display_name}</strong>
        </div>
        <h1 className={classes.title}>{title}</h1>
        <div className={classes.vote}>
          <ExpandLessOutlinedIcon />
          <p>Upvote</p>
        </div>
      </div>
      <div className={classes.bottom}>
        {tags.map((tag, idx) => (
          <div key={idx} className={classes.tag}>
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
