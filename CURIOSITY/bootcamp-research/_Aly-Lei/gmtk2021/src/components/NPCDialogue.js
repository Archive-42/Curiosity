import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Typist from "react-typist";
import Button from "./shared/Button";

const NPCDialogue = ({ body, name, updateDialogue }) => {
  const activePotion = useSelector((state) => state.active?.potion);
  const [end, setEnd] = useState(false);
  const [speech, setSpeech] = useState("");

  const endBody = () => {
    setEnd(true);
  };

  const forceEnd = () => {
    setEnd(true);
  };

  useEffect(() => {
    if (body !== speech) {
      setEnd(false);
    }
    setSpeech(body);
  }, [body, speech]);

  return (
    <section className="dialogue-box" id="dialogue" onClick={forceEnd}>
      <h3 className="name">{name}</h3>
      {body && !end ? (
        <Typist onTypingDone={endBody} avgTypingDelay={30}>
          <p>{body}</p>
        </Typist>
      ) : (
        <p>{speech}</p>
      )}
      {activePotion && <Button className="continue" onClick={updateDialogue} text="Continue"/>}
    </section>
  );
}

export default NPCDialogue;
