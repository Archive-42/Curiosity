import React, { useState } from "react";
import { useSelector } from "react-redux";
import mail from "../assets/letter_icon.svg";
import MessageForm from "./MessageForm";
import SearchForm from "./SearchForm";
import "./Social.css";
import HealthBar from "../Shared/HealthBar";

const Friends = () => {
  const friendlist = useSelector((state) => state.user.friends);
  const [open, setOpen] = useState(false);
  const [search, openSearch] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [id, setId] = useState("");
  const [heal, setHeal] = useState(false);

  const handleClickOpen = (id, name, heal) => {
    setOpen(true);
    setId(id);
    setRecipient(name);
    setHeal(heal);
  };

  const openFriendSearch = () => {
    openSearch(true);
  };

  return (
    <>
      <div className="social__container--friends">
        <div>
          <h1 className="white">Friends</h1>
        </div>
        <button class="yellow cute" onClick={openFriendSearch}>
          FIND USER
        </button>
        <MessageForm
          open={open}
          setOpen={setOpen}
          recipient={recipient}
          id={id}
          heal={heal}
        />
        {search ? <SearchForm openSearch={openSearch} /> : null}
        <div>
          {friendlist.length ? (
            friendlist.map((e) => {
              let heal = false;
              if (e.health < 100) heal = true;
              return (
                <>
                  <div className="friend">
                    <h1 className="friendname">
                      {e.username}{" "}
                      <img
                        src={mail}
                        style={{ width: "50px" }}
                        onClick={() => handleClickOpen(e.id, e.username, heal)}
                      />
                    </h1>

                    <HealthBar health={e.health} />
                  </div>
                </>
              );
            })
          ) : (
            <div>
              <h2 className="white">No Friends Yet!</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Friends;
