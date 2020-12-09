import React from "react";
import { Avatar } from "@material-ui/core";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import LaunchIcon from "@material-ui/icons/Launch";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import classes from "./Modal.module.scss";

function Modal(props) {
  const { display_name, profile_image, reputation } = props.quetion.owner;
  const {
    title,
    tags,
    is_answered,
    view_count,
    creation_date,
    link,
  } = props.quetion;
  let color = "#000";

  if (reputation > 0 && reputation < 50) {
    color = "pink";
  } else if (reputation > 50 && reputation < 100) {
    color = "blue";
  } else if (reputation > 100) {
    color = "red";
  }

  return (
    <>
      <div className={classes.backdrop}></div>
      <div className={classes.questionCard}>
        <HighlightOffIcon
          className={classes.closeBtn}
          onClick={props.closeModalHandler}
        />
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
        </div>
        <div className={classes.middel}>
          <div className={classes.views}>
            <strong>Views:{view_count}</strong>
            <h2>{is_answered ? "Answered" : "Not Answered"}</h2>
          </div>
          <div>
            <strong>Asked at:{creation_date}</strong>
          </div>
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
        <div className={classes.btn}>
          <a href={link} target="_blank">
            View in Stackoverflow
            <LaunchIcon />
          </a>
        </div>
      </div>
    </>
  );
}

export default Modal;
